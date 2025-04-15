import PropTypes from 'prop-types'

import { cn } from '../../lib/utils'

const Header = ({ backgroundColor = '', className, logo, menu }) => {
  return (
    <header
      className={cn(
        'gap-4 px-8 py-3 md:grid-cols-[1fr_auto_1fr] relative grid w-full grid-cols-2 justify-center leading-[normal]',
        'border-b border-solid border-gray-200',
        'bg-[var(--color-bg)]',
        className
      )}
      style={{
        '--color-bg': backgroundColor,
      }}
    >
      <div className="my-1 max-h-8 md:my-3 justify-self-start">{logo}</div>
      <div className="md:content-center md:px-6 md:py-2 w-full">{menu}</div>
    </header>
  )
}

export default Header

Header.propTypes = {
  /**
   * Background color for the header
   */
  backgroundColor: PropTypes.string,

  /**
   * Additional class names for the header component
   */
  className: PropTypes.string,

  /**
   * Logo component or element to display in the header
   */
  logo: PropTypes.node.isRequired,

  /**
   * Menu component or element to display in the header
   */
  menu: PropTypes.node.isRequired,
}
