import imagePlaceholder from '../assets/images/card-placeholder.png'
import Card from './card.jsx'

const meta = {
  component: Card,
  title: 'Components/Card',
  tags: ['autodocs'],
  argTypes: {
    altText: {
      control: 'text',
    },
    backgroundColor: {
      control: 'text',
    },
    backgroundColorOnHover: {
      control: 'text',
    },
    className: {
      control: 'text',
    },
    image: {
      control: 'text',
    },
    heading: {
      control: 'text',
    },
    headingElement: {
      options: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
      control: { type: 'select' },
    },
    layout: {
      options: ['Left aligned', 'Center aligned', 'Right aligned'],
      control: { type: 'select' },
    },
    link: {
      control: 'text',
    },
    linkLabel: {
      control: 'text',
    },
    linkVariant: {
      control: 'select',
      options: [
        'solid',
        'outlineDark',
        'outlineLight',
        'ghost',
        'ghostNeutral',
        'ghostLight',
        'link',
        'linkUnderline',
        'linkDark',
      ],
    },
    text: {
      control: 'text',
    },
    textColor: {
      options: ['Default', 'Dark', 'Light'],
      control: { type: 'select' },
    },
  },
}

export default meta

export const Default = {
  args: {
    heading: 'Engaging title that represents the content.',
    headingElement: 'h2',
    text: "Some quick example text to build on the card title and make up the bulk of the card's content.",
    linkLabel: 'Learn More',
    link: '#',
    image: imagePlaceholder,
    backgroundColor: '#ffffff',
    backgroundColorOnHover: '#E2E8F0',
  },
}
