import NavigationMenu from "./navigation-menu";

const meta = {
  title: "Overrides/NavigationMenu",
  component: NavigationMenu,
};

export default meta;

export const Default = {
  args: {
    id: "main-menu",
    label: "Main Menu",
    links: [
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
    ],
  },
};
