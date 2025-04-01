import imagePlaceholder from '../assets/images/card-placeholder.png'
import drupalLogo from '../assets/images/logo.svg'
import Branding from './branding.jsx'
import Button, { Link } from './button.jsx'
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
  SocialIconButton,
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
    menuId="main-menu"
    menuLabel="Main Menu"
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
  />
)

export const HomePage = {
  args: {},
  render: (args) => (
    <Page {...args}>
      <Header logo={logo} menu={menu} />
      <Hero
        layout="leftAligned"
        preHeading="Mission"
        heading="This space deserves a hero."
        text="This is a space to welcome visitors to the site. Grab their attention with copy that clearly states what the site is about."
        textColor="Light"
        headingElement="h1"
        button1Label="Get started"
        button1Link="#get-started"
        button1Style="Solid"
        button2Label="Learn more"
        button2Link="#learn-more"
        button2Style="Outline"
        image="/src/assets/images/placeholder.png?raw=true"
        backgroundImage="/src/assets/images/hero-background-placeholder-dark.png?raw=true"
        darkenImage="darken-25"
        backgroundColor="bg-blue-600"
      />
      <CardContainer
        className="mt-24"
        heading="What we offer."
        preHeading="Featured services"
        headingLevel="h2"
        headingSize="Large"
        layout="Center aligned"
        cardLayout="3 columns"
      >
        <Card
          heading="Engaging title that represents the content."
          text="Some quick example text to build on the card title and make up the bulk of the card's content."
          image={imagePlaceholder}
        />
        <Card
          heading="Engaging title that represents the content."
          text="Some quick example text to build on the card title and make up the bulk of the card's content."
          image={imagePlaceholder}
        />
        <Card
          heading="Engaging title that represents the content."
          text="Some quick example text to build on the card title and make up the bulk of the card's content."
          image={imagePlaceholder}
        />
      </CardContainer>
      <CardContainer
        className="mt-24"
        heading="Additional offerings."
        preHeading="Featured products"
        headingLevel="h2"
        headingSize="Large"
        layout="Center aligned"
        cardLayout="3 columns"
      >
        <FeatureCard
          heading="Engaging title that represents the content."
          text="Some quick example text to build on the card title and make up the bulk of the card's content."
          linkLabel="Learn more"
          link="#"
        />
        <FeatureCard
          heading="Engaging title that represents the content."
          text="Some quick example text to build on the card title and make up the bulk of the card's content."
        />
        <FeatureCard
          heading="Engaging title that represents the content."
          text="Some quick example text to build on the card title and make up the bulk of the card's content."
          linkLabel="Learn more"
          link="#"
        />
        <FeatureCard
          heading="Engaging title that represents the content."
          text="Some quick example text to build on the card title and make up the bulk of the card's content."
          linkLabel="Learn more"
          link="#"
        />
        <FeatureCard
          heading="Engaging title that represents the content."
          text="Some quick example text to build on the card title and make up the bulk of the card's content."
        />
        <FeatureCard
          heading="Engaging title that represents the content."
          text="Some quick example text to build on the card title and make up the bulk of the card's content."
          linkLabel="Learn more"
          link="#"
        />
      </CardContainer>
      <TwoColumnTextImage
        className="mt-16 bg-slate-50 p-24"
        headingSize="Large"
        heading="Who we are."
        headingElement="h2"
        text="This is a space to talk about your organization, its products, services or values. Encourage people to explore your offerings and discover how you meet their needs, provide solutions, and deliver value. Show how the site serves as more than just a platform; it’s a reflection of your dedication to building meaningful connections and ensuring your experience is nothing short of exceptional."
      />
      <div className="my-16">
        <TestimonialSection
          background="/src/assets/images/hero-background-placeholder-dark.png"
          text="I just wanted to say that I'm very happy with my purchase so far. The experience builder is amazing and the documentation is outstanding - clear and detailed."
          textColor="Light"
          testSize="Large"
          name="Mark Villiams"
          organization="Capsule"
          role="Product Manager"
          avatar="/src/assets/images/placeholder.png"
        />
      </div>
      <CardContainer
        className="mt-24 mb-16"
        heading="You're in good company"
        preHeading="Our customers"
        headingLevel="h2"
        layout="Center aligned"
        cardLayout="6 columns"
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
        <Button variant="outlineDark" link="#">
          Read our customer stories
        </Button>
      </div>
      <footer>
        <FooterLogoTop
          footerElement="div"
          logo={<Branding homeUrl="#" logo={drupalLogo} />}
          social={
            <Social>
              <SocialIconButton variant="solid" link="#" aria-label="Facebook">
                <FacebookSolidIcon />
              </SocialIconButton>
              <SocialIconButton variant="solid" link="#" aria-label="Google">
                <GoogleSolidIcon />
              </SocialIconButton>
              <SocialIconButton variant="solid" link="#" aria-label="GitHub">
                <GitHubSolidIcon />
              </SocialIconButton>
              <SocialIconButton variant="solid" link="#" aria-label="Instagram">
                <InstagramOutlineIcon />
              </SocialIconButton>
              <SocialIconButton variant="solid" link="#" aria-label="LinkedIn">
                <LinkedInOutlineIcon />
              </SocialIconButton>
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
          preHeading="About us"
          headingSize="Medium"
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
          preHeading="Testimonials"
          headingSize="Medium"
          layout="Center aligned"
        />
        <div className="my-16">
          <TestimonialSection
            background="/src/assets/images/hero-background-placeholder-dark.png"
            textColor="Light"
            text="I just wanted to say that I'm very happy with my purchase so far. The experience builder is amazing and the documentation is outstanding - clear and detailed."
            name="Mark Villiams"
            organization="Capsule"
            role="Product Manager"
            avatar="/src/assets/images/placeholder.png"
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
