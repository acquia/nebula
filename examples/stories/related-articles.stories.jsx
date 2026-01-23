import RelatedArticlesContainer from "@/components/related_articles";

const containerExampleArgs = {
  heading: "More articles",
  headingSize: "large",
  textColor: "dark",
  headingPosition: "center_aligned",
  headingElement: "h2",
  layout: "25-25-25-25",
};

export default {
  title: "Components/Related Articles",
  component: RelatedArticlesContainer,
  argTypes: {
    layout: {
      control: "select",
      options: ["50-50", "33-33-33", "50-25-25", "25-25-50", "25-25-25-25"],
    },
    textColor: {
      control: "select",
      options: ["dark", "light"],
    },
    headingSize: {
      control: "select",
      options: ["extra_large", "large", "medium", "small"],
    },
    headingPosition: {
      control: "select",
      options: ["left_aligned", "center_aligned", "right_aligned"],
    },
    headingElement: {
      control: "select",
      options: ["h1", "h2", "h3", "h4", "h5", "h6"],
    },
  },
};

export const Default = {
  args: {
    containerExampleArgs,
  },
};
