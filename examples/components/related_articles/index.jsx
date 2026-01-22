import Card from "@/components/card";
import CardContainer from "@/components/card_container";
import { getPageData, JsonApiClient } from "drupal-canvas";
import { DrupalJsonApiParams } from "drupal-jsonapi-params";
import useSWR from "swr";

const client = new JsonApiClient();

const RelatedArticles = ({
  mainEntity,
  heading,
  headingPosition,
  headingLevel,
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
  );
};

const RelatedArticlesContainer = ({
  heading = "More articles",
  headingPosition,
  headingLevel,
  layout,
  textColor,
}) => {
  const { mainEntity } = getPageData();
  if (!mainEntity) {
    console.warn(
      "getPageData().mainEntity will only have metadata when used on a page with an associated entity (e.g. /node/1, /canvas_page/1). " +
        "It is always null inside of the code editor since there is no entity context within the code editor.",
    );
    return <h2>Main entity not available, see console for more details.</h2>;
  }
  const props = {
    heading,
    headingPosition,
    headingLevel,
    layout,
    textColor,
  };
  return <RelatedArticles {...props} mainEntity={mainEntity} />;
};

export default RelatedArticlesContainer;
