import { useEffect, useId, useRef, useState } from 'react';
import { cn } from 'drupal-canvas';

const borderColorClassName = {
  gray_200: 'border-gray-200',
  gray_300: 'border-gray-300',
  gray_400: 'border-gray-400',
  primary_200: 'border-primary-200',
  primary_300: 'border-primary-300',
};

const PlusIcon = () => (
  <svg
    aria-hidden="true"
    className="block size-3.5"
    fill="none"
    viewBox="0 0 24 24"
  >
    <path
      d="M5 12h14"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
    />
    <path
      d="M12 5v14"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
    />
  </svg>
);

const MinusIcon = () => (
  <svg
    aria-hidden="true"
    className="block size-3.5"
    fill="none"
    viewBox="0 0 24 24"
  >
    <path
      d="M5 12h14"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
    />
  </svg>
);

const ChevronIcon = ({ isOpen }) => (
  <svg
    aria-hidden="true"
    className={cn(
      'size-4 shrink-0 transition-transform duration-300',
      isOpen ? 'rotate-180' : 'rotate-0',
    )}
    fill="none"
    viewBox="0 0 24 24"
  >
    <path
      d="m6 9 6 6 6-6"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
    />
  </svg>
);

const AccordionItem = ({
  anchorId,
  className,
  content,
  defaultOpen = false,
  headingElement = 'h3',
  title,
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const itemRef = useRef(null);
  const [groupState, setGroupState] = useState({
    borderColor: 'gray_200',
    isFirstItem: true,
    isLastItem: true,
    variant: 'default',
  });
  const reactId = useId();
  const safeId = reactId.replace(/:/g, '');
  const buttonId = `accordion-item-button-${safeId}`;
  const panelId = `accordion-item-panel-${safeId}`;
  const HeadingElement = headingElement;

  useEffect(() => {
    const el = itemRef.current;
    if (!el) return;
    const group = el.closest('[data-accordion-group]');
    if (!group) return;
    const variant = group.getAttribute('data-variant') || 'default';
    const borderColor = group.getAttribute('data-border-color') || 'gray_200';
    const items = group.querySelectorAll('[data-accordion-item]');
    const index = Array.from(items).indexOf(el);
    setGroupState({
      borderColor,
      isFirstItem: index === 0,
      isLastItem: index === items.length - 1,
      variant,
    });
  }, []);

  useEffect(() => {
    setIsOpen(defaultOpen);
  }, [defaultOpen]);

  useEffect(() => {
    if (!anchorId) return;
    const checkHash = () => {
      if (window.location.hash === `#${anchorId}`) {
        setIsOpen(true);
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            itemRef.current?.scrollIntoView({
              behavior: 'smooth',
              block: 'center',
            });
          });
        });
      }
    };
    checkHash();
    window.addEventListener('hashchange', checkHash);
    return () => window.removeEventListener('hashchange', checkHash);
  }, [anchorId]);

  const {
    borderColor: groupBorderColor,
    isFirstItem,
    isLastItem,
    variant: groupVariant,
  } = groupState;

  const isBordered = groupVariant === 'bordered';
  const isSeparated = groupVariant === 'separated';
  const isDefault = groupVariant === 'default';

  const handleToggle = () => {
    setIsOpen((prev) => !prev);
  };

  const itemClassName = cn(
    'w-full',
    isBordered && 'border bg-white',
    isBordered && !isFirstItem && '-mt-px',
    isBordered && isFirstItem && 'rounded-t-lg',
    isBordered && isLastItem && 'rounded-b-lg',
    isSeparated && 'rounded-xl border bg-white',
    (isBordered || isSeparated) && borderColorClassName[groupBorderColor],
    className,
  );

  const buttonClassName = cn(
    'flex w-full items-center gap-3 text-left font-semibold transition-colors disabled:pointer-events-none disabled:opacity-50',
    'focus-visible:rounded-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500',
    isDefault &&
      'justify-between py-4 text-base text-black hover:text-primary-700',
    isBordered && 'px-5 py-4 text-base text-black hover:text-primary-700',
    isSeparated &&
      'justify-between px-4 py-4 text-base text-black hover:text-primary-700',
  );

  const contentOuterClassName = cn(
    'grid w-full transition-[grid-template-rows] duration-300 ease-in-out',
    isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]',
  );

  const contentInnerClassName = 'min-h-0 overflow-hidden';

  const contentBodyClassName = cn(
    'pb-4 text-gray-700',
    isBordered && 'px-5',
    isSeparated && 'px-4',
  );

  return (
    <div
      className={itemClassName}
      data-accordion-item
      id={anchorId || undefined}
      ref={itemRef}
    >
      <HeadingElement className="m-0">
        <button
          aria-controls={panelId}
          aria-expanded={isOpen}
          className={buttonClassName}
          data-accordion-button
          id={buttonId}
          onClick={handleToggle}
          type="button"
        >
          {isBordered ? (
            <>
              <span className="relative inline-flex size-3.5 shrink-0 items-center justify-center">
                <span
                  className={cn(
                    'absolute inset-0 flex items-center justify-center transition-opacity duration-200 ease-out',
                    isOpen ? 'opacity-0' : 'opacity-100',
                  )}
                >
                  <PlusIcon />
                </span>
                <span
                  className={cn(
                    'absolute inset-0 flex items-center justify-center transition-opacity duration-200 ease-out',
                    isOpen ? 'opacity-100' : 'opacity-0',
                  )}
                >
                  <MinusIcon />
                </span>
              </span>
              <span>{title}</span>
            </>
          ) : (
            <>
              <span>{title}</span>
              <ChevronIcon isOpen={isOpen} />
            </>
          )}
        </button>
      </HeadingElement>

      <div
        aria-hidden={!isOpen}
        aria-labelledby={buttonId}
        className={contentOuterClassName}
        data-accordion-content
        id={panelId}
        inert={!isOpen}
        role="region"
      >
        <div className={contentInnerClassName}>
          <div className={contentBodyClassName}>{content}</div>
        </div>
      </div>
    </div>
  );
};

export default AccordionItem;
