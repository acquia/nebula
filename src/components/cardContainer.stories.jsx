import imagePlaceholder from "../assets/images/card-placeholder.png";
import Card from "./card.jsx";
import CardContainer from "./cardContainer.jsx";
import FeatureCard from "./feature-card.jsx";

const meta = {
  title: "Sections/Card Container",
  component: CardContainer,
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
    cardLayout: {
      options: ["2 columns", "3 columns", "4 columns", "6 columns"],
      control: { type: "select" },
    },
    previewCardType: {
      options: ["Default Card", "Feature Card"],
      control: { type: "select" },
    },
    previewCardCount: {
      options: [1, 2, 3, 4, 6, 8, 12, 16],
      control: { type: "select" },
    },
  },
};
export default meta;

export const Default = {
  args: {
    layout: "Center aligned",
    preHeading: "Services",
    heading: "What we do.",
    headingElement: "h2",
    headingSize: "Medium",
    textColor: "Dark",
    cardLayout: "4 columns",
    previewCardType: "Default Card",
    previewCardCount: 4,
  },
  render: (args) => {
    // Create an array with a length equal to previewCardCount and fill it with null
    const cardsArray = Array(args.previewCardCount).fill(null);

    // Map over the array to render the appropriate card type
    const cards = cardsArray.map((_, index) => {
      if (args.previewCardType === "Feature Card") {
        return (
          <FeatureCard
            key={index}
            heading="Engaging title that represents the content."
            text="Some quick example text to build on the card title and make up the bulk of the card's content."
          />
        );
      } else {
        return (
          <Card
            key={index}
            heading="Engaging title that represents the content."
            text="Some quick example text to build on the card title and make up the bulk of the card's content."
            image={imagePlaceholder}
          />
        );
      }
    });

    return <CardContainer {...args}>{cards}</CardContainer>;
  },
};

export const FeatureContainer = {
  args: {
    layout: "Center aligned",
    preHeading: "Featured services",
    heading: "What we offer.",
    headingElement: "h2",
    headingSize: "Medium",
    textColor: "Dark",
    cardLayout: "3 columns",
    previewCardType: "Feature Card",
    previewCardCount: 6,
  },
  render: (args) => {
    // Create an array with a length equal to previewCardCount and fill it with null
    const cardsArray = Array(args.previewCardCount).fill(null);
    const cards = cardsArray.map((_, index) => {
      if (args.previewCardType === "Feature Card") {
        return (
          <FeatureCard
            key={index}
            heading="Engaging title that represents the content."
            text="Some quick example text to build on the card title and make up the bulk of the card's content."
          />
        );
      } else {
        return (
          <Card
            key={index}
            heading="Engaging title that represents the content."
            text="Some quick example text to build on the card title and make up the bulk of the card's content."
            image={imagePlaceholder}
          />
        );
      }
    });

    return <CardContainer {...args}>{cards}</CardContainer>;
  },
};
