import Breadcrumb from "./breadcrumb";

const meta = {
  title: "Overrides/Breadcrumb",
  component: Breadcrumb,
};

export default meta;

export const Default = {
  args: {
    links: [
      { key: "1", text: "Home", url: "#" },
      { key: "2", text: "About", url: "#" },
      { key: "3", text: "Contact" },
    ],
  },
};
