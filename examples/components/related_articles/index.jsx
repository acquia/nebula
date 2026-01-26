import Card from "@/components/card";
import CardContainer from "@/components/card_container";
import { getPageData, JsonApiClient } from "drupal-canvas";
import { DrupalJsonApiParams } from "drupal-jsonapi-params";
import useSWR from "swr";

const client = new JsonApiClient();

export const RelatedArticles = ({
  mainEntity,
  heading,
  headingPosition,
  headingElement,
  headingSize,
  layout,
  textColor,
}) => {
  const { data } = useSWR(
    [
      "node--article",
      {
        queryString: new DrupalJsonApiParams()
          .addInclude(["field_image", "uid"])
          .addFilter("id", mainEntity.uuid, "<>")
          .addSort("created", "DESC")
          .addPageLimit(4)
          .getQueryString(),
      },
    ],
    ([type, options]) => client.getCollection(type, options),
  );

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
    <CardContainer
      layout={layout}
      heading={heading}
      headingPosition={headingPosition}
      headingElement={headingElement}
      headingSize={headingSize}
      textColor={textColor}
      className="gap-8"
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
  );
};

const RelatedArticlesContainer = ({
  heading = "More articles",
  headingPosition,
  headingElement,
  headingSize,
  layout,
  textColor,
}) => {
  const { mainEntity } = getPageData();
  if (!mainEntity) {
    return null;
  }
  const props = {
    heading,
    headingPosition,
    headingElement,
    headingSize,
    layout,
    textColor,
  };
  return <RelatedArticles {...props} mainEntity={mainEntity} />;
};

export default RelatedArticlesContainer;
