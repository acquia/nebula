import { cva } from "class-variance-authority";

const blockquoteVariants = cva("my-8 flex w-full flex-col leading-[normal]", {
  variants: {
    textColor: {
      Dark: "",
      Light: "text-white",
    },
  },
});

const nameVariants = cva(
  "flex items-end self-stretch pt-5 leading-6 font-bold whitespace-pre-wrap",
  {
    variants: {
      textColor: {
        Dark: "",
        Light: "text-white",
      },
    },
  },
);

const titleVariants = cva("text-sm leading-5 whitespace-pre-wrap", {
  variants: {
    textColor: {
      Dark: "text-gray-500",
      Light: "text-gray-200",
    },
  },
});

const Blockquote = ({ text, textColor, name, title }) => {
  return (
    <div className={blockquoteVariants({ textColor })}>
      <div className="flex flex-grow justify-center gap-6">
        <div className="w-1 bg-gray-200" />
        <div className="flex-grow font-medium">
          <div className="flex items-start self-stretch text-xl leading-8">
            <p>{text}</p>
          </div>
          {name && <div className={nameVariants({ textColor })}>{name}</div>}
          {title && <div className={titleVariants({ textColor })}>{title}</div>}
        </div>
      </div>
    </div>
  );
};

export default Blockquote;
