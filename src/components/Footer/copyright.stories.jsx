import Copyright from './copyright'

const meta = {
  component: Copyright,
  tags: ['autodocs'],
  title: 'Components/Copyright',
}

export const Default = {
  args: {
    text: `© ${new Date().getFullYear()} Company Name.`,
  },
}

export default meta
