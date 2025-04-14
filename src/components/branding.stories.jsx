import logo from '../assets/images/logo.svg'
import Branding from './branding'

const meta = {
  component: Branding,
  tags: ['autodocs'],
  title: 'Overrides/Branding',
}

export default meta

export const Default = {
  args: {
    homeUrl: '#',
    logo,
    siteName: 'Drupal Experience Builder',
    siteSlogan: (
      <p>This website is the best. It&apos;s better than all the rest.</p>
    ),
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
    siteSlogan: (
      <p>This website is the best. It&apos;s better than all the rest.</p>
    ),
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
