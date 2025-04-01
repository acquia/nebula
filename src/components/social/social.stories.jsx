import Social, {
  FacebookSolidIcon,
  GitHubSolidIcon,
  GoogleSolidIcon,
  InstagramOutlineIcon,
  LinkedInOutlineIcon,
  SocialIconButton,
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

function Buttons({ variant }) {
  return (
    <>
      <SocialIconButton aria-label="Facebook" link="#" variant={variant}>
        <FacebookSolidIcon />
      </SocialIconButton>
      <SocialIconButton aria-label="Google" link="#" variant={variant}>
        <GoogleSolidIcon />
      </SocialIconButton>
      <SocialIconButton aria-label="GitHub" link="#" variant={variant}>
        <GitHubSolidIcon />
      </SocialIconButton>
      <SocialIconButton aria-label="Instagram" link="#" variant={variant}>
        <InstagramOutlineIcon />
      </SocialIconButton>
      <SocialIconButton aria-label="LinkedIn" link="#" variant={variant}>
        <LinkedInOutlineIcon />
      </SocialIconButton>
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
