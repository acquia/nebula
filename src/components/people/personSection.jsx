import Button from '../button'
import CardContainer from '../cardContainer'
import Heading from '../heading'

export default function PersonSection({
  children,
  headingElement = 'h2',
  heading,
  link,
  linkLabel,
  preHeading,
  text,
}) {
  return (
    <div className="flex gap-12 max-md:flex-col">
      <div className="mx-auto flex max-w-2xl flex-1/2 flex-col gap-6">
        <Heading
          heading={heading}
          headingElement={headingElement}
          headingSize="Medium"
          preHeading={preHeading}
        />
        <p>{text}</p>
        <div>
          <Button link={link} variant="outlineDark">
            {linkLabel}
          </Button>
        </div>
      </div>
      <div className="flex-1/2">
        <CardContainer>{children}</CardContainer>
      </div>
    </div>
  )
}
