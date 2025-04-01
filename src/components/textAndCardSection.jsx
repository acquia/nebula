import { cva } from 'class-variance-authority'

import { cn } from '../lib/utils'
import Button from './button'
import Heading from './heading'

const gridVariants = cva('mx-auto my-16 grid place-items-center gap-8', {
  variants: {
    cardLayout: {
      '2 columns': 'grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-2',
      '3 columns': 'grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3',
      '4 columns': 'grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4',
      '6 columns': 'grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-6',
    },
  },
  defaultVariants: {
    cardLayout: '3 columns',
  },
})

const layoutVariants = cva('flex flex-col flex-wrap items-center gap-4', {
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
      <div className="mx-auto flex max-w-2xl flex-col gap-6">
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
