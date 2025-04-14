import React, { useState } from 'react'

import { cn } from '../../lib/utils'
import { Link } from '../button'

const NavMenu = ({ children, variant = 'horizontal', className = '' }) => {
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
        variant === 'vertical'
          ? 'space-y-2 flex flex-col'
          : 'space-x-4 flex flex-wrap',
        className
      )}
      role="navigation"
    >
      {menuItems}
    </nav>
  )
}

export const NavMenuItem = ({
  children,
  isActive = false,
  isVertical = false,
  onClick,
  href = '#',
  className = '',
  dropdownItems = null,
}) => {
  const [isDropdownOpen, setDropdownOpen] = useState(false)

  const handleDropdownToggle = (e) => {
    e.preventDefault()
    setDropdownOpen(!isDropdownOpen)
  }

  return (
    <div className="relative" role={dropdownItems ? 'menu' : undefined}>
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
        <div className="left-0 mt-2 w-48 rounded-md shadow-lg absolute bg-white">
          <ul className="space-y-1 flex flex-col">
            {dropdownItems.map((item) => (
              <li key={item.label} role="menuitem">
                <a
                  className="rounded-md px-3 py-2 block text-gray-800 hover:bg-gray-100"
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
