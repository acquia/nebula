import CardContainer from '../cardContainer'
import Testimonial from './testimonial'
import TestimonialCard from './testimonialCard'

const meta = {
  title: 'Components/Testimonial',
  component: null,
  argTypes: {
    intent: {
      control: 'select',
      options: ['primary', 'secondary', 'accent'],
    },
    spacing: {
      control: 'select',
      options: ['condensed', 'relaxed'],
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
    avatar: '/src/assets/images/logo.svg',
    avatarAltText: 'test alt text',
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
    headingSize: 'Medium',
    textColor: 'Dark',
    cardLayout: '3 columns',
    previewCardType: 'Feature Card',
    previewCardCount: 3,
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
          avatar="/src/assets/images/logo.svg"
          avatarAltText="test alt text"
        />
      )
    })

    return <CardContainer {...args}>{cards}</CardContainer>
  },
}

export const columnTestimonial = {
  args: {
    name: 'Garth Brooks',
    role: 'Boss',
    organization: 'Country music',
    text: 'Truly one of the products of all time.',
    avatar: '/src/assets/images/logo.svg',
    avatarAltText: 'test alt text',
  },
  render: (args) => {
    return <Testimonial {...args} />
  },
}
