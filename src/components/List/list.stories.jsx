import List from './list'

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

export const Default = {
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

export const CustomContent = {
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
