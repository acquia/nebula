import { cva } from 'class-variance-authority'
import PropTypes from 'prop-types'

import { cn } from '../../lib/utils'

const footerVariants = cva(
  'px-4 py-10 sm:px-6 lg:px-8 mx-auto mt-auto w-full max-w-[85rem] border-t border-solid border-gray-200',
  {
    variants: {
      textColor: {
        Dark: 'text-gray-900',
        Light: 'text-gray-200',
      },
    },
  }
)

const gridVariants = cva('mb-10 gap-6 grid', {
  variants: {
    columnLayout: {
      2: 'grid-cols-2',
      3: 'lg:grid-cols-3 grid-cols-2',
      4: 'md:grid-cols-3 lg:grid-cols-4 grid-cols-2',
      5: 'md:grid-cols-4 lg:grid-cols-5 grid-cols-2',
    },
  },
  defaultVariants: {
    columnLayout: '4',
  },
})

const FooterMenu = ({
  children,
  className,
  columnLayout,
  footerElement,
  textColor,
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
   * The content of the footer.
   */
  children: PropTypes.node,
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
}
