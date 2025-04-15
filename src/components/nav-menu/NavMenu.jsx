import React, { useState } from 'react'
import PropTypes from 'prop-types'

import { cn } from '../../lib/utils'
import { Link } from '../button/button'

const NavMenu = ({
  backgroundColor = '',
  children,
  className = '',
  variant = 'horizontal',
}) => {
  const [activeIndex, setActiveIndex] = useState(0)

  // Map children to add active state and click handlers
  const menuItems = React.Children.map(children, (child, index) => {
    return React.cloneElement(child, {
      isActive: index === activeIndex,
      isVertical: variant === 'vertical',
      onClick: (e) => {
        setActiveIndex(index)
        // Call the original onClick if it exists
        if (child.props.onClick) {
          child.props.onClick(e)
        }
      },
    })
  })

  return (
    <nav
      className={cn(
        'nav-menu',
        'bg-[var(--color-bg)]',
        variant === 'vertical'
          ? 'space-y-2 flex flex-col'
          : 'space-x-4 flex flex-wrap',
        className
      )}
      role="navigation"
      style={{
        '--color-bg': backgroundColor,
      }}
    >
      {menuItems}
    </nav>
  )
}

export const NavMenuItem = ({
  backgroundColor = '#ffffff',
  children,
  className = '',
  dropdownItems = null,
  href = '#',
  isActive = false,
  isVertical = false,
  onClick,
}) => {
  const [isDropdownOpen, setDropdownOpen] = useState(false)

  const handleDropdownToggle = (e) => {
    e.preventDefault()
    setDropdownOpen(!isDropdownOpen)
  }

  return (
    <div
      className={cn('relative', 'bg-[var(--color-bg)]')}
      role={dropdownItems ? 'menu' : undefined}
      style={{
        '--color-bg': backgroundColor,
      }}
    >
      <Link
        className={cn(
          isActive
            ? isVertical
              ? 'border-l-2 border-primary-500'
              : 'border-b-2 border-l-0 border-primary-500'
            : '',
          className
        )}
        href={href}
        onClick={dropdownItems ? handleDropdownToggle : onClick}
        variant="navLinkDark"
      >
        {children}
        {dropdownItems && (
          <span className="transform transition-transform duration-200">
            {'⌵'}
          </span>
        )}
      </Link>
      {dropdownItems && isDropdownOpen && (
        <div
          className={cn(
            'left-0 mt-2 w-48 rounded-md shadow-lg absolute border border-gray-300',
            'bg-[var(--color-bg)]'
          )}
          style={{
            '--color-bg': backgroundColor,
          }}
        >
          <ul className="gap-1 [&>li:first-child]:rounded-t-md [&>li:last-child]:rounded-b-md flex flex-col">
            {dropdownItems.map((item) => (
              <li
                key={item.label}
                className="[&:first-child>a]:rounded-t-md [&:last-child>a]:rounded-b-md"
                role="menuitem"
              >
                <a
                  className={cn(
                    'px-3 py-2 block',
                    'text-black hover:bg-gray-200 focus:bg-gray-200 active:bg-gray-300'
                  )}
                  href={item.href}
                  onClick={item.onClick}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default NavMenu

NavMenu.propTypes = {
  /**
   * Background color for the navigation menu
   */
  backgroundColor: PropTypes.string,
  /**
   * Menu items to be rendered
   */
  children: PropTypes.node,
  /**
   * Additional class names for the menu
   */
  className: PropTypes.string,
  /**
   * Orientation of the menu
   */
  variant: PropTypes.oneOf(['horizontal', 'vertical']),
}

NavMenuItem.propTypes = {
  /**
   * Background color for the menu item
   */
  backgroundColor: PropTypes.string,
  /**
   * Content of the menu item
   */
  children: PropTypes.node,
  /**
   * Additional class names for the menu item
   */
  className: PropTypes.string,
  /**
   * Items to be displayed in dropdown menu
   */
  dropdownItems: PropTypes.arrayOf(
    PropTypes.shape({
      /**
       * URL for the dropdown item
       */
      href: PropTypes.string,
      /**
       * Label for the dropdown item
       */
      label: PropTypes.node.isRequired,
      /**
       * Click handler for the dropdown item
       */
      onClick: PropTypes.func,
    })
  ),
  /**
   * URL the menu item links to
   */
  href: PropTypes.string,
  /**
   * Whether the item is currently active
   */
  isActive: PropTypes.bool,
  /**
   * Whether the item is in vertical orientation
   */
  isVertical: PropTypes.bool,
  /**
   * Click handler for the menu item
   */
  onClick: PropTypes.func,
}
