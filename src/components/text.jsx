import { cva } from "class-variance-authority";

const textVariants = cva("my-8", {
  variants: {
    textColor: {
      Dark: "",
      Light: "text-white",
    },
    textSize: {
      Normal: "text-base/6",
      Large: "text-xl/8",
    },
  },
});

const Text = ({ text, textSize, textColor }) => {
  return (
    <div className={textVariants({ textColor, textSize })}>
      <p>{text}</p>
    </div>
  );
};

export default Text;
