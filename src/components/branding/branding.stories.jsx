import logo from '../../assets/images/logo.svg'
import Branding from './branding.jsx'

const meta = {
  component: Branding,
  tags: ['autodocs'],
  title: 'Overrides/Branding',
  argTypes: {
    size: {
      options: ['original', 'large', 'medium', 'small'],
      control: { type: 'select' },
    },
  },
}

export default meta

export const Default = {
  args: {
    className: '',
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
