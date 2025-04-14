import React, { useState } from 'react'

import { cn } from '../../lib/utils'
import { Link } from '../button'

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
            'left-0 mt-2 w-48 rounded-md shadow-lg absolute',
            'bg-[var(--color-bg)]'
          )}
          style={{
            '--color-bg': backgroundColor,
          }}
        >
          <ul className="space-y-1 flex flex-col">
            {dropdownItems.map((item) => (
              <li key={item.label} role="menuitem">
                <a
                  className="rounded-md px-3 py-2 block text-gray-900 hover:bg-gray-100"
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
