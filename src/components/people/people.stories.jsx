import Card from '../card'
import CardContainer from '../cardContainer'
import { Person, PersonCard, PersonSection } from './index'

const meta = {
  title: 'Components/People',
  component: Person,
  tags: ['autodocs'],
}

export default meta

/**
 * The default person component.
 */
export const PersonDefault = {
  args: {
    name: 'Garth Brooks',
    title: 'Boss / Country music',
    avatar: '/src/assets/images/person.jpg',
    avatarAltText: 'test alt text',
    headingElement: 'h4',
  },
  render: (args) => {
    return <Person {...args} />
  },
}

/**
 * Same as default person but with image and text classes to look like an Author.
 */
export const PersonStyledAsAuthor = {
  args: {
    align: 'left',
    name: 'Garth Brooks',
    title: 'Boss / Country music',
    avatar: '/src/assets/images/person.jpg',
    avatarAltText: 'test alt text',
    headingElement: 'h3',
    imageClasses: 'rounded-full',
    textClasses: 'items-start',
  },
  render: (args) => {
    return <Person {...args} />
  },
}

/**
 * No image passed in, (Author with no image).
 */
export const PersonAsAuthorNoImage = {
  args: {
    name: 'Garth Brooks',
    title: 'Boss / Country music',
    headingElement: 'h3',
  },
  render: (args) => {
    return <Person {...args} />
  },
}

/**
 * Person component with a dark background using Light text.
 */
export const PersonLight = {
  args: {
    avatar: '/src/assets/images/person.jpg',
    avatarAltText: 'test alt text',
    backgroundColor: '#000000',
    backgroundColorOnHover: '#333333',
    headingElement: 'h3',
    headingColor: 'Light',
    name: 'Garth Brooks',
    title: 'Boss / Country music',
    titleColor: 'Light',
  },
  render: (args) => {
    return (
      <div className="max-w-sm bg-black p-8">
        <Person {...args} />
      </div>
    )
  },
}

/**
 * This might not be needed and could be replaced by using the Card component.
 * See PersonUsingCardComponent.
 */
export const PersonCardComponent = {
  args: {
    backgroundColor: '#ffffff',
    backgroundColorOnHover: '#E2E8F0',
    name: 'Garth Brooks',
    title: 'Boss / Country music',
    avatar: '/src/assets/images/person.jpg',
    avatarAltText: 'test alt text',
    headingElement: 'h4',
  },
  render: (args) => {
    return <PersonCard {...args} />
  },
}

/**
 * Probably use this Card component instead of the PersonCard.
 */
export const PersonUsingCardComponent = {
  args: {},
  render: () => {
    return (
      <Card
        heading="Garth Brooks"
        headingElement="h2"
        image="/src/assets/images/person.jpg"
        text="Boss / Country music"
        textColor="Dark"
      ></Card>
    )
  },
}

/**
 * Uses the PersonCard component to create a section of cards.
 * May not be needed as Card and CardContainer can be used instead.
 */
export const PersonCardSection = {
  args: {
    backgroundColor: '#ffffff',
    backgroundColorOnHover: '#E2E8F0',
    name: 'Garth Brooks',
    title: 'Boss / Country music',
    avatar: '/src/assets/images/person.jpg',
    avatarAltText: 'test alt text',
    headingElement: 'h3',
    cardLayout: '6 columns',
    previewCardCount: 12,
    layout: 'Center aligned',
    preHeading: 'Team',
    heading: 'Meet our experts.',
    headingSize: 'Medium',
    textColor: 'Dark',
    previewCardType: 'Feature Card',
  },
  render: (args) => {
    const cardsArray = Array(args.previewCardCount).fill(null)
    const cards = cardsArray.map((_, index) => {
      return <PersonCard key={index} {...args} />
    })
    return <CardContainer {...args}>{cards}</CardContainer>
  },
}

/**
 * Probably use this Card and CardContainer component instead of the PersonCard.
 */
export const PersonUsingCardSection = {
  args: {
    headingElement: 'h3',
    cardLayout: '4 columns',
    previewCardCount: 4,
    layout: 'Center aligned',
    preHeading: 'Team',
    heading: 'Meet our leadership.',
    headingSize: 'Medium',
    textColor: 'Dark',
    previewCardType: 'Feature Card',
  },
  render: (args) => {
    const cardsArray = Array(args.previewCardCount).fill(null)
    const cards = cardsArray.map((_, index) => {
      return (
        <Card
          key={index}
          altText={'test alt text'}
          heading="Garth Brooks"
          headingElement="h2"
          image="/src/assets/images/person.jpg"
          text="Boss / Country music"
          textColor="Dark"
        ></Card>
      )
    })
    return <CardContainer {...args}>{cards}</CardContainer>
  },
}

/**
 * This uses the Card and CardContainer component to create a section of person cards.
 */
export const PersonUsingCardSectionLight = {
  args: {
    headingElement: 'h3',
    cardLayout: '4 columns',
    previewCardCount: 4,
    layout: 'Center aligned',
    preHeading: 'Team',
    heading: 'Meet our leadership.',
    headingSize: 'Medium',
    textColor: 'Dark',
    previewCardType: 'Feature Card',
  },
  render: (args) => {
    const cardsArray = Array(args.previewCardCount).fill(null)
    const cards = cardsArray.map((_, index) => {
      return (
        <Card
          key={index}
          altText="test alt text"
          backgroundColor="#000000"
          backgroundColorOnHover="#333333"
          heading="Garth Brooks"
          headingElement="h2"
          image="/src/assets/images/person.jpg"
          text="Boss / Country music"
          textColor="Light"
        ></Card>
      )
    })
    return <CardContainer {...args}>{cards}</CardContainer>
  },
}

/**
 * Uses the PersonCard and PerseonSection component.
 */
export const PersonSectionDefault = {
  args: {
    backgroundColor: '#ffffff',
    backgroundColorOnHover: '#E2E8F0',
    layout: 'column',
    name: 'Garth Brooks',
    title: 'Boss / Country music',
    avatar: '/src/assets/images/person.jpg',
    avatarAltText: 'test alt text',
    headingElement: 'h3',
    cardLayout: '3 columns',
    previewCardCount: 6,
    preHeading: 'Team',
    heading: 'Meet our experts.',
    headingSize: 'Medium',
    textColor: 'Dark',
    link: '/link',
    linkLabel: 'Learn more',
    previewCardType: 'Feature Card',
    text: 'Use this section to introduce the people behind your organization. Emphasize how your team’s collective strengths contribute to the company’s mission and ability to serve customers effectively. This section should reflect your brand’s tone, whether it’s friendly, professional, or innovative, and build confidence in your organization. ',
  },
  render: (args) => {
    const cardsArray = Array(args.previewCardCount).fill(null)
    const cards = cardsArray.map((_, index) => {
      return <PersonCard key={index} {...args} />
    })
    return <PersonSection {...args}>{cards}</PersonSection>
  },
}
