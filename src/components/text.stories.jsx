import Text from './text.jsx'

const meta = {
  component: Text,
  tags: ['autodocs'],
  title: 'Components/Text',
  argTypes: {
    textColor: {
      options: ['Dark', 'Light'],
      control: { type: 'select' },
    },
    textSize: {
      options: ['ExtraSmall', 'Small', 'Normal', 'Large', 'ExtraLarge'],
      control: { type: 'select' },
    },
  },
}

export default meta

/**
 * Used in footer, like with copyright text.
 */
export const ExtraSmall = {
  args: {
    text: 'This is a space to talk about your organization, its products, services or values. Encourage people to explore your offerings and discover how you meet their needs, provide solutions, and deliver value. Show how the site serves as more than just a platform; it’s a reflection of your dedication to building meaningful connections and ensuring your experience is nothing short of exceptional.',
    textColor: 'Dark',
    textSize: 'ExtraSmall',
  },
}

export const Small = {
  args: {
    text: 'This is a space to talk about your organization, its products, services or values. Encourage people to explore your offerings and discover how you meet their needs, provide solutions, and deliver value. Show how the site serves as more than just a platform; it’s a reflection of your dedication to building meaningful connections and ensuring your experience is nothing short of exceptional.',
    textColor: 'Dark',
    textSize: 'Small',
  },
}

export const Default = {
  args: {
    text: 'This is a space to talk about your organization, its products, services or values. Encourage people to explore your offerings and discover how you meet their needs, provide solutions, and deliver value. Show how the site serves as more than just a platform; it’s a reflection of your dedication to building meaningful connections and ensuring your experience is nothing short of exceptional.',
    textColor: 'Dark',
    textSize: 'Normal',
  },
}

export const Large = {
  args: {
    text: 'This is a space to talk about your organization, its products, services or values. Encourage people to explore your offerings and discover how you meet their needs, provide solutions, and deliver value. Show how the site serves as more than just a platform; it’s a reflection of your dedication to building meaningful connections and ensuring your experience is nothing short of exceptional.',
    textColor: 'Dark',
    textSize: 'Large',
  },
}

export const ExtraLarge = {
  args: {
    text: 'This is a space to talk about your organization, its products, services or values. Encourage people to explore your offerings and discover how you meet their needs, provide solutions, and deliver value. Show how the site serves as more than just a platform; it’s a reflection of your dedication to building meaningful connections and ensuring your experience is nothing short of exceptional.',
    textColor: 'Dark',
    textSize: 'ExtraLarge',
  },
}

export const LightExtraSmall = {
  args: {
    text: 'This is a space to talk about your organization, its products, services or values. Encourage people to explore your offerings and discover how you meet their needs, provide solutions, and deliver value. Show how the site serves as more than just a platform; it’s a reflection of your dedication to building meaningful connections and ensuring your experience is nothing short of exceptional.',
    textColor: 'Light',
    textSize: 'ExtraSmall',
  },
  decorators: [
    (Story) => (
      <div className="bg-black p-8">
        <Story />
      </div>
    ),
  ],
}

export const LightSmall = {
  args: {
    text: 'This is a space to talk about your organization, its products, services or values. Encourage people to explore your offerings and discover how you meet their needs, provide solutions, and deliver value. Show how the site serves as more than just a platform; it’s a reflection of your dedication to building meaningful connections and ensuring your experience is nothing short of exceptional.',
    textColor: 'Light',
    textSize: 'Small',
  },
  decorators: [
    (Story) => (
      <div className="bg-black p-8">
        <Story />
      </div>
    ),
  ],
}

export const LightNormal = {
  args: {
    text: 'This is a space to talk about your organization, its products, services or values. Encourage people to explore your offerings and discover how you meet their needs, provide solutions, and deliver value. Show how the site serves as more than just a platform; it’s a reflection of your dedication to building meaningful connections and ensuring your experience is nothing short of exceptional.',
    textColor: 'Light',
    textSize: 'Normal',
  },
  decorators: [
    (Story) => (
      <div className="bg-black p-8">
        <Story />
      </div>
    ),
  ],
}

export const LightLarge = {
  args: {
    text: 'This is a space to talk about your organization, its products, services or values. Encourage people to explore your offerings and discover how you meet their needs, provide solutions, and deliver value. Show how the site serves as more than just a platform; it’s a reflection of your dedication to building meaningful connections and ensuring your experience is nothing short of exceptional.',
    textColor: 'Light',
    textSize: 'Large',
  },
  decorators: [
    (Story) => (
      <div className="bg-black p-8">
        <Story />
      </div>
    ),
  ],
}

export const LightExtraLarge = {
  args: {
    text: 'This is a space to talk about your organization, its products, services or values. Encourage people to explore your offerings and discover how you meet their needs, provide solutions, and deliver value. Show how the site serves as more than just a platform; it’s a reflection of your dedication to building meaningful connections and ensuring your experience is nothing short of exceptional.',
    textColor: 'Light',
    textSize: 'ExtraLarge',
  },
  decorators: [
    (Story) => (
      <div className="bg-black p-8">
        <Story />
      </div>
    ),
  ],
}
