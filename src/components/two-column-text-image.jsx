import { cva } from "class-variance-authority";

import Heading from "./heading";

const twoColumnTextImageLayoutVariants = cva("flex flex-col gap-4", {
  variants: {
    layout: {
      "Text - Image": "flex-row",
      "Image - Text": "flex-col",
    },
  },
  defaultVariants: {
    layout: "Text - Image",
  },
});

const TwoColumnTextImage = ({
  layout = "Text - Image",
  preHeading = "About us",
  heading = "Who we are",
  headingElement = "h2",
  text = "This is a space to talk about your organization, its products, services or values.",
  image = "https://raw.githubusercontent.com/balintbrews/drupal-xb-js-components-storybook-starter/refs/heads/main/src/assets/placeholder-light.png",
}) => {
  return (
    <div className={twoColumnTextImageLayoutVariants({ layout })}>
      <div className="">
        <Heading
          preHeading={preHeading}
          heading={heading}
          headingSize="Medium"
          headingElement={headingElement}
          className="mb-4"
        />
        <p>{text}</p>
      </div>
      <div>
        <img src={image} alt={heading} />
      </div>
    </div>
  );
};

TwoColumnTextImage.displayName = "TwoColumnTextImage";
export default TwoColumnTextImage;
