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

export const Icon = {
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
      <IconListItem bulletImage={bulletImage}>
        <span className="font-bold">Analysis. </span>
        This is a space to talk about your organization, its products, services
        or values. Encourage people to explore your offerings and discover how
        you meet their needs, provide solutions, and deliver value. Show how the
        site serves as more than just a platform; it’s a reflection of your
        dedication to building meaningful connections and ensuring your
        experience is nothing short of exceptional.
      </IconListItem>
      <IconListItem bulletImage={bulletImage}>
        <span className="font-bold">Exploration. </span>
        This is a space to talk about your organization, its products, services
        or values. Encourage people to explore your offerings and discover how
        you meet their needs, provide solutions, and deliver value. Show how the
        site serves as more than just a platform; it’s a reflection of your
        dedication to building meaningful connections and ensuring your
        experience is nothing short of exceptional.
      </IconListItem>
      <IconListItem bulletImage={bulletImage}>
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
