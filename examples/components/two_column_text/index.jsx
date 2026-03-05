import Heading from "@/components/heading";
import Text from "@/components/text";
import { cva } from "class-variance-authority";
import { Image as ResponsiveImage } from "drupal-canvas";

const containerVariants = cva(
  "mx-auto flex w-full max-w-[1360px] gap-8 md:items-center",
  {
    variants: {
      layout: {
        text_image: "flex-col md:flex-row",
        image_text: "flex-col md:flex-row-reverse",
      },
    },
    defaultVariants: {
      layout: "text_image",
    },
  },
);

const textColumnVariants = cva(
  "flex flex-col items-start justify-center gap-4",
  {
    variants: {
      columnWidths: {
        "33_66": "w-full md:w-1/3",
        "50_50": "w-full md:w-1/2",
        "66_33": "w-full md:w-2/3",
      },
    },
    defaultVariants: {
      columnWidths: "50_50",
    },
  },
);

const imageColumnVariants = cva("flex w-full items-center", {
  variants: {
    columnWidths: {
      "33_66": "md:w-2/3",
      "50_50": "md:w-1/2",
      "66_33": "md:w-1/3",
    },
  },
  defaultVariants: {
    columnWidths: "50_50",
  },
});

const TwoColumnText = ({
  layout,
  columnWidths,
  preHeading,
  heading,
  headingElement,
  headingSize,
  text,
  buttons,
  textColor,
  image,
  rightColumn,
  textShadow,
}) => {
  return (
    <div className="flex w-full justify-start bg-cover bg-center bg-no-repeat py-24">
      <div className="mx-6 flex w-full items-center justify-center">
        <div className={containerVariants({ layout })}>
          <div className={textColumnVariants({ columnWidths })}>
            <div className="mb-4">
              <Heading
                heading={heading}
                headingElement={headingElement}
                headingSize={headingSize}
                preHeading={preHeading}
                textColor={textColor}
                textShadow={textShadow}
              />
            </div>
            {text && (
              <Text
                className="mb-4"
                text={text}
                textColor={textColor}
                textSize="large"
                textShadow={textShadow}
              />
            )}
            <div className="flex w-full min-w-3xs gap-4">{buttons}</div>
          </div>
          <div className={imageColumnVariants({ columnWidths })}>
            <ContentImage image={image} className="h-auto w-full" />
            {rightColumn}
          </div>
        </div>
      </div>
    </div>
  );
};

const ContentImage = ({ image, className }) => {
  if (!image) {
    return null;
  }
  const { src, alt, width, height } = image;
  return (
    <ResponsiveImage {...{ src, alt, width, height }} className={className} />
  );
};

export default TwoColumnText;
