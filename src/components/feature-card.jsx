import { cva } from "class-variance-authority";

import { cn } from "../lib/utils";
import Button from "./button";

const cardVariants = cva(
  "flex w-full max-w-md flex-col items-start gap-4 rounded-2xl p-6 leading-[normal]",
  {
    variants: {
      textColor: {
        Dark: "",
        Light: "text-white",
      },
    },
  },
);

const FeatureCard = ({
  // icon,
  heading = "Card title",
  headingElement = "h2",
  text = "Some quick example text to build on the card title and make up the bulk of the card's content.",
  textColor = "Dark",
  linkLabel = "Learn more",
  link = "#",
  backgroundColor = "#FFFFFF",
  backgroundColorOnHover = "#F1F5F9",
  className,
}) => {
  const Heading = headingElement;

  return (
    <>
      <style>
        {`
          .card-${backgroundColor.substring(1)} {
            background-color: ${backgroundColor};
          } 
          .card-hover-${backgroundColorOnHover.substring(1)}:hover {
            background-color: ${backgroundColorOnHover};
          }
        `}
      </style>
      <div
        className={cn(
          cardVariants({ textColor }),
          `card-hover-${backgroundColorOnHover.substring(1)}`,
          `card-${backgroundColor.substring(1)}`,
          className,
        )}
      >
        <div className="">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-700">
            <FeatureIcon />
          </div>
          <Heading className="mb-4 text-lg font-bold">{heading}</Heading>
          <p className="mb-4 leading-6">{text}</p>
          <Button link={link} variant="link">
            {linkLabel}
          </Button>
        </div>
      </div>
    </>
  );
};

const FeatureIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M8 2H4C2.89543 2 2 2.89543 2 4V8C2 9.10457 2.89543 10 4 10H8C9.10457 10 10 9.10457 10 8V4C10 2.89543 9.10457 2 8 2Z"
      stroke="white"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M14 2C15.1 2 16 2.9 16 4V8C16 9.1 15.1 10 14 10"
      stroke="white"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M20 2C21.1 2 22 2.9 22 4V8C22 9.1 21.1 10 20 10"
      stroke="white"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M10 18H5C3.3 18 2 16.7 2 15V14"
      stroke="white"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M7 21L10 18L7 15"
      stroke="white"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M20 14H16C14.8954 14 14 14.8954 14 16V20C14 21.1046 14.8954 22 16 22H20C21.1046 22 22 21.1046 22 20V16C22 14.8954 21.1046 14 20 14Z"
      stroke="white"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default FeatureCard;
