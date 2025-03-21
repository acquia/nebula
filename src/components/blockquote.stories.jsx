import Blockquote from "./blockquote.jsx";

const meta = {
  title: "Components/Blockquote",
  component: Blockquote,
  argTypes: {
    textColor: {
      options: ["Dark", "Light"],
      control: { type: "select" },
    },
  },
};

export default meta;

export const Default = {
  args: {
    text: "I just wanted to say that I'm very happy with my purchase so far. The experience builder is amazing and the documentation is outstanding - clear and detailed.",
    name: "Mark Villiams",
    title: "Product Manager | Capsule",
    textColor: "Dark",
  },
};

export const Minimal = {
  args: {
    text: "I just wanted to say that I'm very happy with my purchase so far. The experience builder is amazing and the documentation is outstanding - clear and detailed.",
    textColor: "Dark",
  },
};
