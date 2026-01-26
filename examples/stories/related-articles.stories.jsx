import RelatedArticlesContainer, {
  RelatedArticles,
} from "@/components/related_articles";
import { DrupalJsonApiParams } from "drupal-jsonapi-params";
import { SWRConfig, unstable_serialize } from "swr";

const mockMainEntity = {
  uuid: "mock-uuid-1234",
  entity_type_id: "node",
  bundle: "article",
};

// Mocked data representing a Drupal node article JSON API response.
const mockArticles = [
  {
    title: "Engaging title that represents the content",
    uid: { display_name: "Alice Williams" },
    created: "2025-05-12T10:00:00Z",
    field_image: {
      uri: { url: "https://placehold.co/800x600@2x.png" },
      resourceIdObjMeta: { alt: "placeholder image" },
    },
  },
  {
    title: "Engaging title that represents the content",
    uid: { display_name: "Alice Williams" },
    created: "2025-05-10T09:00:00Z",
    field_image: {
      uri: { url: "https://placehold.co/800x600@2x.png" },
      resourceIdObjMeta: { alt: "placeholder image" },
    },
  },
  {
    title: "Engaging title that represents the content",
    uid: { display_name: "Alice Williams" },
    created: "2025-05-08T08:00:00Z",
    field_image: {
      uri: { url: "https://placehold.co/800x600@2x.png" },
      resourceIdObjMeta: { alt: "placeholder image" },
    },
  },
  {
    title: "Engaging title that represents the content",
    uid: { display_name: "Alice Williams" },
    created: "2025-05-06T07:00:00Z",
    field_image: {
      uri: { url: "https://placehold.co/800x600@2x.png" },
      resourceIdObjMeta: { alt: "placeholder image" },
    },
  },
];

// Mock SWR key and params for fetching related articles.
// Note: This must match the SWR key used in the RelatedArticles component for
// the SWRConfig fallback to work.
const params = new DrupalJsonApiParams()
  .addInclude(["field_image", "uid"])
  .addFilter("id", mockMainEntity.uuid, "<>") // ensure key matches component
  .addSort("created", "DESC")
  .addPageLimit(4);

const swrKey = ["node--article", { queryString: params.getQueryString() }];

export default {
  title: "Components/Related Articles",
  component: RelatedArticlesContainer,
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

export const Default = {};

export const WithMockData = (args) => (
  <SWRConfig
    value={{
      // Map the serialized SWR key to the mock data.
      fallback: { [unstable_serialize(swrKey)]: mockArticles },
      // Stop SWR from revalidating or fetching new data.
      isPaused: () => true,
    }}
  >
    {/* The inner component receives a mock `mainEntity`
        Because the SWR cache already has data for the key, `useSWR` returns the mocks immediately. */}
    <RelatedArticles
      // Pass a mock mainEntity.
      mainEntity={mockMainEntity}
      heading="More articles"
      headingSize="large"
      textColor="dark"
      headingPosition="center_aligned"
      headingElement="h2"
      layout="25-25-25-25"
      {...args}
    />
  </SWRConfig>
);

WithMockData.args = {
  heading: "More articles",
  headingSize: "medium",
  textColor: "dark",
  headingPosition: "left_aligned",
  headingElement: "h2",
  layout: "25-25-25-25",
};
