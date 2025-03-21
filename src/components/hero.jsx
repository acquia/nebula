import { cva } from "class-variance-authority";

import TwoColumnText from "./two-column-text";

const backgroundVariants = cva("align-center h-full w-full px-8 py-16", {
  variants: {
    darkenImage: {
      false: null,
      true: "backdrop-brightness-75",
    },
  },
});

const Hero = ({
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
  backgroundImage,
  darkenImage,
  // backgroundColor,
}) => {
  return (
    <div
      className="flex min-h-[672px] w-full justify-start bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className={backgroundVariants({ darkenImage })}>
        <TwoColumnText
          layout={layout}
          preHeading={preHeading}
          heading={heading}
          headingSize={headingSize}
          headingElement={headingElement}
          textColor={textColor}
          text={text}
          button1Label={button1Label}
          button1Link={button1Link}
          button1Style={button1Style}
          button2Label={button2Label}
          button2Link={button2Link}
          button2Style={button2Style}
          image={image}
        />
      </div>
    </div>
  );
};

export default Hero;
