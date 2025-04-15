import PageTitle from './page-title'

const meta = {
  component: PageTitle,
  title: 'Components/Heading/PageTitle',
  tags: ['autodocs'],
}

export default meta

/**
 * Use to always generate an H1. May not be needed.
 */
export const Default = {
  args: {
    title: 'The title of the page',
  },
}
