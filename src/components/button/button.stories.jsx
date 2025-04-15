import { FacebookSolidIcon } from '../social'
import Button, { IconButton, Link } from './button'

const meta = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    className: {
      control: 'text',
    },
    link: {
      control: 'text',
    },
    variant: {
      control: 'select',
      options: [
        'solid',
        'outlineDark',
        'outlineLight',
        'ghost',
        'ghostNeutral',
        'ghostLight',
        'link',
        'linkUnderline',
        'linkDark',
        'linkLight',
        'navLinkDark',
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

/**
 * Use on dark backgrounds
 */
export const OutlineLight = {
  args: {
    variant: 'outlineLight',
    children: 'Learn more',
    link: '#',
  },
  decorators: [
    (Story) => (
      <div className="max-w-sm p-8 bg-black">
        <Story />
      </div>
    ),
  ],
}

/**
 * Only looks like a button after interaction.
 */
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

/**
 * Use on dark backgrounds.
 */
export const GhostLight = {
  args: {
    variant: 'ghostLight',
    children: 'Learn more',
    link: '#',
  },
  decorators: [
    (Story) => (
      <div className="max-w-sm p-8 bg-black">
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

/**
 * Use within footer navigation on dark backgrounds.
 */
export const LinkComponentLight = {
  render: (args) => <Link {...args} />,
  args: {
    variant: 'linkLight',
    children: 'Contact us',
    link: '#',
  },
  decorators: [
    (Story) => (
      <div className="max-w-sm p-8 bg-black">
        <Story />
      </div>
    ),
  ],
}

/**
 * For use within navigation header.
 */
export const LinkComponentNavDark = {
  render: (args) => <Link {...args} />,
  args: {
    variant: 'navLinkDark',
    children: 'Home',
    link: '#',
  },
}

/**
 * For use for Social media icons.
 */
export const IconButtonComponentSolid = {
  render: (args) => <IconButton {...args} />,
  args: {
    variant: 'solid',
    children: <FacebookSolidIcon />,
    link: '#',
  },
}
