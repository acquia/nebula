import { cva } from "class-variance-authority";

import { cn } from "../lib/utils";
import Button from "./button";

const cardVariants = cva(
  "flex w-full max-w-md flex-col items-center gap-4 rounded-2xl pb-6 leading-[normal]",
  {
    variants: {
      textColor: {
        Dark: null,
        Light: "text-white",
      },
      image: {
        true: null,
        false: "pt-8",
      },
    },
  },
);

const Card = ({
  image,
  heading,
  headingElement = "h2",
  text,
  textColor,
  linkLabel,
  link,
  backgroundColor = "#ffffff",
  backgroundColorOnHover = "#E2E8F0",
  className,
}) => {
  const Heading = headingElement;
  const cardBackgroundClassName = `card-${backgroundColor.substring(1)}`;
  const cardBackgroundClassNameOnHover = `card-${backgroundColorOnHover.substring(1)}`;

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
      <div
        className={cn(
          cardVariants({ textColor, image: !!image }),
          cardBackgroundClassName,
          cardBackgroundClassNameOnHover,
          className,
        )}
      >
        {image && (
          <img
            className="w-full rounded-2xl object-cover object-center"
            src={image}
          />
        )}
        <div className="px-6 pt-2">
          {heading && (
            <Heading className="mb-4 text-lg font-bold">{heading}</Heading>
          )}
          {text && <p className="mb-4 leading-6">{text}</p>}
          {link && linkLabel && (
            <Button variant="link" link={link}>
              {linkLabel}
            </Button>
          )}
        </div>
      </div>
    </>
  );
};

export default Card;
