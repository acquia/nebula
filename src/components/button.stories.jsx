import Button from "./button";

const meta = {
  title: "Components/Button",
  component: Button,
  argTypes: {
    variant: {
      control: "select",
      options: ["solid", "outlineDark", "outlineLight", "ghost", "link"],
    },
  },
};

export default meta;

export const Solid = {
  args: {
    variant: "solid",
    children: "Get started",
    link: "#",
  },
};

export const OutlineDark = {
  args: {
    variant: "outlineDark",
    children: "Learn more",
    link: "#",
  },
};

export const OutlineLight = {
  args: {
    variant: "outlineLight",
    children: "Learn more",
    link: "#",
  },
  decorators: [
    (Story) => (
      <div className="max-w-sm bg-black p-8">
        <Story />
      </div>
    ),
  ],
};

export const Ghost = {
  args: {
    variant: "ghost",
    children: "Learn more",
    link: "#",
  },
};

export const Link = {
  args: {
    variant: "link",
    children: "Learn more",
    link: "#",
  },
};
