import Card from '../card'
import CardContainer from '../cardContainer'
import { Author, Person, PersonCard, PersonSection } from './index'

const meta = {
  title: 'Components/People',
  component: Person,
  tags: ['autodocs'],
}

export default meta

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

export const PersonCardDefault = {
  args: {
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

export const PersonUsingCard = {
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

export const PersonCardSection = {
  args: {
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

export const PersonSectionDefault = {
  args: {
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

export const AuthorDefault = {
  args: {
    name: 'Garth Brooks',
    title: 'Boss / Country music',
    avatar: '/src/assets/images/person.jpg',
    avatarAltText: 'test alt text',
    headingElement: 'h3',
  },
  render: (args) => {
    return <Author {...args} align="left" />
  },
}

export const AuthorNoImage = {
  args: {
    name: 'Garth Brooks',
    title: 'Boss / Country music',
    headingElement: 'h3',
  },
  render: (args) => {
    return <Author {...args} align="left" />
  },
}

export const AuthorLight = {
  args: {
    avatar: '/src/assets/images/person.jpg',
    avatarAltText: 'test alt text',
    headingElement: 'h3',
    headingColor: 'Light',
    name: 'Garth Brooks',
    title: 'Boss / Country music',
    titleColor: 'Light',
  },
  render: (args) => {
    return (
      <div className="max-w-sm bg-black p-8">
        <Author {...args} align="left" />
      </div>
    )
  },
}
