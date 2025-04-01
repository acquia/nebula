import LogoCard from './logo-card.jsx'
import TextAndCardSection from './textAndCardSection.jsx'

const meta = {
  title: 'Sections/textAndCardSection',
  component: TextAndCardSection,
  argTypes: {
    layout: {
      options: ['row', 'column'],
      control: { type: 'select' },
    },
    headingElement: {
      options: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
      control: { type: 'select' },
    },
    headingSize: {
      options: ['Large', 'Medium', 'Small'],
      control: { type: 'select' },
    },
    text: String,
    textColor: {
      options: ['Dark', 'Light'],
      control: { type: 'select' },
    },
    cardLayout: {
      options: ['2 columns', '3 columns', '4 columns', '6 columns'],
      control: { type: 'select' },
    },
    previewCardType: {
      options: ['Default Card', 'Feature Card'],
      control: { type: 'select' },
    },
    previewCardCount: {
      options: [1, 2, 3, 4, 6, 8, 12, 16],
      control: { type: 'select' },
    },
  },
}
export default meta

export const TitleWith3ColLogoCards = {
  args: {
    layout: 'row',
    preHeading: 'Our customers',
    heading: "You're in good company.",
    headingElement: 'h2',
    headingSize: 'Medium',
    textColor: 'Dark',
    text: 'Use this section to introduce the organizations you work with and build trust in your organization through association.',
    linkLabel: 'Read our customer stories',
    cardLayout: '3 columns',
    previewCardType: 'Feature Card',
    previewCardCount: 6,
  },
  render: (args) => {
    // Create an array with a length equal to previewCardCount and fill it with null
    const cardsArray = Array(args.previewCardCount).fill(null)
    const cards = cardsArray.map((_, index) => {
      return (
        <LogoCard
          key={`logo-card-${index}`}
          altText="Company logo"
          image="/src/assets/images/logo.svg"
        />
      )
    })

    return <TextAndCardSection {...args}>{cards}</TextAndCardSection>
  },
}
