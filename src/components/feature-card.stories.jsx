import FeatureCard from "./feature-card.jsx";

const meta = {
  title: "Components/FeatureCard",
  component: FeatureCard,
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
    backgroundColor: "#F1F5F9",
    backgroundColorOnHover: "#E2E8F0",
  },
};
