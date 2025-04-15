import logo from '../../assets/images/logo.svg'
import Branding from './branding.jsx'

const meta = {
  component: Branding,
  tags: ['autodocs'],
  title: 'Components/Branding',
  argTypes: {
    size: {
      options: ['original', 'large', 'medium', 'small'],
      control: { type: 'select' },
    },
  },
}

export default meta

/**
 * Used for a logo.
 * Can be used with a link or not.
 */
export const Default = {
  args: {
    className: 'test',
    homeUrl: '#',
    logo,
    siteName: 'Drupal Experience Builder',
    title: 'Go to Drupal home',
  },
}

/**
 * Defaults to original size.
 */
export const NoLink = {
  args: {
    logo,
    siteName: 'Drupal Experience Builder',
    className: 'test',
  },
}

export const SizeLarge = {
  args: {
    logo,
    siteName: 'Drupal Experience Builder',
    size: 'large',
  },
}

export const SizeMedium = {
  args: {
    logo,
    siteName: 'Drupal Experience Builder',
    size: 'medium',
  },
}

export const SizeSmall = {
  args: {
    logo,
    siteName: 'Drupal Experience Builder',
    size: 'small',
  },
}
