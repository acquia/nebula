import { cva } from "class-variance-authority";

import Button from "./button";
import Heading from "./heading";

const heroVariants = cva("mx-auto flex w-full max-w-[1360px] flex-col gap-8", {
  variants: {
    layout: {
      leftAligned: "items-start justify-between md:flex-row",
      centered: "flex-col items-center justify-center text-center",
    },
  },
  defaultVariants: {
    layout: "leftAligned",
  },
});

const TwoColumnText = ({
  layout,
  preHeading,
  heading,
  headingSize = "Large",
  headingElement,
  textColor = "Dark",
  text,
  button1Label,
  button1Link,
  button1Style = "Solid",
  button2Label,
  button2Link,
  button2Style = "Outline",
  image,
}) => {
  const getButtonVariant = (style) => {
    if (style === "Solid") {
      return "solid";
    }
    if (style === "Outline") {
      // @todo Return "outlineLight" if the hero has a dark background.
      return "outlineDark";
    }
    return "solid";
  };

  return (
    <div className="flex w-full justify-start bg-cover bg-center bg-no-repeat py-24">
      <div className="flex w-full items-center justify-center">
        <div className={heroVariants({ layout })}>
          <div
            className={`flex max-w-xl flex-col items-start justify-start gap-4 xl:max-w-lg ${layout === "centered" ? "items-center" : "items-start"}`}
          >
            <div className="mb-4">
              <Heading
                heading={heading}
                preHeading={preHeading}
                headingSize={headingSize}
                textColor={textColor}
                headingElement={headingElement}
              />
            </div>
            {text && <p className="mb-4 text-lg text-slate-950">{text}</p>}
            <div
              className={`flex w-full gap-4 ${layout === "centered" ? "justify-center" : "justify-start"}`}
            >
              {button1Label && (
                <Button
                  link={button1Link}
                  variant={getButtonVariant(button1Style)}
                >
                  {button1Label}
                </Button>
              )}
              {button2Label && (
                <Button
                  link={button2Link}
                  variant={getButtonVariant(button2Style)}
                >
                  {button2Label}
                </Button>
              )}
            </div>
          </div>
          <div className="flex max-w-3xl">
            <img
              src={image}
              alt="Hero featured image"
              className="max-width-full w-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TwoColumnText;
