import imagePlaceholder from "../assets/images/card-placeholder.png";
import Card from "./card.jsx";

const meta = {
  title: "Components/Card",
  component: Card,
  argTypes: {
    headingElement: {
      options: ["h1", "h2", "h3", "h4", "h5", "h6"],
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
    heading: "Engaging title that represents the content.",
    headingElement: "h2",
    text: "Some quick example text to build on the card title and make up the bulk of the card's content.",
    textColor: "Dark",
    linkLabel: "Learn More",
    link: "#",
    image: imagePlaceholder,
    backgroundColor: "#ffffff",
    backgroundColorOnHover: "#E2E8F0",
  },
};
