import drupalLogo from "../assets/images/logo.svg";
import Branding from "./branding.jsx";
import Header from "./header";
import NavigationMenu from "./navigation-menu.jsx";

const meta = {
  title: "Components/Header",
  component: Header,
};

export default meta;

const logo = <Branding homeUrl="#" logo={drupalLogo} />;
const menu = (
  <NavigationMenu
    menuId="main-menu"
    menuLabel="Main Menu"
    links={[
      {
        key: "front_page",
        title: "Home",
        url: "#",
        isExpanded: false,
        isCollapsed: false,
        inActiveTrail: false,
      },
      {
        key: "about",
        title: "About",
        url: "#",
        isExpanded: false,
        isCollapsed: false,
        inActiveTrail: false,
        submenu: [
          {
            key: "team",
            title: "Home",
            url: "#",
            isExpanded: false,
            isCollapsed: false,
            inActiveTrail: false,
          },
          {
            key: "values",
            title: "Values",
            url: "#",
            isExpanded: false,
            isCollapsed: false,
            inActiveTrail: false,
          },
          {
            key: "history",
            title: "History",
            url: "#",
            isExpanded: false,
            isCollapsed: false,
            inActiveTrail: false,
          },
        ],
      },
      {
        key: "contact",
        title: "Contact",
        url: "#",
        isExpanded: false,
        isCollapsed: false,
        inActiveTrail: false,
      },
    ]}
  />
);
export const Default = {
  args: {},
  render: () => <Header logo={logo} menu={menu} />,
};
