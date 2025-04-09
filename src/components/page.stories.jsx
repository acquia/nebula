import imagePlaceholder from '../assets/images/card-placeholder.png'
import drupalLogo from '../assets/images/logo.svg'
import Branding from './branding.jsx'
import Button, { IconButton, Link } from './button.jsx'
import Card from './card.jsx'
import CardContainer from './cardContainer.jsx'
import FeatureCard from './feature-card.jsx'
import {
  FooterCopyright,
  FooterLinks,
  FooterLogoTop,
  FooterMenu,
} from './footer'
import Header from './header.jsx'
import Heading from './heading.jsx'
import Hero from './hero.jsx'
import Image from './image.jsx'
import LogoCard from './logo-card.jsx'
import { NavMenu, NavMenuItem } from './nav-menu'
import NavigationMenu from './navigation-menu.jsx'
import Page from './page'
import Section from './section.jsx'
import {
  FacebookSolidIcon,
  GitHubSolidIcon,
  GoogleSolidIcon,
  InstagramOutlineIcon,
  LinkedInOutlineIcon,
  Social,
} from './social'
import TestimonialSection from './testimonial/testimonialSection.jsx'
import Text from './text.jsx'
import TwoColumnTextImage from './two-column-text-image.jsx'

const meta = {
  title: 'Examples/Page',
  component: Page,
}

export default meta

const logo = <Branding homeUrl="#" logo={drupalLogo} />
const menu = (
  <NavigationMenu
    links={[
      {
        key: 'front_page',
        title: 'Home',
        url: '#',
        isExpanded: false,
        isCollapsed: false,
        inActiveTrail: false,
      },
      {
        key: 'about',
        title: 'About',
        url: '#',
        isExpanded: false,
        isCollapsed: false,
        inActiveTrail: false,
        submenu: [
          {
            key: 'team',
            title: 'Home',
            url: '#',
            isExpanded: false,
            isCollapsed: false,
            inActiveTrail: false,
          },
          {
            key: 'values',
            title: 'Values',
            url: '#',
            isExpanded: false,
            isCollapsed: false,
            inActiveTrail: false,
          },
          {
            key: 'history',
            title: 'History',
            url: '#',
            isExpanded: false,
            isCollapsed: false,
            inActiveTrail: false,
          },
        ],
      },
      {
        key: 'contact',
        title: 'Contact',
        url: '#',
        isExpanded: false,
        isCollapsed: false,
        inActiveTrail: false,
      },
    ]}
    menuId="main-menu"
    menuLabel="Main Menu"
  />
)

const newMenuNotResponsive = (
  <NavMenu variant="horizontal">
    <NavMenuItem>Home</NavMenuItem>
    <NavMenuItem>Products</NavMenuItem>
    <NavMenuItem>Services</NavMenuItem>
    <NavMenuItem>About</NavMenuItem>
    <NavMenuItem>Contact</NavMenuItem>
    <NavMenuItem
      dropdownItems={[
        { label: 'Sub Item 1', href: '#' },
        { label: 'Sub Item 2', href: '#' },
        { label: 'Sub Item 3', href: '#' },
      ]}
    >
      More
    </NavMenuItem>
  </NavMenu>
)

export const HomePage = {
  args: {},
  render: (args) => (
    <Page {...args}>
      <Header logo={logo} menu={newMenuNotResponsive} />
      <Hero
        backgroundColor="bg-blue-600"
        backgroundImage="/src/assets/images/hero-background-placeholder-dark.png?raw=true"
        button1Label="Get started"
        button1Link="#get-started"
        button1Style="Solid"
        button2Label="Learn more"
        button2Link="#learn-more"
        button2Style="Outline"
        darkenImage="darken-25"
        heading="This space deserves a hero."
        headingElement="h1"
        image="/src/assets/images/placeholder.png?raw=true"
        layout="leftAligned"
        preHeading="Mission"
        text="This is a space to welcome visitors to the site. Grab their attention with copy that clearly states what the site is about."
        textColor="Light"
      />
      <CardContainer
        cardLayout="3 columns"
        className="mt-24"
        heading="What we offer."
        headingLevel="h2"
        headingSize="Large"
        layout="Center aligned"
        preHeading="Featured services"
      >
        <Card
          heading="Engaging title that represents the content."
          image={imagePlaceholder}
          text="Some quick example text to build on the card title and make up the bulk of the card's content."
        />
        <Card
          heading="Engaging title that represents the content."
          image={imagePlaceholder}
          text="Some quick example text to build on the card title and make up the bulk of the card's content."
        />
        <Card
          heading="Engaging title that represents the content."
          image={imagePlaceholder}
          text="Some quick example text to build on the card title and make up the bulk of the card's content."
        />
      </CardContainer>
      <CardContainer
        cardLayout="3 columns"
        className="mt-24"
        heading="Additional offerings."
        headingLevel="h2"
        headingSize="Large"
        layout="Center aligned"
        preHeading="Featured products"
      >
        <FeatureCard
          heading="Engaging title that represents the content."
          link="#"
          linkLabel="Learn more"
          text="Some quick example text to build on the card title and make up the bulk of the card's content."
        />
        <FeatureCard
          heading="Engaging title that represents the content."
          text="Some quick example text to build on the card title and make up the bulk of the card's content."
        />
        <FeatureCard
          heading="Engaging title that represents the content."
          link="#"
          linkLabel="Learn more"
          text="Some quick example text to build on the card title and make up the bulk of the card's content."
        />
        <FeatureCard
          heading="Engaging title that represents the content."
          link="#"
          linkLabel="Learn more"
          text="Some quick example text to build on the card title and make up the bulk of the card's content."
        />
        <FeatureCard
          heading="Engaging title that represents the content."
          text="Some quick example text to build on the card title and make up the bulk of the card's content."
        />
        <FeatureCard
          heading="Engaging title that represents the content."
          link="#"
          linkLabel="Learn more"
          text="Some quick example text to build on the card title and make up the bulk of the card's content."
        />
      </CardContainer>
      <TwoColumnTextImage
        className="mt-16 bg-slate-50 p-24"
        heading="Who we are."
        headingElement="h2"
        headingSize="Large"
        text="This is a space to talk about your organization, its products, services or values. Encourage people to explore your offerings and discover how you meet their needs, provide solutions, and deliver value. Show how the site serves as more than just a platform; it’s a reflection of your dedication to building meaningful connections and ensuring your experience is nothing short of exceptional."
      />
      <div className="my-16">
        <TestimonialSection
          avatar="/src/assets/images/placeholder.png"
          background="/src/assets/images/hero-background-placeholder-dark.png"
          name="Mark Villiams"
          organization="Capsule"
          role="Product Manager"
          testSize="Large"
          text="I just wanted to say that I'm very happy with my purchase so far. The experience builder is amazing and the documentation is outstanding - clear and detailed."
          textColor="Light"
        />
      </div>
      <CardContainer
        cardLayout="6 columns"
        className="mt-24 mb-16"
        heading="You're in good company"
        headingLevel="h2"
        layout="Center aligned"
        preHeading="Our customers"
      >
        <LogoCard image="/src/assets/images/logo.svg" />
        <LogoCard image="/src/assets/images/logo.svg" />
        <LogoCard image="/src/assets/images/logo.svg" />
        <LogoCard image="/src/assets/images/logo.svg" />
        <LogoCard image="/src/assets/images/logo.svg" />
        <LogoCard image="/src/assets/images/logo.svg" />
      </CardContainer>
      <div className="mb-24 flex flex-wrap items-center justify-center gap-8">
        <Text
          className="my-0"
          text="Over 2500 companies use us to better their business."
        />
        <Button link="#" variant="outlineDark">
          Read our customer stories
        </Button>
      </div>
      <footer>
        <FooterLogoTop
          footerElement="div"
          logo={<Branding homeUrl="#" logo={drupalLogo} />}
          social={
            <Social>
              <IconButton aria-label="Facebook" link="#" variant="solid">
                <FacebookSolidIcon />
              </IconButton>
              <IconButton aria-label="Google" link="#" variant="solid">
                <GoogleSolidIcon />
              </IconButton>
              <IconButton aria-label="GitHub" link="#" variant="solid">
                <GitHubSolidIcon />
              </IconButton>
              <IconButton aria-label="Instagram" link="#" variant="solid">
                <InstagramOutlineIcon />
              </IconButton>
              <IconButton aria-label="LinkedIn" link="#" variant="solid">
                <LinkedInOutlineIcon />
              </IconButton>
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
    </Page>
  ),
}
export const AboutUs = {
  args: {},
  render: (args) => (
    <Page {...args}>
      <Header logo={logo} menu={menu} />
      <Section>
        <Heading
          heading="Who we are."
          headingSize="Medium"
          preHeading="About us"
        />
        <Text
          text="This is a space to talk about your organization, its products, services or values. Encourage people to explore your offerings and discover how you meet their needs, provide solutions, and deliver value. Show how the site serves as more than just a platform; it’s a reflection of your dedication to building meaningful connections and ensuring your experience is nothing short of exceptional."
          textSize="ExtraLarge"
        />
        <Text text="This is a space to talk about your organization, its products, services or values. Encourage people to explore your offerings and discover how you meet their needs, provide solutions, and deliver value. Show how the site serves as more than just a platform; it’s a reflection of your dedication to building meaningful connections and ensuring your experience is nothing short of exceptional." />
        <Image
          image={{
            src: '/src/assets/images/placeholder.png?raw=true',
            alt: 'Who we are.',
          }}
        />
        <Text text="This is a space to talk about your organization, its products, services or values. Encourage people to explore your offerings and discover how you meet their needs, provide solutions, and deliver value. Show how the site serves as more than just a platform; it’s a reflection of your dedication to building meaningful connections and ensuring your experience is nothing short of exceptional." />
        <Heading
          heading="What our customers say."
          headingSize="Medium"
          layout="Center aligned"
          preHeading="Testimonials"
        />
        <div className="my-16">
          <TestimonialSection
            avatar="/src/assets/images/placeholder.png"
            background="/src/assets/images/hero-background-placeholder-dark.png"
            name="Mark Villiams"
            organization="Capsule"
            role="Product Manager"
            text="I just wanted to say that I'm very happy with my purchase so far. The experience builder is amazing and the documentation is outstanding - clear and detailed."
            textColor="Light"
          />
        </div>
        <Image
          image={{
            src: '/src/assets/images/placeholder.png?raw=true',
            alt: 'Who we are.',
          }}
        />
        <Image
          image={{
            src: '/src/assets/images/placeholder.png?raw=true',
            alt: 'Who we are.',
          }}
        />
      </Section>
    </Page>
  ),
}
