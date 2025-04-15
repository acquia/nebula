import LogoCard from './logo-card'

const meta = {
  component: LogoCard,
  title: 'Components/LogoCard',
  tags: ['autodocs'],
  argTypes: {},
}

export default meta

export const Default = {
  args: {
    image: '/src/assets/images/logo.svg',
    backgroundColor: '#F1F5F9',
    altText: 'website logo',
  },
}
