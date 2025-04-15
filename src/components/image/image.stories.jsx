import Image from './image.jsx'

const meta = {
  component: Image,
  tags: ['autodocs'],
  title: 'Components/Branding/Image',
}

export default meta

/**
 * Wrap an image tag.
 */
export const Default = {
  args: {
    src: '/src/assets/images/placeholder.png?raw=true',
    alt: 'Placeholder image',
  },
}
