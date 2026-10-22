import Card from '@/components/card';
import CardContainer from '@/components/card_container';
import { getNodePath } from 'drupal-canvas';
import { useJsonApiClient, usePageContext } from 'drupal-canvas/react';
import { DrupalJsonApiParams } from 'drupal-jsonapi-params';
import useSWR from 'swr';

export const RelatedArticles = ({
  mainEntity,
  heading,
  headingPosition,
  headingElement,
  headingSize,
  layout,
  textColor,
}) => {
  const client = useJsonApiClient();
  const { data } = useSWR(
    client && mainEntity?.uuid
      ? [
          'node--article',
          {
            queryString: new DrupalJsonApiParams()
              .addInclude(['field_image', 'uid'])
              .addFilter('id', mainEntity.uuid, '<>')
              .addSort('created', 'DESC')
              .addPageLimit(4)
              .getQueryString(),
          },
        ]
      : null,
    ([type, options]) => client.getCollection(type, options),
  );

  const formatDayMonthYear = (iso) => {
    const d = new Date(iso);
    const parts = new Intl.DateTimeFormat('en-US', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    }).formatToParts(d);
    const day = parts.find((p) => p.type === 'day')?.value ?? '';
    const month = parts.find((p) => p.type === 'month')?.value ?? '';
    const year = parts.find((p) => p.type === 'year')?.value ?? '';
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
              const { title, uid, created, field_image } = article;
              const cardProps = {
                heading: title,
                byline: `${uid.display_name} - ${formatDayMonthYear(created)}`,
                image: {
                  src: field_image.uri.url,
                  alt: field_image.resourceIdObjMeta.alt || 'Article image',
                  width: field_image.resourceIdObjMeta.width,
                  height: field_image.resourceIdObjMeta.height,
                },
                link: getNodePath(article),
              };
              return <Card key={i} {...cardProps} />;
            })}
        </>
      }
    />
  );
};

const RelatedArticlesContainer = ({
  heading = 'More articles',
  headingPosition,
  headingElement,
  headingSize,
  layout,
  textColor,
}) => {
  const page = usePageContext();
  const mainEntity = page?.mainEntity;
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
