import AccordionItem from "@/components/accordion-item";

export default {
  title: "Components/Accordion Item",
  component: AccordionItem,
  argTypes: {
    headingElement: {
      control: "select",
      options: ["h2", "h3", "h4", "h5", "h6"],
    },
    defaultOpen: {
      control: "boolean",
    },
    anchorId: {
      control: "text",
    },
  },
};

const SampleContent = () => (
  <div className="rounded-md bg-gray-100 p-4 text-gray-700">
    Add any Canvas components into the content slot.
  </div>
);

export const Closed = {
  args: {
    title: "What is included in this plan?",
    headingElement: "h3",
    defaultOpen: false,
    content: <SampleContent />,
  },
};

export const Open = {
  args: {
    title: "Can this item start expanded?",
    headingElement: "h3",
    defaultOpen: true,
    content: <SampleContent />,
  },
};
