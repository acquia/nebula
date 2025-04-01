import acquiaLogo from '../../assets/images/acquia-logo.svg'
import drupalLogo from '../../assets/images/logo.svg'
import Branding from '../branding'
import { Link } from '../button'
import List from '../list/list'
import {
  FacebookSolidIcon,
  GitHubSolidIcon,
  GoogleSolidIcon,
  InstagramOutlineIcon,
  LinkedInOutlineIcon,
  Social,
  SocialIconButton,
} from '../social'
import {
  Copyright,
  FooterCopyright,
  FooterLinks,
  FooterLogoTop,
  FooterMenu,
  FooterMinimal,
} from './index'

const meta = {
  component: FooterMenu,
  tags: ['autodocs'],
  title: 'Components/Footer',
}
export default meta

function Buttons({ variant }) {
  return (
    <>
      <SocialIconButton variant={variant} link="#" aria-label="Facebook">
        <FacebookSolidIcon />
      </SocialIconButton>
      <SocialIconButton variant={variant} link="#" aria-label="Google">
        <GoogleSolidIcon />
      </SocialIconButton>
      <SocialIconButton variant={variant} link="#" aria-label="GitHub">
        <GitHubSolidIcon />
      </SocialIconButton>
      <SocialIconButton variant={variant} link="#" aria-label="Instagram">
        <InstagramOutlineIcon />
      </SocialIconButton>
      <SocialIconButton variant={variant} link="#" aria-label="LinkedIn">
        <LinkedInOutlineIcon />
      </SocialIconButton>
    </>
  )
}

export const CopyrightOnly = {
  render: (args) => <Copyright {...args} />,
  args: {
    text: `© ${new Date().getFullYear()} Company Name.`,
  },
}

export const FooterWithCopyright = {
  render: (args) => <FooterCopyright {...args} />,
  args: {
    text: `© ${new Date().getFullYear()} Company Name.`,
  },
}

export const Minimal = {
  render: (args) => <FooterMinimal {...args} />,
  args: {
    copyright: (
      <Copyright text={`© ${new Date().getFullYear()} Company Name.`} />
    ),
    social: (
      <Social>
        <Buttons variant="ghostNeutral" />
      </Social>
    ),
  },
}

export const Default = {
  args: {},
}

export const FooterTop = {
  render: () => {
    const logo = <Branding homeUrl="#" logo={drupalLogo} />
    return (
      <FooterLogoTop
        logo={logo}
        social={
          <Social>
            <Buttons variant="ghost" />
          </Social>
        }
      />
    )
  },
  args: {},
}

/**
 * Responsive footer with 5 columns.
 * Illustrates that FooterLinks can be nested.
 */
export const FullFooterFiveColumn = {
  render: () => {
    const logo = <Branding homeUrl="#" logo={drupalLogo} />
    return (
      <footer>
        <FooterLogoTop
          footerElement="div"
          logo={logo}
          social={
            <Social>
              <Buttons variant="solid" />
            </Social>
          }
        />
        <FooterMenu footerElement="div" columnLayout="5">
          <FooterLinks title="Product">
            <p>
              <Link variant="linkDark" link="#">
                Pricing
              </Link>
            </p>
            <p>
              <Link variant="linkDark" link="#">
                Changelog
              </Link>
            </p>
            <p>
              <Link variant="linkDark" link="#">
                Docs
              </Link>
            </p>
            <p>
              <Link variant="linkDark" link="#">
                Download
              </Link>
            </p>
          </FooterLinks>

          <FooterLinks title="Company">
            <p>
              <Link variant="linkDark" link="#">
                About us
              </Link>
            </p>
            <p>
              <Link variant="linkDark" link="#">
                Blog
              </Link>
            </p>
            <p>
              <Link variant="linkDark" link="#">
                Careers
              </Link>
            </p>
            <p>
              <Link variant="linkDark" link="#">
                Customers
              </Link>
            </p>
            <p>
              <Link variant="linkDark" link="#">
                Newsroom
              </Link>
            </p>
          </FooterLinks>

          <FooterLinks title="Resources">
            <p>
              <Link variant="linkDark" link="#">
                Community
              </Link>
            </p>
            <p>
              <Link variant="linkDark" link="#">
                Help & Support
              </Link>
            </p>
            <p>
              <Link variant="linkDark" link="#">
                eBook
              </Link>
            </p>
            <p>
              <Link variant="linkDark" link="#">
                What's New
              </Link>
            </p>
          </FooterLinks>

          <FooterLinks title="Developers">
            <p>
              <Link variant="linkDark" link="#">
                API
              </Link>
            </p>
            <p>
              <Link variant="linkDark" link="#">
                GitHub
              </Link>
            </p>
            <p>
              <Link variant="linkDark" link="#">
                Status
              </Link>
            </p>

            <FooterLinks title="Industries" className="mt-7">
              <p>
                <Link variant="linkDark" link="#">
                  Financial Services
                </Link>
              </p>
              <p>
                <Link variant="linkDark" link="#">
                  Education
                </Link>
              </p>
            </FooterLinks>
          </FooterLinks>

          <FooterLinks title="Contact us">
            <p>
              456 Elm Street <br />
              Suite 300 <br />
              Los Angeles, CA 90001 <br />
              USA
            </p>
          </FooterLinks>
        </FooterMenu>
        <FooterCopyright
          footerElement="div"
          text={`© ${new Date().getFullYear()} Company Name.`}
        />
      </footer>
    )
  },
  args: {},
}

/**
 * Responsive footer with 4 columns.
 * Illustrates that other content can be added to footer links area.
 */
export const FullFooterFourColumn = {
  render: () => {
    const logo = <Branding homeUrl="#" logo={drupalLogo} />
    return (
      <footer>
        <FooterLogoTop
          footerElement="div"
          logo={logo}
          social={
            <Social>
              <Buttons variant="solid" />
            </Social>
          }
        />
        <FooterMenu footerElement="div" columnLayout="4">
          <FooterLinks title="Product">
            <p>
              <Link variant="linkDark" link="#">
                Pricing
              </Link>
            </p>
            <p>
              <Link variant="linkDark" link="#">
                Changelog
              </Link>
            </p>
            <p>
              <Link variant="linkDark" link="#">
                Docs
              </Link>
            </p>
            <p>
              <Link variant="linkDark" link="#">
                Download
              </Link>
            </p>
          </FooterLinks>

          <FooterLinks title="Company">
            <p>
              <Link variant="linkDark" link="#">
                About us
              </Link>
            </p>
            <p>
              <Link variant="linkDark" link="#">
                Blog
              </Link>
            </p>
            <p>
              <Link variant="linkDark" link="#">
                Careers
              </Link>
            </p>
            <p>
              <Link variant="linkDark" link="#">
                Customers
              </Link>
            </p>
            <p>
              <Link variant="linkDark" link="#">
                Newsroom
              </Link>
            </p>
          </FooterLinks>

          <FooterLinks title="Resources">
            <p>
              <Link variant="linkDark" link="#">
                Community
              </Link>
            </p>
            <p>
              <Link variant="linkDark" link="#">
                Help & Support
              </Link>
            </p>
            <p>
              <Link variant="linkDark" link="#">
                eBook
              </Link>
            </p>
            <p>
              <Link variant="linkDark" link="#">
                What's New
              </Link>
            </p>
          </FooterLinks>

          <FooterLinks title="Developers">
            <List
              className="grid space-y-3"
              items={[
                { text: 'API', url: '#' },
                { text: 'GitHub', url: '#' },
                { text: 'Status', url: '#' },
              ]}
            />

            <div className="mt-5">
              <p>
                <Link variant="linkDark" link="#">
                  Financial Services
                </Link>
              </p>
              <p>
                <Link variant="linkDark" link="#">
                  Education
                </Link>
              </p>
            </div>
          </FooterLinks>

          <FooterLinks title="Contact us">
            <p>
              456 Elm Street <br />
              Suite 300 <br />
              Los Angeles, CA 90001 <br />
              USA
            </p>
          </FooterLinks>
        </FooterMenu>
        <FooterCopyright
          footerElement="div"
          text={`© ${new Date().getFullYear()} Company Name.`}
        />
      </footer>
    )
  },
  args: {},
}

/**
 * Responsive footer with 3 columns.
 * Illustrates that other content can be added to footer links area.
 */
export const FullFooterThreeColumn = {
  render: () => {
    const logo = <Branding homeUrl="#" logo={drupalLogo} />
    return (
      <footer>
        <FooterLogoTop
          footerElement="div"
          logo={logo}
          social={
            <Social>
              <Buttons variant="solid" />
            </Social>
          }
        />
        <FooterMenu footerElement="div" columnLayout="3">
          <FooterLinks title="Product">
            <p>
              <Link variant="linkDark" link="#">
                Pricing
              </Link>
            </p>
            <p>
              <Link variant="linkDark" link="#">
                Changelog
              </Link>
            </p>
            <p>
              <Link variant="linkDark" link="#">
                Docs
              </Link>
            </p>
            <p>
              <Link variant="linkDark" link="#">
                Download
              </Link>
            </p>
          </FooterLinks>

          <FooterLinks title="Company">
            <List className="grid space-y-3">
              <li>
                <Link variant="linkDark" link="#">
                  About us
                </Link>
              </li>
              <li>
                <Link variant="linkDark" link="#">
                  Blog
                </Link>
              </li>
              <li>
                <Link variant="linkDark" link="#">
                  Careers
                </Link>
              </li>
            </List>
          </FooterLinks>

          <FooterLinks>
            <p>
              456 Elm Street <br />
              Suite 300 <br />
              Los Angeles, CA 90001 <br />
              USA
            </p>
          </FooterLinks>
        </FooterMenu>
        <FooterCopyright
          footerElement="div"
          text={`© ${new Date().getFullYear()} Company Name.`}
        />
      </footer>
    )
  },
  args: {},
}

/**
 * Responsive footer with 2 columns.
 * Illustrates that other content can be added to footer links area and it works on a dark background.
 */
export const FullFooterTwoColumnLight = {
  render: () => {
    const logo = <Branding homeUrl="#" logo={acquiaLogo} />
    return (
      <footer>
        <FooterLogoTop
          footerElement="div"
          logo={logo}
          social={
            <Social>
              <Buttons variant="outlineLight" />
            </Social>
          }
        />
        <FooterMenu footerElement="div" columnLayout="2" textColor="Light">
          <FooterLinks title="Product">
            <p>
              <Link variant="linkLight" link="#">
                Pricing
              </Link>
            </p>
            <p>
              <Link variant="linkLight" link="#">
                Changelog
              </Link>
            </p>
            <p>
              <Link variant="linkLight" link="#">
                Docs
              </Link>
            </p>
            <p>
              <Link variant="linkLight" link="#">
                Download
              </Link>
            </p>
          </FooterLinks>

          <List className="flex flex-col gap-3">
            <li>
              <Link variant="linkLight" link="#">
                About us
              </Link>
            </li>
            <li>
              <Link variant="linkLight" link="#">
                Blog
              </Link>
            </li>
            <li>
              <Link variant="linkLight" link="#">
                Careers
              </Link>
            </li>
          </List>
        </FooterMenu>
        <FooterCopyright
          footerElement="div"
          text={`© ${new Date().getFullYear()} Company Name.`}
          textColor="Light"
        />
      </footer>
    )
  },
  args: {},
  decorators: [
    (Story) => (
      <div className="max-w bg-black p-8">
        <Story />
      </div>
    ),
  ],
}
