import Button from '@/components/button';
import Heading from '@/components/heading';
import { cva } from 'class-variance-authority';
import { cn, FormattedText, Image } from 'drupal-canvas';

const cardVariants = cva(
  'flex w-full max-w-md flex-col items-center gap-4 rounded-2xl pb-6 leading-[normal]',
  {
    variants: {
      layout: {
        left_aligned: 'items-start text-left',
        center_aligned: 'items-center text-center',
        right_aligned: 'items-end text-right',
      },
      textColor: {
        Default: null,
        Dark: 'text-primary-dark',
        Light: 'text-white',
      },
      image: {
        true: null,
        false: 'pt-8',
      },
    },
    defaultVariants: {
      textColor: 'Default',
    },
  },
);

const linkCardStyles =
  'group flex flex-col rounded-xl border border-gray-200 bg-white shadow-sm transition hover:shadow-md focus:shadow-md focus:outline-none';

const ChevronIcon = () => (
  <svg
    className="size-5 shrink-0 text-gray-800"
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="m9 18 6-6-6-6" />
  </svg>
);

const linkCardTextAlign = {
  left_aligned: 'text-left',
  center_aligned: 'text-center',
  right_aligned: 'text-right',
};

const LinkCard = ({
  className,
  heading,
  text,
  image,
  link,
  layout = 'left_aligned',
}) => (
  <a className={cn(linkCardStyles, className)} href={link}>
    <div className="p-4 md:p-5">
      <div className="flex items-center justify-between gap-x-3">
        <div className="flex grow items-center gap-x-3">
          {image?.src && (
            <Image
              src={image.src}
              alt={image.alt}
              width={image.width}
              height={image.height}
              className="size-9.5 rounded-full object-cover"
              sizes="38px"
            />
          )}
          <div className={cn('grow', linkCardTextAlign[layout])}>
            <h3 className="font-semibold text-gray-800 group-hover:text-primary-600">
              {heading}
            </h3>
            {text && (
              <p className="text-sm text-gray-500">
                <FormattedText>{text}</FormattedText>
              </p>
            )}
          </div>
        </div>
        <ChevronIcon />
      </div>
    </div>
  </a>
);

const DefaultCard = ({
  backgroundColor = '#ffffff',
  backgroundColorOnHover = '#E2E8F0',
  byline,
  className,
  image,
  heading,
  headingElement = 'h2',
  layout = 'left_aligned',
  link,
  linkLabel,
  linkVariant = 'link',
  text,
  textColor,
}) => {
  const cardBackgroundClassName = `card-${backgroundColor.substring(1)}`;
  const cardBackgroundClassNameOnHover = `card-${backgroundColorOnHover.substring(1)}`;
  const { src, alt, width, height } = image ?? {};
  const hasImage = !!src;

  const cardContent = (
    <div
      className={cn(
        cardVariants({ layout, textColor, image: hasImage }),
        cardBackgroundClassName,
        cardBackgroundClassNameOnHover,
        className,
      )}
    >
      {hasImage && (
        <Image
          {...{ src, alt, width, height }}
          className="w-full rounded-2xl object-cover object-center"
        />
      )}
      <div className="px-6 pt-2">
        {heading && (
          <Heading
            className="mb-2"
            heading={heading}
            headingElement={headingElement}
            headingSize="small"
            layout={layout}
            textColor={textColor}
          />
        )}
        {byline && (
          <div className="mt-3 mb-2 text-xs font-semibold text-gray-500">
            {byline}
          </div>
        )}
        {text && (
          <FormattedText className="mb-4 leading-6">{text}</FormattedText>
        )}
        {link && linkLabel && (
          <Button link={link} variant={linkVariant}>
            {linkLabel}
          </Button>
        )}
      </div>
    </div>
  );

  return (
    <>
      <style>
        {`
          .${cardBackgroundClassName} {
            background-color: ${backgroundColor};
          }
          .${cardBackgroundClassNameOnHover}:hover {
            background-color: ${backgroundColorOnHover};
          }
        `}
      </style>
      {link && !linkLabel ? <a href={link}>{cardContent}</a> : cardContent}
    </>
  );
};

const Card = ({ variant = 'default', ...props }) => {
  switch (variant) {
    case 'link_card':
      return <LinkCard {...props} />;
    default:
      return <DefaultCard {...props} />;
  }
};

export default Card;
