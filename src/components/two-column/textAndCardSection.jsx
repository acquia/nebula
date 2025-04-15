import { cva } from 'class-variance-authority'

import { cn } from '../../lib/utils'
import Button from '../button/button'
import Heading from '../heading/heading'

const gridVariants = cva('my-16 gap-8 mx-auto grid place-items-center', {
  variants: {
    cardLayout: {
      '2 columns': 'gap-4 sm:grid-cols-2 md:grid-cols-2 grid grid-cols-1',
      '3 columns': 'gap-4 sm:grid-cols-2 md:grid-cols-3 grid grid-cols-1',
      '4 columns': 'gap-4 sm:grid-cols-2 md:grid-cols-4 grid grid-cols-1',
      '6 columns': 'gap-4 sm:grid-cols-2 md:grid-cols-6 grid grid-cols-1',
    },
  },
  defaultVariants: {
    cardLayout: '3 columns',
  },
})

const layoutVariants = cva('gap-4 flex flex-col flex-wrap items-center', {
  variants: {
    layout: {
      row: 'flex-row',
      column: 'flex-col',
    },
  },
  defaultVariants: {
    layout: 'row',
  },
})

const TextAndCardSection = ({
  cardLayout = '3 columns',
  layout = 'row',
  preHeading = 'Our customers',
  heading = `You're in good company.`,
  headingElement = 'h2',
  text = 'Use this section to introduce the organizations you work with and build trust in your organization through association.',
  children,
  linkLabel = 'Read our customer stories',
  link,
}) => {
  return (
    <div className={layoutVariants({ layout })}>
      <div className="max-w-2xl gap-6 mx-auto flex flex-col">
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
      <div className={cn(gridVariants({ cardLayout }))}>{children}</div>
    </div>
  )
}

export default TextAndCardSection
