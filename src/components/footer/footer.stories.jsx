import drupalLogo from '../../assets/images/logo.svg'
import Branding from '../branding.jsx'
import Copyright from './copyright'
import Footer from './footer'
import FooterCopyright from './footer-copyright'
import FooterLogoTop from './footer-logo-top'
import FooterMinimal from './footer-minimal'

const meta = {
  component: Footer,
  tags: ['autodocs'],
  title: 'Components/Footer',
}
export default meta

export const CopyrightOnly = {
  render: (args) => <Copyright {...args} />,
  args: {
    text: `© ${new Date().getFullYear()} Company Name.`,
  },
}

export const FooterWithCopyright = {
  render: (args) => <FooterCopyright {...args} />,
  args: {},
}

export const Minimal = {
  render: (args) => <FooterMinimal {...args} />,
  args: {},
}

export const Default = {
  args: {},
}

export const FooterTop = {
  render: () => {
    const logo = <Branding homeUrl="#" logo={drupalLogo} />
    return <FooterLogoTop logo={logo} />
  },
  args: {},
}

export const FullFooter = {
  render: () => {
    const logo = <Branding homeUrl="#" logo={drupalLogo} />
    return (
      <footer>
        <FooterLogoTop footerElement="div" logo={logo} />
        <Footer footerElement="div" />
        <FooterCopyright footerElement="div" />
      </footer>
    )
  },
  args: {},
}
