import { IconListItem, List } from './index'

const meta = {
  component: List,
  tags: ['autodocs'],
  title: 'Components/List',
  argTypes: {
    type: {
      description: 'Specifies the type of list.',
      options: ['Unordered', 'Ordered', 'None'],
      control: {
        type: 'select',
      },
    },
  },
}

export const DefaultNone = {
  args: {
    items: [{ text: 'Item 1' }, { text: 'Item 2' }, { text: 'Item 3' }],
  },
}

export const Unordered = {
  args: {
    items: [{ text: 'Item 1' }, { text: 'Item 2' }, { text: 'Item 3' }],
    type: 'Unordered',
  },
}

export const Ordered = {
  args: {
    items: [{ text: 'Item 1' }, { text: 'Item 2' }, { text: 'Item 3' }],
    type: 'Ordered',
  },
}

export const IconDark = {
  args: {
    items: [
      {
        text: 'Analysis. ',
      },
      {
        text: 'Exploration. ',
      },
      {
        text: 'Innovation. This is a space to talk about your organization, its products, services or values. Encourage people to explore your offerings and discover how you meet their needs, provide solutions, and deliver value. Show how the site serves as more than just a platform; it’s a reflection of your dedication to building meaningful connections and ensuring your experience is nothing short of exceptional.',
      },
    ],
    type: 'Icon',
    bulletImage: '/src/assets/images/bullet.svg',
  },
  render: ({ type, bulletImage }) => (
    <List type={type}>
      <IconListItem
        bulletImage={bulletImage}
        className="py-8 first:pt-0 last:pb-0 border-b border-solid border-gray-200"
        iconClassName="bg-primary-800 fill-white"
      >
        <span className="font-bold">Analysis. </span>
        This is a space to talk about your organization, its products, services
        or values. Encourage people to explore your offerings and discover how
        you meet their needs, provide solutions, and deliver value. Show how the
        site serves as more than just a platform; it’s a reflection of your
        dedication to building meaningful connections and ensuring your
        experience is nothing short of exceptional.
      </IconListItem>
      <IconListItem
        bulletImage={bulletImage}
        className="py-8 first:pt-0 last:pb-0 border-b border-solid border-gray-200"
        iconClassName="bg-primary-800 fill-white"
      >
        <span className="font-bold">Exploration. </span>
        This is a space to talk about your organization, its products, services
        or values. Encourage people to explore your offerings and discover how
        you meet their needs, provide solutions, and deliver value. Show how the
        site serves as more than just a platform; it’s a reflection of your
        dedication to building meaningful connections and ensuring your
        experience is nothing short of exceptional.
      </IconListItem>
      <IconListItem
        bulletImage={bulletImage}
        iconClassName="bg-primary-800 fill-white"
      >
        <span className="font-bold">Innovation. </span>
        This is a space to talk about your organization, its products, services
        or values. Encourage people to explore your offerings and discover how
        you meet their needs, provide solutions, and deliver value. Show how the
        site serves as more than just a platform; it’s a reflection of your
        dedication to building meaningful connections and ensuring your
        experience is nothing short of exceptional.
      </IconListItem>
    </List>
  ),
}

export const IconLight = {
  args: {
    items: [
      {
        text: 'Analysis. ',
      },
      {
        text: 'Exploration. ',
      },
      {
        text: 'Innovation. This is a space to talk about your organization, its products, services or values. Encourage people to explore your offerings and discover how you meet their needs, provide solutions, and deliver value. Show how the site serves as more than just a platform; it’s a reflection of your dedication to building meaningful connections and ensuring your experience is nothing short of exceptional.',
      },
    ],
    type: 'Icon',
    bulletImage: (
      <svg
        className="mt-1 size-6 dark:text-neutral-500 shrink-0 text-gray-500"
        fill="none"
        height="24"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        viewBox="0 0 24 24"
        width="24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="12" cy="12" r="10" />
        <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
        <path d="M12 17h.01" />
      </svg>
    ),
  },
  render: ({ type, bulletImage }) => (
    <div className="p-8 bg-black">
      <List textColor="Light" type={type}>
        <IconListItem bulletImage={bulletImage}>
          <p className="font-bold">Analysis. </p>
          This is a space to talk about your organization, its products,
          services or values. Encourage people to explore your offerings and
          discover how you meet their needs, provide solutions, and deliver
          value. Show how the site serves as more than just a platform; it’s a
          reflection of your dedication to building meaningful connections and
          ensuring your experience is nothing short of exceptional.
        </IconListItem>
        <IconListItem bulletImage={bulletImage}>
          <p className="font-bold">Exploration. </p>
          This is a space to talk about your organization, its products,
          services or values. Encourage people to explore your offerings and
          discover how you meet their needs, provide solutions, and deliver
          value. Show how the site serves as more than just a platform; it’s a
          reflection of your dedication to building meaningful connections and
          ensuring your experience is nothing short of exceptional.
        </IconListItem>
        <IconListItem bulletImage={bulletImage}>
          <p className="font-bold">Innovation. </p>
          This is a space to talk about your organization, its products,
          services or values. Encourage people to explore your offerings and
          discover how you meet their needs, provide solutions, and deliver
          value. Show how the site serves as more than just a platform; it’s a
          reflection of your dedication to building meaningful connections and
          ensuring your experience is nothing short of exceptional.
        </IconListItem>
      </List>
    </div>
  ),
}

export const VerticalNavigation = {
  args: {
    items: [
      { text: 'Item 1', url: 'http://www.acquia.com' },
      { text: 'Item 2', url: 'http://www.acquia.com' },
      { text: 'Item 3', url: '/foo' },
    ],
    type: 'None',
  },
}

export default meta
