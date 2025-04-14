import Heading from './heading'

const meta = {
  title: 'Components/Heading',
  component: Heading,
  tags: ['autodocs'],
  argTypes: {
    layout: {
      options: ['Left aligned', 'Center aligned', 'Right aligned'],
      control: { type: 'select' },
    },
    headingElement: {
      options: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
      control: { type: 'select' },
    },
    headingSize: {
      options: ['ExtraLarge', 'Large', 'Medium', 'Small'],
      control: { type: 'select' },
    },
    textColor: {
      options: ['Dark', 'Light'],
      control: { type: 'select' },
    },
  },
}

export default meta

export const Default = {
  args: {
    className: '',
    heading: 'Our purpose and values.',
    headingElement: 'h2',
    headingSize: 'Large',
    layout: 'Left aligned',
    preHeading: 'Mission',
    textColor: 'Dark',
  },
}

export const NoPreheading = {
  args: {
    className: '',
    heading: 'Our purpose and values.',
    headingElement: 'h2',
    headingSize: 'Large',
    layout: 'Left aligned',
    preHeading: '',
    textColor: 'Dark',
  },
}

export const NoHeading = {
  args: {
    className: '',
    heading: '',
    headingElement: 'h2',
    headingSize: 'Large',
    layout: 'Left aligned',
    preHeading: 'Mission',
    textColor: 'Dark',
  },
}
