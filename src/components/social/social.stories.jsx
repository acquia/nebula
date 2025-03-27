import Social from './social'

const meta = {
  component: Social,
  tags: ['autodocs'],
  title: 'Components/Social',
}
export default meta

export const DefaultSolid = {
  args: {},
}

export const Vertical = {
  args: {
    orientation: 'Vertical',
  },
}

export const outlineDark = {
  args: {
    orientation: 'Vertical',
    variant: 'outlineDark',
  },
}

export const outlineLight = {
  args: {
    variant: 'outlineLight',
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
  },
}

export const GhostNeutral = {
  args: {
    variant: 'ghostNeutral',
  },
}

export const ghostLight = {
  args: {
    variant: 'ghostLight',
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
    variant: 'ghost',
  },
  decorators: [
    (Story) => (
      <div className="max-w-sm bg-black p-8">
        <Story />
      </div>
    ),
  ],
}
