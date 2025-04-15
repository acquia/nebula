import drupalLogo from '../../assets/images/logo.svg'
import Branding from '../branding/branding.jsx'
import Header from '../header/header'
import NavigationMenu from '../nav-menu/navigation-menu.jsx'

const meta = {
  component: Header,
  tags: ['autodocs'],
  title: 'Components/Header',
}

export default meta

const logo = <Branding homeUrl="#" logo={drupalLogo} />
const menu = (
  <NavigationMenu
    links={[
      {
        key: 'front_page',
        title: 'Home',
        url: '#',
        isExpanded: false,
        isCollapsed: false,
        inActiveTrail: false,
      },
      {
        key: 'about',
        title: 'About',
        url: '#',
        isExpanded: false,
        isCollapsed: false,
        inActiveTrail: false,
        submenu: [
          {
            key: 'team',
            title: 'Home',
            url: '#',
            isExpanded: false,
            isCollapsed: false,
            inActiveTrail: false,
          },
          {
            key: 'values',
            title: 'Values',
            url: '#',
            isExpanded: false,
            isCollapsed: false,
            inActiveTrail: false,
          },
          {
            key: 'history',
            title: 'History',
            url: '#',
            isExpanded: false,
            isCollapsed: false,
            inActiveTrail: false,
          },
        ],
      },
      {
        key: 'contact',
        title: 'Contact',
        url: '#',
        isExpanded: false,
        isCollapsed: false,
        inActiveTrail: false,
      },
    ]}
    menuId="main-menu"
    menuLabel="Main Menu"
  />
)
export const Default = {
  args: {},
  render: () => <Header logo={logo} menu={menu} />,
}

export const BackgroundColor = {
  args: {},
  render: () => <Header backgroundColor="#efefef" logo={logo} menu={menu} />,
}

export const ClassName = {
  args: {},
  render: () => <Header className="bg-[#cccccc]" logo={logo} menu={menu} />,
}
