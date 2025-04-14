import Breadcrumb from './breadcrumb'

const meta = {
  component: Breadcrumb,
  title: 'Overrides/Breadcrumb',
  tags: ['autodocs'],
  argTypes: {
    className: {
      control: 'text',
    },
    textColor: {
      options: ['Dark', 'Light'],
      control: { type: 'select' },
    },
    textSize: {
      options: ['Large', 'Medium', 'Small'],
      control: { type: 'select' },
    },
  },
}

export default meta

const links = [
  { key: '1', text: 'Home', url: '#' },
  { key: '2', text: 'About', url: '#' },
  { key: '3', text: 'Contact' },
]

export const Default = {
  args: {
    links: links,
  },
}

/**
 * Support smaller breadcrumbs on dark backgrounds.
 */
export const SmallLight = {
  render: (args) => <Breadcrumb {...args} />,
  args: {
    links: links,
    textColor: 'Light',
    textSize: 'Small',
  },
  decorators: [
    (Story) => (
      <div className="max-w-sm p-8 bg-black">
        <Story />
      </div>
    ),
  ],
}
