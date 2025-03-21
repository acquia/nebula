import Text from "./text.jsx";

const meta = {
  title: "Components/Text",
  component: Text,
  argTypes: {
    textColor: {
      options: ["Dark", "Light"],
      control: { type: "select" },
    },
    textSize: {
      options: ["Normal", "Large"],
      control: { type: "select" },
    },
  },
};

export default meta;

export const Default = {
  args: {
    text: "This is a space to talk about your organization, its products, services or values. Encourage people to explore your offerings and discover how you meet their needs, provide solutions, and deliver value. Show how the site serves as more than just a platform; it’s a reflection of your dedication to building meaningful connections and ensuring your experience is nothing short of exceptional.",
    textColor: "Dark",
    textSize: "Normal",
  },
};
