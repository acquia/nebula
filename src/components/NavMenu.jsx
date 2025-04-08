import React, { useState } from 'react'

import { Link } from './button'

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
      className={`nav-menu ${variant === 'vertical' ? 'flex flex-col space-y-2' : 'flex flex-wrap space-x-4'} ${className}`}
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
    <div className="relative">
      <Link
        className={`${isActive ? (isVertical ? 'border-l-2 border-blue-500' : 'border-b-2 border-l-0 border-blue-500') : ''} ${className}`}
        href={href}
        onClick={dropdownItems ? handleDropdownToggle : onClick}
        variant="navLinkDark"
      >
        {children}
        {dropdownItems && (
          <span className={`ml-2 transform transition-transform duration-200`}>
            {'⌵'}
          </span>
        )}
      </Link>
      {dropdownItems && isDropdownOpen && (
        <div className="absolute left-0 mt-2 w-48 rounded-md bg-white shadow-lg">
          <ul className="flex flex-col space-y-1">
            {dropdownItems.map((item) => (
              <li key={item.label}>
                <a
                  className="block rounded-md px-3 py-2 text-gray-800 hover:bg-gray-100"
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
