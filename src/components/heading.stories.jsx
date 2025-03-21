import Heading from "./heading";

const meta = {
  title: "Components/Heading",
  component: Heading,
  argTypes: {
    layout: {
      options: ["Left aligned", "Center aligned"],
      control: { type: "select" },
    },
    headingElement: {
      options: ["h1", "h2", "h3", "h4", "h5", "h6"],
      control: { type: "select" },
    },
    headingSize: {
      options: ["Large", "Medium", "Small"],
      control: { type: "select" },
    },
    textColor: {
      options: ["Dark", "Light"],
      control: { type: "select" },
    },
  },
};

export default meta;

export const Default = {
  args: {
    layout: "Left aligned",
    preHeading: "Mission",
    heading: "Our purpose and values.",
    headingElement: "h2",
    headingSize: "Medium",
    textColor: "Dark",
  },
};
