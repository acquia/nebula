import React, { useCallback, useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'

import { cn } from '../../lib/utils'
import { Link } from '../button/button'

const NavMenu = ({
  backgroundColor = '#ffffff',
  children,
  className = '',
  variant = 'horizontal',
}) => {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef(null)
  const timeoutRef = useRef(null)
  const isVertical = variant === 'vertical' || isOpen

  function handleKeyDown(event) {
    if (event.key === 'Escape') {
      setIsOpen(false)
    }
  }

  const handleClickOutside = useCallback(
    (event) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        isOpen
      ) {
        setIsOpen(false)
      }
    },
    [isOpen]
  )

  const handleResize = useCallback(() => {
    clearTimeout(timeoutRef.current)
    timeoutRef.current = setTimeout(() => {
      if (window.innerWidth >= 768 && isOpen) {
        setIsOpen(false)
      }
    }, 100)
  }, [isOpen])

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen, handleClickOutside])

  useEffect(() => {
    window.addEventListener('resize', handleResize)

    return () => {
      clearTimeout(timeoutRef.current)
      window.removeEventListener('resize', handleResize)
    }
  }, [handleResize])

  // Map children to add active state and click handlers
  const menuItems = React.Children.map(children, (child, index) => {
    return React.cloneElement(child, {
      isActive: index === activeIndex,
      isVertical: isVertical,
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
    <div ref={menuRef} onKeyDown={handleKeyDown} tabIndex={-1}>
      <NavMenuButton isOpen={isOpen} setIsOpen={setIsOpen} />
      <div
        className={cn(
          'left-0 px-24 py-4 md:static md:block md:w-full md:border-none md:px-0 md:py-0 bg absolute w-screen',
          'bg-[var(--color-bg)]',
          isOpen ? 'mt-4 md:hidden' : 'hidden'
        )}
        style={{
          '--color-bg': backgroundColor,
        }}
      >
        <nav
          className={cn(
            'nav-menu',
            isVertical ? 'space-y-2 flex flex-col' : 'space-x-4 flex flex-wrap',
            className
          )}
          role="navigation"
        >
          {menuItems}
        </nav>
      </div>
    </div>
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

export const NavMenuButton = ({ isOpen, setIsOpen }) => {
  return (
    <div className="md:hidden flex justify-end">
      <button
        aria-expanded={isOpen}
        aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
        className={cn(
          'size-9 rounded-lg text-sm font-semibold relative flex cursor-pointer items-center justify-center border border-gray-600',
          'hover:border-primary-800 hover:bg-primary-100 hover:text-primary-800 focus:border-primary-800 focus:bg-primary-100 focus:text-primary-800 active:border-primary-900 active:bg-primary-200 active:text-primary-900'
        )}
        onClick={() => {
          setIsOpen(!isOpen)
        }}
        title={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
        type="button"
      >
        <svg
          className={cn('size-4', isOpen ? 'hidden' : '')}
          fill="none"
          height="24"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          width="24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <line x1="3" x2="21" y1="6" y2="6" />
          <line x1="3" x2="21" y1="12" y2="12" />
          <line x1="3" x2="21" y1="18" y2="18" />
        </svg>
        <svg
          className={cn('size-4 shrink-0', isOpen ? '' : 'hidden')}
          fill="none"
          height="24"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          width="24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M18 6 6 18" />
          <path d="m6 6 12 12" />
        </svg>
        <span className="sr-only">{`${isOpen ? 'Close' : 'Open'} navigation`}</span>
      </button>
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
