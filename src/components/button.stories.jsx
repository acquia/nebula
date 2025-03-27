import Button, { Link } from './button'

const meta = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: [
        'solid',
        'outlineDark',
        'outlineLight',
        'ghost',
        'link',
        'linkUnderline',
      ],
    },
  },
}

export default meta

export const Solid = {
  args: {
    variant: 'solid',
    children: 'Get started',
    link: '#',
  },
}

export const OutlineDark = {
  args: {
    variant: 'outlineDark',
    children: 'Learn more',
    link: '#',
  },
}

export const OutlineLight = {
  args: {
    variant: 'outlineLight',
    children: 'Learn more',
    link: '#',
  },
  decorators: [
    (Story) => (
      <div className="max-w-sm bg-black p-8">
        <Story />
      </div>
    ),
  ],
}

export const Ghost = {
  args: {
    variant: 'ghost',
    children: 'Learn more',
    link: '#',
  },
}

/**
 * Can be used for icon buttons, such as the social media icons
 */
export const GhostNeutral = {
  args: {
    variant: 'ghostNeutral',
    children: 'Learn more',
    link: '#',
  },
}

export const GhostLight = {
  args: {
    variant: 'ghostLight',
    children: 'Learn more',
    link: '#',
  },
  decorators: [
    (Story) => (
      <div className="max-w-sm bg-black p-8">
        <Story />
      </div>
    ),
  ],
}

/**
 * Button component with link variant.
 */
export const LinkWithChevron = {
  args: {
    variant: 'link',
    children: 'Learn more',
    link: '#',
  },
}

/**
 * Default Link component.
 */
export const LinkComponent = {
  render: (args) => <Link {...args} />,
  args: {
    variant: 'link',
    children: 'Learn more',
    link: '#',
  },
}

/**
 * For use within text.
 */
export const LinkComponentWithUnderline = {
  render: (args) => <Link {...args} />,
  args: {
    variant: 'linkUnderline',
    children: 'learn more about this',
    link: '#',
  },
}

/**
 * For use within footer navigation.
 */
export const LinkComponentDark = {
  render: (args) => <Link {...args} />,
  args: {
    variant: 'linkDark',
    children: 'Contact us',
    link: '#',
  },
}
