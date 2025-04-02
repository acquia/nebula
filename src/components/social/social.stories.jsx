import { IconButton } from '../button'
import Social, {
  FacebookSolidIcon,
  GitHubSolidIcon,
  GoogleSolidIcon,
  InstagramOutlineIcon,
  LinkedInOutlineIcon,
} from './social'

const meta = {
  component: Social,
  tags: ['autodocs'],
  title: 'Components/Social',
  argTypes: {
    variant: {
      control: 'select',
      options: [
        'solid',
        'outlineDark',
        'outlineLight',
        'ghost',
        'ghostNeutral',
        'ghostLight',
      ],
    },
  },
}

export default meta

/**
 * Can also use IconButton which builds in the additional
 * className override. Alternatively, we could crate an IconButton
 */
function Buttons({ variant }) {
  return (
    <>
      <IconButton aria-label="Facebook" link="#" variant={variant}>
        <FacebookSolidIcon />
      </IconButton>
      <IconButton aria-label="Google" link="#" variant={variant}>
        <GoogleSolidIcon />
      </IconButton>
      <IconButton aria-label="GitHub" link="#" variant={variant}>
        <GitHubSolidIcon />
      </IconButton>
      <IconButton aria-label="Instagram" link="#" variant={variant}>
        <InstagramOutlineIcon />
      </IconButton>
      <IconButton aria-label="LinkedIn" link="#" variant={variant}>
        <LinkedInOutlineIcon />
      </IconButton>
    </>
  )
}

export const DefaultSolid = {
  args: {
    children: <Buttons variant="solid" />,
  },
}

export const Vertical = {
  args: {
    orientation: 'Vertical',
    children: <Buttons variant="solid" />,
  },
}

export const outlineDark = {
  args: {
    orientation: 'Vertical',
    children: <Buttons variant="outlineDark" />,
  },
}

export const outlineLight = {
  args: {
    children: <Buttons variant="outlineLight" />,
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
    children: <Buttons variant="ghost" />,
  },
}

export const GhostNeutral = {
  args: {
    children: <Buttons variant="ghostNeutral" />,
  },
}

export const ghostLight = {
  args: {
    children: <Buttons variant="ghostLight" />,
  },
  decorators: [
    (Story) => (
      <div className="max-w-sm bg-black p-8">
        <Story />
      </div>
    ),
  ],
}

export const GhostOnDark = {
  args: {
    children: <Buttons variant="ghost" />,
  },
  decorators: [
    (Story) => (
      <div className="max-w-sm bg-black p-8">
        <Story />
      </div>
    ),
  ],
}
