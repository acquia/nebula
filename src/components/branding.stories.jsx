import logo from "../assets/images/logo.svg";
import Branding from "./branding";

const meta = {
  title: "Overrides/Branding",
  component: Branding,
};

export default meta;

export const Default = {
  args: {
    homeUrl: "#",
    logo,
    siteName: "Drupal Experience Builder",
    siteSlogan: (
      <p>This website is the best. It&apos;s better than all the rest.</p>
    ),
  },
};
