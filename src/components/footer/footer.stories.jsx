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
        <FooterMenu columnLayout="5" footerElement="div">
          <FooterLinks title="Product">
            <p>
              <Link link="#" variant="linkDark">
                Pricing
              </Link>
            </p>
            <p>
              <Link link="#" variant="linkDark">
                Changelog
              </Link>
            </p>
            <p>
              <Link link="#" variant="linkDark">
                Docs
              </Link>
            </p>
            <p>
              <Link link="#" variant="linkDark">
                Download
              </Link>
            </p>
          </FooterLinks>

          <FooterLinks title="Company">
            <p>
              <Link link="#" variant="linkDark">
                About us
              </Link>
            </p>
            <p>
              <Link link="#" variant="linkDark">
                Blog
              </Link>
            </p>
            <p>
              <Link link="#" variant="linkDark">
                Careers
              </Link>
            </p>
            <p>
              <Link link="#" variant="linkDark">
                Customers
              </Link>
            </p>
            <p>
              <Link link="#" variant="linkDark">
                Newsroom
              </Link>
            </p>
          </FooterLinks>

          <FooterLinks title="Resources">
            <p>
              <Link link="#" variant="linkDark">
                Community
              </Link>
            </p>
            <p>
              <Link link="#" variant="linkDark">
                Help & Support
              </Link>
            </p>
            <p>
              <Link link="#" variant="linkDark">
                eBook
              </Link>
            </p>
            <p>
              <Link link="#" variant="linkDark">
                What's New
              </Link>
            </p>
          </FooterLinks>

          <FooterLinks title="Developers">
            <p>
              <Link link="#" variant="linkDark">
                API
              </Link>
            </p>
            <p>
              <Link link="#" variant="linkDark">
                GitHub
              </Link>
            </p>
            <p>
              <Link link="#" variant="linkDark">
                Status
              </Link>
            </p>

            <FooterLinks className="mt-7" title="Industries">
              <p>
                <Link link="#" variant="linkDark">
                  Financial Services
                </Link>
              </p>
              <p>
                <Link link="#" variant="linkDark">
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
        <FooterMenu columnLayout="4" footerElement="div">
          <FooterLinks title="Product">
            <p>
              <Link link="#" variant="linkDark">
                Pricing
              </Link>
            </p>
            <p>
              <Link link="#" variant="linkDark">
                Changelog
              </Link>
            </p>
            <p>
              <Link link="#" variant="linkDark">
                Docs
              </Link>
            </p>
            <p>
              <Link link="#" variant="linkDark">
                Download
              </Link>
            </p>
          </FooterLinks>

          <FooterLinks title="Company">
            <p>
              <Link link="#" variant="linkDark">
                About us
              </Link>
            </p>
            <p>
              <Link link="#" variant="linkDark">
                Blog
              </Link>
            </p>
            <p>
              <Link link="#" variant="linkDark">
                Careers
              </Link>
            </p>
            <p>
              <Link link="#" variant="linkDark">
                Customers
              </Link>
            </p>
            <p>
              <Link link="#" variant="linkDark">
                Newsroom
              </Link>
            </p>
          </FooterLinks>

          <FooterLinks title="Resources">
            <p>
              <Link link="#" variant="linkDark">
                Community
              </Link>
            </p>
            <p>
              <Link link="#" variant="linkDark">
                Help & Support
              </Link>
            </p>
            <p>
              <Link link="#" variant="linkDark">
                eBook
              </Link>
            </p>
            <p>
              <Link link="#" variant="linkDark">
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
                <Link link="#" variant="linkDark">
                  Financial Services
                </Link>
              </p>
              <p>
                <Link link="#" variant="linkDark">
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
        <FooterMenu columnLayout="3" footerElement="div">
          <FooterLinks title="Product">
            <p>
              <Link link="#" variant="linkDark">
                Pricing
              </Link>
            </p>
            <p>
              <Link link="#" variant="linkDark">
                Changelog
              </Link>
            </p>
            <p>
              <Link link="#" variant="linkDark">
                Docs
              </Link>
            </p>
            <p>
              <Link link="#" variant="linkDark">
                Download
              </Link>
            </p>
          </FooterLinks>

          <FooterLinks title="Company">
            <List className="grid space-y-3">
              <li>
                <Link link="#" variant="linkDark">
                  About us
                </Link>
              </li>
              <li>
                <Link link="#" variant="linkDark">
                  Blog
                </Link>
              </li>
              <li>
                <Link link="#" variant="linkDark">
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
        <FooterMenu columnLayout="2" footerElement="div" textColor="Light">
          <FooterLinks title="Product">
            <p>
              <Link link="#" variant="linkLight">
                Pricing
              </Link>
            </p>
            <p>
              <Link link="#" variant="linkLight">
                Changelog
              </Link>
            </p>
            <p>
              <Link link="#" variant="linkLight">
                Docs
              </Link>
            </p>
            <p>
              <Link link="#" variant="linkLight">
                Download
              </Link>
            </p>
          </FooterLinks>

          <List className="flex flex-col gap-3">
            <li>
              <Link link="#" variant="linkLight">
                About us
              </Link>
            </li>
            <li>
              <Link link="#" variant="linkLight">
                Blog
              </Link>
            </li>
            <li>
              <Link link="#" variant="linkLight">
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
