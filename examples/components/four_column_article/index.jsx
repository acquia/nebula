import Card from "@/components/card";
import CardContainer from "@/components/card_container";
import { getPageData, JsonApiClient } from "drupal-canvas";
import { DrupalJsonApiParams } from "drupal-jsonapi-params";
import useSWR from "swr";

const client = new JsonApiClient();

const FourColumnArticle = ({
  heading = "More articles",
  headingPosition = "left_aligned",
  headingLevel = "h2",
  layout = "25-25-25-25",
  textColor = "dark",
  tagName = "",
}) => {
  const { mainEntity } = getPageData();
  const params = new DrupalJsonApiParams()
    .addInclude(["field_image", "uid", "field_tags"])
    .addFilter("id", mainEntity.uuid, "<>")
    .addSort("created", "DESC")
    .addPageLimit(4);

  if (tagName) {
    params.addFilter("field_tags.name", tagName, "=");
  }

  const { data } = useSWR(
    [
      "node--article",
      {
        queryString: params.getQueryString(),
      },
    ],
    ([type, options]) => client.getCollection(type, options),
  );

  // Format date as "D Mon, YYYY", e.g., "1 Aug, 2023"
  const formatDayMonthYear = (iso) => {
    const d = new Date(iso);
    const parts = new Intl.DateTimeFormat("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    }).formatToParts(d);
    const day = parts.find((p) => p.type === "day")?.value ?? "";
    const month = parts.find((p) => p.type === "month")?.value ?? "";
    const year = parts.find((p) => p.type === "year")?.value ?? "";
    return `${day} ${month.toUpperCase()}, ${year}`;
  };

  return (
    <>
      <CardContainer
        layout={layout}
        textColor={textColor}
        heading={heading}
        headingPosition={headingPosition}
        headingLevel={headingLevel}
        content={
          <>
            {data &&
              data.map((article, i) => {
                const cardProps = {
                  heading: article.title,
                  byline: `${article.uid.display_name} - ${formatDayMonthYear(article.created)}`,
                  image: {
                    src: article.field_image.uri.url,
                    alt:
                      article.field_image.resourceIdObjMeta.alt ||
                      "Article image",
                    width: 800,
                    height: 600,
                  },
                };
                return <Card key={i} {...cardProps} />;
              })}
          </>
        }
      />
    </>
  );
};

export default FourColumnArticle;
