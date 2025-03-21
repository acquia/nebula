import TwoColumnText from "./two-column-text";

export default {
  title: "Components/Two Column Text and IMG",
  component: TwoColumnText,
  argTypes: {
    layout: {
      control: "select",
      options: ["leftAligned", "centered"],
    },
  },
};

const Template = (args) => <TwoColumnText {...args} />;

export const Default = Template.bind({});
Default.args = {
  layout: "leftAligned",
  preHeading: "Mission",
  heading: "This space deserves a hero.",
  headingSize: "Large",
  text: "This is a space to welcome visitors to the site. Grab their attention with copy that clearly states what the site is about.",
  textColor: "Dark",
  button1Label: "Get Started",
  button1Link: "#get-started",
  button1Style: "Solid",
  button2Label: "Learn More",
  button2Link: "#learn-more",
  button2Style: "Outline",
  image:
    "https://github.com/balintbrews/drupal-xb-js-components-storybook-starter/blob/main/src/assets/images/placeholder.png?raw=true",
};
