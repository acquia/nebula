import Testimonial from "./testimonial";

const meta = {
  title: "Testimonial",
  component: Testimonial,
  argTypes: {
    intent: {
      control: "select",
      options: ["primary", "secondary", "accent"],
    },
    spacing: {
      control: "select",
      options: ["condensed", "relaxed"],
    },
  },
};

export default meta;

export const Default = {
  args: {
    name: "Dries Buytaert",
    title: "Founder of Drupal",
    quote:
      "Looking to the future, I hope the Experience Builder becomes the preferred Drupal tool for layout design, page building, and basic theming. Our main goal is to create a tool that site builders love, with an amazing out-of-the-box experience.",
  },
};

export const Secondary = {
  args: {
    ...Default.args,
    intent: "secondary",
  },
};

export const Accent = {
  args: {
    ...Default.args,
    intent: "accent",
  },
};

export const Condensed = {
  args: {
    ...Default.args,
    spacing: "condensed",
  },
};

export const Relaxed = {
  args: {
    ...Default.args,
    spacing: "relaxed",
  },
};
