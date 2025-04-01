import CardContainer from '../cardContainer'
import TestimonialCard from './testimonialCard'
import TestimonialSection from './testimonialSection'

const meta = {
  title: 'Components/Testimonial',
  component: null,
  tags: ['autodocs'],
  argTypes: {
    intent: {
      control: 'select',
      options: ['primary', 'secondary', 'accent'],
    },
    spacing: {
      control: 'select',
      options: ['condensed', 'relaxed'],
    },
    textColor: {
      control: 'select',
      options: ['Dark', 'Light'],
    },
    textSize: {
      control: 'select',
      options: ['Small', 'Medium', 'Large'],
    },
  },
}

export default meta

export const TestimonialCardDefault = {
  args: {
    name: 'Garth Brooks',
    role: 'Boss',
    organization: 'Country music',
    text: 'Truly one of the products of all time.',
    avatar: '/src/assets/images/acquia-logo.svg',
    avatarAltText: 'test alt text',
    textSize: 'Small',
    textColor: 'Dark',
  },
  render: (args) => {
    return (
      <TestimonialCard
        name={args.name}
        role={args.role}
        organization={args.organization}
        text={args.text}
        avatar={args.avatar}
        avatarAltText={args.avatarAltText}
        textSize={args.textSize}
      />
    )
  },
}

export const TestimonialContainer = {
  args: {
    layout: 'Center aligned',
    preHeading: 'Testimonials',
    heading: 'What our customers say.',
    headingElement: 'h2',
    headingSize: 'Large',
    textColor: 'Dark',
    cardLayout: '3 columns',
    previewCardType: 'Feature Card',
    previewCardCount: 3,
    textSize: 'Medium',
  },
  render: (args) => {
    // Create an array with a length equal to previewCardCount and fill it with null
    const cardsArray = Array(args.previewCardCount).fill(null)
    const cards = cardsArray.map((_, index) => {
      return (
        <TestimonialCard
          key={`logo-card-${index}`}
          name="Garth Brooks"
          role="Boss"
          organization="Country music"
          text="Truly one of the products of all time."
          avatar="/src/assets/images/acquia-logo.svg"
          avatarAltText="test alt text"
          textSize={args.textSize}
        />
      )
    })

    return <CardContainer {...args}>{cards}</CardContainer>
  },
}

export const testimonialSectionWithImage = {
  args: {
    name: 'Garth Brooks',
    role: 'Boss',
    organization: 'Country music',
    text: 'Truly one of the products of all time.',
    textColor: 'Dark',
    textSize: 'Large',
    avatar: '/src/assets/images/acquia-logo.svg',
    avatarAltText: 'test alt text',
    image: '/src/assets/images/placeholder.png',
    imageAltText: 'test alt text',
    background: '/src/assets/images/hero-placeholder-light.png',
  },
  render: (args) => {
    return <TestimonialSection {...args} />
  },
}

export const testimonialSectionDarkBg = {
  args: {
    name: 'Garth Brooks',
    role: 'Boss',
    organization: 'Country music',
    text: 'Truly one of the products of all time.',
    avatar: '/src/assets/images/acquia-logo.svg',
    avatarAltText: 'test alt text',
    background: '/src/assets/images/hero-background-placeholder-dark.png',
    textColor: 'Light',
  },
  render: (args) => {
    return <TestimonialSection {...args} />
  },
}
