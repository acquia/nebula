import Accordion from "@/components/accordion";
import AccordionItem from "@/components/accordion-item";

export default {
  title: "Components/Accordion",
  component: Accordion,
  argTypes: {
    borderColor: {
      control: "select",
      options: [
        "gray_200",
        "gray_300",
        "gray_400",
        "primary_200",
        "primary_300",
      ],
    },
    variant: {
      control: "select",
      options: ["default", "bordered", "separated"],
    },
  },
};

const ItemContent = ({ text }) => <p className="text-gray-700">{text}</p>;

const sampleItems = (
  <>
    <AccordionItem
      anchorId="faq-support"
      content={
        <ItemContent text="Accordion items support slot-based content, including nested components." />
      }
      defaultOpen
      title="What does this accordion support?"
    />
    <AccordionItem
      anchorId="faq-multiple"
      content={
        <ItemContent text="Multiple panels can be open at the same time." />
      }
      title="Can multiple items be open?"
    />
    <AccordionItem
      anchorId="faq-editors"
      content={
        <ItemContent text="Use the Default Open prop in Canvas when you need editorial visibility for an item." />
      }
      title="How do editors preview content?"
    />
  </>
);

export const Default = {
  args: {
    borderColor: "gray_200",
    variant: "default",
    items: sampleItems,
  },
};

export const Bordered = {
  args: {
    borderColor: "gray_200",
    variant: "bordered",
    items: sampleItems,
  },
};

export const Separated = {
  args: {
    borderColor: "gray_200",
    variant: "separated",
    items: sampleItems,
  },
};
