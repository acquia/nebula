import Heading from "./heading.jsx";
import Image from "./image.jsx";
import Section from "./section.jsx";
import Text from "./text.jsx";

const meta = {
  title: "Sections/Section",
  component: Section,
  argTypes: {
    width: {
      options: ["Normal", "Wide"],
      control: { type: "select" },
    },
  },
};
export default meta;

export const Default = {
  args: {
    width: "Normal",
  },
  render: (args) => (
    <Section {...args}>
      <Heading
        heading="Who we are."
        preHeading="About us"
        headingSize="Medium"
      />
      <Text
        text="This is a space to talk about your organization, its products, services or values. Encourage people to explore your offerings and discover how you meet their needs, provide solutions, and deliver value. Show how the site serves as more than just a platform; it’s a reflection of your dedication to building meaningful connections and ensuring your experience is nothing short of exceptional."
        textSize="Large"
      />
      <Text text="This is a space to talk about your organization, its products, services or values. Encourage people to explore your offerings and discover how you meet their needs, provide solutions, and deliver value. Show how the site serves as more than just a platform; it’s a reflection of your dedication to building meaningful connections and ensuring your experience is nothing short of exceptional." />
      <Image
        image={{
          src: "https://github.com/balintbrews/drupal-xb-js-components-storybook-starter/blob/main/src/assets/images/placeholder.png?raw=true",
          alt: "Who we are.",
        }}
      />
    </Section>
  ),
};
