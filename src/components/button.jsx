import { cva } from "class-variance-authority";

import { cn } from "../lib/utils";

const buttonVariants = cva(
  "focus-visible:ring-ring inline-flex cursor-pointer items-center justify-center gap-2 rounded-lg px-4 py-3 text-sm font-medium whitespace-nowrap transition-colors focus-visible:ring-1 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        solid: "bg-primary-600 text-white hover:bg-primary-700",
        outlineDark:
          "border border-primary-600 text-primary-600 hover:border-blue-500 hover:text-blue-500 focus:border-blue-500 focus:text-blue-500",
        outlineLight:
          "border border-white text-white hover:border-neutral-300 hover:text-neutral-300 focus:border-neutral-300 focus:text-neutral-300",
        ghost:
          "text-primary-600 hover:bg-primary-100 hover:text-primary-800 focus:bg-primary-100 focus:text-primary-800 focus:outline-none",
        link: "p-0 text-primary-600 hover:text-primary-800 focus:text-primary-800",
      },
    },
    defaultVariants: {
      variant: "solid",
    },
  },
);

const Button = ({
  children = "Button",
  link = "#",
  variant,
  className = "",
}) => {
  return (
    <a className={cn(buttonVariants({ variant, className }))} href={link}>
      <>
        {children}
        <ChevronRightIcon />
      </>
    </a>
  );
};

const ChevronRightIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-4 w-4"
  >
    <path d="m9 18 6-6-6-6" />
  </svg>
);

Button.displayName = "Button";
export default Button;
