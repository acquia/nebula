import CardContainer from '../card/cardContainer'
import { MultiCarousel } from '../carousel'
import Testimonial from '../testimonial/testimonial.jsx'
import TestimonialSection from '../testimonial/testimonialSection.jsx'

const meta = {
  title: 'Components/Testimonial',
  component: null,
  tags: ['autodocs'],
  argTypes: {
    layout: {
      control: 'select',
      options: ['Left aligned', 'Center aligned', 'Right aligned'],
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

export const TestimonialDefault = {
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
    return <Testimonial {...args} />
  },
}

export const TestimonialNoText = {
  args: {
    name: 'Garth Brooks',
    role: 'Boss',
    organization: 'Country music',
    avatar: '/src/assets/images/acquia-logo.svg',
    avatarAltText: 'test alt text',
    textSize: 'Small',
    textColor: 'Dark',
  },
  render: (args) => {
    return <Testimonial {...args} />
  },
}

export const TestimonialCenter = {
  args: {
    layout: 'Center aligned',
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
    return <Testimonial {...args} />
  },
}

export const TestimonialRight = {
  args: {
    layout: 'Right aligned',
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
    return <Testimonial {...args} />
  },
}

export const TestimonialCardDark = {
  args: {
    backgroundColor: '#000000',
    backgroundColorOnHover: '#333333',
    name: 'Garth Brooks',
    role: 'Boss',
    organization: 'Country music',
    text: 'Truly one of the products of all time.',
    avatar: '/src/assets/images/acquia-logo.svg',
    avatarAltText: 'test alt text',
    textSize: 'Small',
    textColor: 'Light',
  },
  render: (args) => {
    return <Testimonial {...args} />
  },
}

/**
 * Uses the Testimonial component in a CardContainer.
 */
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
        <Testimonial
          key={`logo-card-${index}`}
          avatar="/src/assets/images/acquia-logo.svg"
          avatarAltText="test alt text"
          name="Garth Brooks"
          organization="Country music"
          role="Boss"
          text="Truly one of the products of all time."
          textSize={args.textSize}
        />
      )
    })

    return <CardContainer {...args}>{cards}</CardContainer>
  },
}

/**
 * Uses a TestimonialSection component.
 */
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

/**
 * Uses a TestimonialSection component with right aligned image.
 */
export const testimonialSectionWithImageRight = {
  args: {
    name: 'Garth Brooks',
    organization: 'Country music',
    text: 'Truly one of the products of all time.',
    textColor: 'Dark',
    textSize: 'Large',
    avatar: '/src/assets/images/acquia-logo.svg',
    avatarAltText: 'test alt text',
    image: '/src/assets/images/placeholder.png',
    imageAltText: 'test alt text',
    imagePlacement: 'right',
    layout: 'Right aligned',
    background: '/src/assets/images/hero-placeholder-light.png',
  },
  render: (args) => {
    return <TestimonialSection {...args} />
  },
}

/**
 * Uses a TestimonialSection component with no side image, just background image.
 */
export const testimonialSectionDarkBg = {
  args: {
    name: 'Garth Brooks',
    role: 'Boss',
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

/**
 * Uses the Carousel component to display testimonial cards.
 */
export const TestimonialCarousel = {
  args: {
    items: [
      {
        name: 'Garth Brooks',
        role: 'Boss',
        organization: 'Country music',
        text: 'Best of all time.',
        avatar: '/src/assets/images/acquia-logo.svg',
        avatarAltText: 'test alt text',
        textSize: 'Small',
        textColor: 'Dark',
      },
      {
        name: 'Dolly Parton',
        role: 'Singer',
        organization: 'Country music',
        text: 'An amazing experience!',
        avatar: '/src/assets/images/acquia-logo.svg',
        avatarAltText: 'test alt text',
        textSize: 'Small',
        textColor: 'Dark',
      },
      {
        name: 'Johnny Cash',
        role: 'Legend',
        organization: 'Country music',
        text: 'Absolutely fantastic!',
        avatar: '/src/assets/images/acquia-logo.svg',
        avatarAltText: 'test alt text',
        textSize: 'Small',
        textColor: 'Dark',
      },
      {
        name: 'Willie Nelson',
        role: 'Singer',
        organization: 'Country music',
        text: 'A truly remarkable product!',
        avatar: '/src/assets/images/acquia-logo.svg',
        avatarAltText: 'test alt text',
        textSize: 'Small',
        textColor: 'Dark',
      },
      {
        name: 'Reba McEntire',
        role: 'Actress',
        organization: 'Country music',
        text: 'Exceeded all my expectations!',
        avatar: '/src/assets/images/acquia-logo.svg',
        avatarAltText: 'test alt text',
        textSize: 'Small',
        textColor: 'Dark',
      },
      {
        name: 'Kenny Rogers',
        role: 'Legend',
        organization: 'Country music',
        text: 'Simply outstanding!',
        avatar: '/src/assets/images/acquia-logo.svg',
        avatarAltText: 'test alt text',
        textSize: 'Small',
        textColor: 'Dark',
      },
    ],
    visibleItems: 3, // New property to specify the number of visible items
  },
  render: (args) => {
    const testimonialItems = args.items.map((item, index) => (
      <Testimonial key={`testimonial-${index}`} {...item} />
    ))

    return (
      <MultiCarousel
        items={testimonialItems}
        slidesToShow={args.visibleItems}
      />
    )
  },
}
