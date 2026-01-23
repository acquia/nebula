import GridContainer from "@/components/grid_container";
import Heading from "@/components/heading";
import { cn } from "drupal-canvas";

const ThreeColumnCardContainer = ({
  className,
  headingPosition,
  heading,
  headingElement,
  headingSize = "large",
  preHeading,
  textColor,
  layout,
  content,
}) => {
  return (
    <div className={cn("mx-6 flex flex-col items-center gap-16", className)}>
      {heading ? (
        <Heading
          heading={heading}
          headingElement={headingElement}
          headingSize={headingSize}
          layout={headingPosition}
          preHeading={preHeading}
          textColor={textColor}
        />
      ) : null}
      <GridContainer content={content} layout={layout} />
    </div>
  );
};

export default ThreeColumnCardContainer;
