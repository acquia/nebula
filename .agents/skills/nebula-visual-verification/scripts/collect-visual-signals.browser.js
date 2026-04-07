(() => {
  const scope = document.querySelector('__SCOPE_SELECTOR__') || document.body;
  const SAMPLE_LIMIT = Number('__SAMPLE_LIMIT__');

  const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

  const isVisible = (element) => {
    if (!element) return false;
    const style = window.getComputedStyle(element);
    const rect = element.getBoundingClientRect();
    return (
      style.display !== 'none' &&
      style.visibility !== 'hidden' &&
      Number.parseFloat(style.opacity || '1') > 0 &&
      rect.width > 0 &&
      rect.height > 0
    );
  };

  const parseColor = (input) => {
    if (!input || input === 'transparent') {
      return null;
    }

    const match = input.match(/rgba?\(([^)]+)\)/i);
    if (!match) {
      return null;
    }

    const parts = match[1]
      .split(',')
      .map((part) => Number.parseFloat(part.trim()))
      .filter((part) => Number.isFinite(part));

    if (parts.length < 3) {
      return null;
    }

    return {
      r: clamp(parts[0], 0, 255),
      g: clamp(parts[1], 0, 255),
      b: clamp(parts[2], 0, 255),
      a: parts[3] === undefined ? 1 : clamp(parts[3], 0, 1),
    };
  };

  const mix = (foreground, background) => {
    if (!foreground) return background;
    if (!background) return foreground;

    const alpha = foreground.a ?? 1;

    return {
      r: Math.round(foreground.r * alpha + background.r * (1 - alpha)),
      g: Math.round(foreground.g * alpha + background.g * (1 - alpha)),
      b: Math.round(foreground.b * alpha + background.b * (1 - alpha)),
      a: 1,
    };
  };

  const luminanceChannel = (channel) => {
    const normalized = channel / 255;
    return normalized <= 0.03928
      ? normalized / 12.92
      : ((normalized + 0.055) / 1.055) ** 2.4;
  };

  const relativeLuminance = (color) => {
    return (
      0.2126 * luminanceChannel(color.r) +
      0.7152 * luminanceChannel(color.g) +
      0.0722 * luminanceChannel(color.b)
    );
  };

  const contrastRatio = (foreground, background) => {
    const lighter = Math.max(
      relativeLuminance(foreground),
      relativeLuminance(background),
    );
    const darker = Math.min(
      relativeLuminance(foreground),
      relativeLuminance(background),
    );
    return Number(((lighter + 0.05) / (darker + 0.05)).toFixed(2));
  };

  // Walk up the DOM tree until we find a usable painted background. This is not
  // a full compositor model, but it is good enough to catch obvious contrast
  // problems in typical component layouts.
  const nearestBackground = (element) => {
    let current = element;
    let resolved = { r: 255, g: 255, b: 255, a: 1 };
    let backgroundImage = false;

    while (current) {
      const style = window.getComputedStyle(current);
      if (style.backgroundImage && style.backgroundImage !== 'none') {
        backgroundImage = true;
      }
      const parsed = parseColor(style.backgroundColor);
      if (parsed && (parsed.a ?? 1) > 0) {
        resolved = mix(parsed, resolved);
        if ((parsed.a ?? 1) >= 0.98) {
          break;
        }
      }
      current = current.parentElement;
    }

    return { color: resolved, backgroundImage };
  };

  const truncate = (value, length = 140) => {
    const normalized = (value || '').replace(/\s+/g, ' ').trim();
    if (normalized.length <= length) {
      return normalized;
    }
    return `${normalized.slice(0, length - 1)}…`;
  };

  const textNodes = Array.from(
    scope.querySelectorAll(
      'h1,h2,h3,h4,h5,h6,p,li,a,button,label,span,strong,em,small,blockquote',
    ),
  );

  // Collect only suspicious text samples. The verifier cares more about the
  // failures than a full inventory of every readable node.
  const textSignals = textNodes
    .filter((element) => isVisible(element))
    .map((element) => {
      const text = truncate(element.innerText || element.textContent || '');
      if (!text) {
        return null;
      }

      const style = window.getComputedStyle(element);
      const foreground = parseColor(style.color);
      const background = nearestBackground(element);

      if (!foreground) {
        return null;
      }

      const fontSize = Number.parseFloat(style.fontSize || '0');
      const fontWeight = Number.parseInt(style.fontWeight || '400', 10);
      const largeText =
        fontSize >= 24 || (fontSize >= 18.66 && fontWeight >= 700);
      const ratio = contrastRatio(foreground, background.color);
      const threshold = largeText ? 3 : 4.5;

      if (ratio >= threshold) {
        return null;
      }

      return {
        tag: element.tagName.toLowerCase(),
        text,
        fontSize,
        fontWeight,
        contrastRatio: ratio,
        threshold,
        backgroundImage: background.backgroundImage,
      };
    })
    .filter(Boolean)
    .slice(0, SAMPLE_LIMIT);

  // Look for the two most common layout regressions: content overflowing its
  // own box and content being pushed outside the viewport.
  const overflowSignals = Array.from(scope.querySelectorAll('*'))
    .filter((element) => isVisible(element))
    .map((element) => {
      const rect = element.getBoundingClientRect();
      const overflowX = element.scrollWidth - element.clientWidth;
      const overflowY = element.scrollHeight - element.clientHeight;
      const clippedRight = rect.right - window.innerWidth;
      const clippedLeft = 0 - rect.left;

      if (
        overflowX <= 1 &&
        overflowY <= 1 &&
        clippedRight <= 1 &&
        clippedLeft <= 1
      ) {
        return null;
      }

      return {
        tag: element.tagName.toLowerCase(),
        text: truncate(element.innerText || element.textContent || ''),
        overflowX: Math.round(overflowX),
        overflowY: Math.round(overflowY),
        clippedRight: Math.round(clippedRight),
        clippedLeft: Math.round(clippedLeft),
        width: Math.round(rect.width),
        height: Math.round(rect.height),
      };
    })
    .filter(Boolean)
    .slice(0, SAMPLE_LIMIT);

  // Gather basic image context so the verifier can judge obvious broken-image
  // cases and image/copy mismatches without scraping the full DOM.
  const imageSignals = Array.from(scope.querySelectorAll('img'))
    .filter((element) => isVisible(element))
    .map((element) => {
      const container = element.closest('figure,article,section,li,div');
      const nearbyText = truncate(
        (container?.innerText || element.alt || '').replace(/\s+/g, ' '),
      );

      return {
        src: element.currentSrc || element.src || '',
        alt: element.alt || '',
        width: element.naturalWidth || element.width || 0,
        height: element.naturalHeight || element.height || 0,
        nearbyText,
      };
    })
    .slice(0, SAMPLE_LIMIT);

  // Return compact, review-oriented signals instead of raw DOM. The skill uses
  // this as evidence inside the verify/fix/reverify loop.
  return {
    viewport: {
      width: window.innerWidth,
      height: window.innerHeight,
      scrollWidth: document.documentElement.scrollWidth,
      scrollHeight: document.documentElement.scrollHeight,
      hasHorizontalScroll:
        document.documentElement.scrollWidth > window.innerWidth + 1,
    },
    textSignals,
    overflowSignals,
    imageSignals,
  };
})();
