import { useId } from "react";
import { cva } from "class-variance-authority";
import { cn } from "drupal-canvas";

const accordionVariants = cva("w-full", {
  variants: {
    borderColor: {
      gray_200: "",
      gray_300: "",
      gray_400: "",
      primary_200: "",
      primary_300: "",
    },
    variant: {
      default: "",
      bordered: "",
      separated: "flex flex-col gap-2",
    },
  },
  defaultVariants: {
    borderColor: "gray_200",
    variant: "default",
  },
});

const Accordion = ({
  borderColor = "gray_200",
  className,
  items,
  variant = "default",
}) => {
  const groupId = useId().replace(/:/g, "");

  const defaultVariantBorderClassName = {
    gray_200: "divide-y divide-gray-200",
    gray_300: "divide-y divide-gray-300",
    gray_400: "divide-y divide-gray-400",
    primary_200: "divide-y divide-primary-200",
    primary_300: "divide-y divide-primary-300",
  };

  return (
    <div
      className={cn(
        accordionVariants({ borderColor, variant }),
        variant === "default" && defaultVariantBorderClassName[borderColor],
        className,
      )}
      data-accordion-group
      data-accordion-group-id={groupId}
      data-border-color={borderColor}
      data-variant={variant}
    >
      {items}
    </div>
  );
};

export default Accordion;
