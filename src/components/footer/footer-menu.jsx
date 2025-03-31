import { cva } from 'class-variance-authority'
import PropTypes from 'prop-types'

import { cn } from '../../lib/utils'

const footerVariants = cva(
  'mx-auto mt-auto w-full max-w-[85rem] border-t border-solid border-slate-200 px-4 py-10 sm:px-6 lg:px-8',
  {
    variants: {
      textColor: {
        Dark: 'text-gray-900',
        Light: 'text-gray-200',
      },
    },
  }
)

const gridVariants = cva('mb-10 grid gap-6', {
  variants: {
    columnLayout: {
      2: 'grid-cols-2',
      3: 'grid-cols-2 lg:grid-cols-3',
      4: 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4',
      5: 'grid-cols-2 md:grid-cols-4 lg:grid-cols-5',
    },
  },
  defaultVariants: {
    columnLayout: '4',
  },
})

const FooterMenu = ({
  footerElement,
  textColor,
  className,
  columnLayout,
  children,
}) => {
  const Footer = footerElement || 'footer'
  return (
    <Footer className={cn(footerVariants({ textColor }), className)}>
      <div className={cn(gridVariants({ columnLayout }))}>{children}</div>
    </Footer>
  )
}

export default FooterMenu

FooterMenu.propTypes = {
  /**
   * Allows for customizing the footer element.
   * Use `'div'` if nesting within a footer element.
   * @default 'footer'
   */
  footerElement: PropTypes.elementType,
  /**
   * The text color of the footer.
   * @default 'Dark'
   */
  textColor: PropTypes.oneOf(['Dark', 'Light']),
  /**
   * Additional classes to apply to the footer.
   */
  className: PropTypes.string,
  /**
   * The layout of the columns in the footer.
   * @default '4 columns'
   */
  columnLayout: PropTypes.oneOf([
    '2 columns',
    '3 columns',
    '4 columns',
    '5 columns',
  ]),
  /**
   * The content of the footer.
   */
  children: PropTypes.node,
}
