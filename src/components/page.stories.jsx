import imagePlaceholder from "../assets/images/card-placeholder.png";
import drupalLogo from "../assets/images/logo.svg";
import Blockquote from "./blockquote.jsx";
import Branding from "./branding.jsx";
import Card from "./card.jsx";
import CardContainer from "./cardContainer.jsx";
import Header from "./header.jsx";
import Heading from "./heading.jsx";
import Hero from "./hero.jsx";
import Image from "./image.jsx";
import NavigationMenu from "./navigation-menu.jsx";
import Page from "./page";
import Section from "./section.jsx";
import Text from "./text.jsx";

const meta = {
  title: "Examples/Page",
  component: Page,
};

export default meta;

const logo = <Branding homeUrl="#" logo={drupalLogo} />;
const menu = (
  <NavigationMenu
    menuId="main-menu"
    menuLabel="Main Menu"
    links={[
      {
        key: "front_page",
        title: "Home",
        url: "#",
        isExpanded: false,
        isCollapsed: false,
        inActiveTrail: false,
      },
      {
        key: "about",
        title: "About",
        url: "#",
        isExpanded: false,
        isCollapsed: false,
        inActiveTrail: false,
        submenu: [
          {
            key: "team",
            title: "Home",
            url: "#",
            isExpanded: false,
            isCollapsed: false,
            inActiveTrail: false,
          },
          {
            key: "values",
            title: "Values",
            url: "#",
            isExpanded: false,
            isCollapsed: false,
            inActiveTrail: false,
          },
          {
            key: "history",
            title: "History",
            url: "#",
            isExpanded: false,
            isCollapsed: false,
            inActiveTrail: false,
          },
        ],
      },
      {
        key: "contact",
        title: "Contact",
        url: "#",
        isExpanded: false,
        isCollapsed: false,
        inActiveTrail: false,
      },
    ]}
  />
);

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
        headingElement="h1"
        button1Label="Get Started"
        button1Link="#get-started"
        button1Style="Solid"
        image="https://github.com/balintbrews/drupal-xb-js-components-storybook-starter/blob/main/src/assets/images/placeholder.png?raw=true"
        backgroundImage="https://github.com/balintbrews/drupal-xb-js-components-storybook-starter/blob/main/src/assets/images/hero-background-placeholder-light.png?raw=true"
        darkenImage="darken-25"
        backgroundColor="bg-blue-600"
      />
      <CardContainer
        heading="What we offer."
        preHeading="Featured services"
        headingLevel="h2"
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
    </Page>
  ),
};
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
          textSize="Large"
        />
        <Text text="This is a space to talk about your organization, its products, services or values. Encourage people to explore your offerings and discover how you meet their needs, provide solutions, and deliver value. Show how the site serves as more than just a platform; it’s a reflection of your dedication to building meaningful connections and ensuring your experience is nothing short of exceptional." />
        <Image
          image={{
            src: "https://github.com/balintbrews/drupal-xb-js-components-storybook-starter/blob/main/src/assets/images/placeholder.png?raw=true",
            alt: "Who we are.",
          }}
        />
        <Text text="This is a space to talk about your organization, its products, services or values. Encourage people to explore your offerings and discover how you meet their needs, provide solutions, and deliver value. Show how the site serves as more than just a platform; it’s a reflection of your dedication to building meaningful connections and ensuring your experience is nothing short of exceptional." />
        <Blockquote
          text="I just wanted to say that I'm very happy with my purchase so far. The experience builder is amazing and the documentation is outstanding - clear and detailed."
          name="Mark Villiams"
          title="Product Manager | Capsule"
        />
        <Image
          image={{
            src: "https://github.com/balintbrews/drupal-xb-js-components-storybook-starter/blob/main/src/assets/images/placeholder.png?raw=true",
            alt: "Who we are.",
          }}
        />
        <Image
          image={{
            src: "https://github.com/balintbrews/drupal-xb-js-components-storybook-starter/blob/main/src/assets/images/placeholder.png?raw=true",
            alt: "Who we are.",
          }}
        />
      </Section>
    </Page>
  ),
};
