import Card from "@/components/card";
import CardContainer from "@/components/card_container";

const containerExampleArgs = {
  preHeading: "Featured services",
  heading: "What we offer.",
  headingSize: "large",
  textColor: "dark",
  headingPosition: "center_aligned",
  headingElement: "h2",
  layout: "33-33-33",
};

const cardExampleArgs = {
  image: {
    src: "https://placehold.co/800x600@2x.png",
    alt: "Example image placeholder",
    width: 800,
    height: 600,
  },
  layout: "left_aligned",
  heading: "Feature or benefit",
  headingElement: "h3",
  text: "Help people become familiar with the organization and its offerings, creating a sense of connection and trust.",
  link: "/",
  linkVariant: "link",
};

export default {
  title: "Components/Card Container",
  component: CardContainer,
  argTypes: {
    layout: {
      control: "select",
      options: ["50-50", "33-33-33", "50-25-25", "25-25-50", "25-25-25-25"],
    },
    textColor: {
      control: "select",
      options: ["dark", "light"],
    },
    headingSize: {
      control: "select",
      options: ["extra_large", "large", "medium", "small"],
    },
    headingPosition: {
      control: "select",
      options: ["left_aligned", "center_aligned", "right_aligned"],
    },
    headingElement: {
      control: "select",
      options: ["h1", "h2", "h3", "h4", "h5", "h6"],
    },
  },
};

const SampleCards = (
  <>
    <Card
      {...cardExampleArgs}
      heading="Card One"
      text="This is the first card in the container."
    />
    <Card
      {...cardExampleArgs}
      heading="Card Two"
      text="This is the second card in the container."
    />
    <Card
      {...cardExampleArgs}
      heading="Card Three"
      text="This is the third card in the container."
    />
  </>
);

const TwoCards = (
  <>
    <Card
      {...cardExampleArgs}
      heading="Card One"
      text="This is the first card."
    />
    <Card
      {...cardExampleArgs}
      heading="Card Two"
      text="This is the second card."
    />
  </>
);

const FourCards = (
  <>
    <Card {...cardExampleArgs} heading="Card One" text="First card." />
    <Card {...cardExampleArgs} heading="Card Two" text="Second card." />
    <Card {...cardExampleArgs} heading="Card Three" text="Third card." />
    <Card {...cardExampleArgs} heading="Card Four" text="Fourth card." />
  </>
);

export const Default = {
  args: {
    ...containerExampleArgs,
    content: SampleCards,
  },
};

export const WithHeading = {
  args: {
    ...containerExampleArgs,
    preHeading: "Our Services",
    heading: "What We Offer",
    headingSize: "large",
    headingPosition: "center_aligned",
    headingElement: "h2",
    content: SampleCards,
  },
};

export const TwoColumnLayout = {
  args: {
    layout: "50-50",
    textColor: "dark",
    heading: "Featured",
    headingPosition: "left_aligned",
    content: TwoCards,
  },
};

export const FourColumnLayout = {
  args: {
    layout: "25-25-25-25",
    textColor: "dark",
    heading: "All Features",
    headingPosition: "center_aligned",
    content: FourCards,
  },
};

export const LeftAlignedHeading = {
  args: {
    ...containerExampleArgs,
    preHeading: "Features",
    heading: "Everything you need",
    headingPosition: "left_aligned",
    content: SampleCards,
  },
};

const LinkCards = (
  <>
    <Card
      variant="link_card"
      layout="left_aligned"
      heading="Management"
      text="4 job positions"
      link="/management"
    />
    <Card
      variant="link_card"
      layout="left_aligned"
      heading="App Development"
      text="26 job positions"
      link="/app-development"
    />
    <Card
      variant="link_card"
      layout="left_aligned"
      heading="Arts & Entertainment"
      text="9 job positions"
      link="/arts-entertainment"
    />
    <Card
      variant="link_card"
      layout="left_aligned"
      heading="Accounting"
      text="11 job positions"
      link="/accounting"
    />
  </>
);

export const LinkCardGrid = {
  args: {
    layout: "25-25-25-25",
    textColor: "dark",
    heading: "Browse by category",
    headingPosition: "center_aligned",
    headingElement: "h2",
    content: LinkCards,
  },
};

const avatarImage = (photo) => ({
  src: `https://images.unsplash.com/${photo}?ixlib=rb-4.0.3&auto=format&fit=facearea&facepad=2&w=320&h=320&q=80`,
  alt: "Location photo",
  width: 320,
  height: 320,
});

const LinkCardsWithImages = (
  <>
    <Card
      variant="link_card"
      layout="left_aligned"
      heading="London, UK"
      link="/locations/london"
      image={avatarImage("photo-1486299267070-83823f5448dd")}
    />
    <Card
      variant="link_card"
      layout="left_aligned"
      heading="Bristol, UK"
      link="/locations/bristol"
      image={avatarImage("photo-1612046264803-6d6b67fdee80")}
    />
    <Card
      variant="link_card"
      layout="left_aligned"
      heading="Oxford, UK"
      link="/locations/oxford"
      image={avatarImage("photo-1582542021865-bde52fd7c3cf")}
    />
    <Card
      variant="link_card"
      layout="left_aligned"
      heading="Edinburgh, UK"
      link="/locations/edinburgh"
      image={avatarImage("photo-1571044880241-95d4c9aa06f5")}
    />
  </>
);

export const LinkCardWithImageGrid = {
  args: {
    layout: "25-25-25-25",
    textColor: "dark",
    heading: "Our locations",
    headingPosition: "center_aligned",
    headingElement: "h2",
    content: LinkCardsWithImages,
  },
};
