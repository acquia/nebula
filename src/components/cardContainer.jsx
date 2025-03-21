import { cva } from "class-variance-authority";

import { cn } from "../lib/utils.js";
import Heading from "./heading.jsx";

const gridVariants = cva(
  "mx-auto grid w-full max-w-[1360px] place-items-center gap-4",
  {
    variants: {
      cardLayout: {
        "2 columns": "grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-2",
        "3 columns": "grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3",
        "4 columns": "grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4",
        "6 columns": "grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-6",
      },
    },
    defaultVariants: {
      cardLayout: "3 column",
    },
  },
);

const CardContainer = ({
  layout,
  preHeading,
  heading,
  headingSize = "Medium",
  headingLevel,
  textColor,
  //backgroundColor,
  cardLayout,
  children,
}) => {
  return (
    <div className="my-18 flex flex-col items-center gap-16 md:my-24">
      <Heading
        layout={layout}
        preHeading={preHeading}
        heading={heading}
        headingSize={headingSize}
        headingLevel={headingLevel}
        textColor={textColor}
      />
      <div className={cn(gridVariants({ cardLayout }))}>{children}</div>
    </div>
  );
};

export default CardContainer;
