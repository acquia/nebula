import LogoCard from "./logo-card";

const meta = {
  title: "Components/LogoCard",
  component: LogoCard,
  argTypes: {
  },
};

export default meta;

export const Default = {
  args: {
    image: "/src/assets/images/logo.svg",
    backgroundColor: "#F1F5F9",
    altText: "website logo",
  },
};
