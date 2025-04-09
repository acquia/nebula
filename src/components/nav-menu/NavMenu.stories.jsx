import React from 'react'

import NavMenu, { NavMenuItem } from './NavMenu'

export default {
  title: 'Components/NavMenu',
  component: NavMenu,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
}

export const Horizontal = {
  args: {
    variant: 'horizontal',
  },
  render: () => (
    <NavMenu variant="horizontal">
      <NavMenuItem>Home</NavMenuItem>
      <NavMenuItem>Products</NavMenuItem>
      <NavMenuItem>Services</NavMenuItem>
      <NavMenuItem>About</NavMenuItem>
      <NavMenuItem>Contact</NavMenuItem>
      <NavMenuItem
        dropdownItems={[
          { label: 'Sub Item 1', href: '#' },
          { label: 'Sub Item 2', href: '#' },
          { label: 'Sub Item 3', href: '#' },
        ]}
      >
        More
      </NavMenuItem>
    </NavMenu>
  ),
}

export const Vertical = {
  args: {
    variant: 'vertical',
  },
  render: () => (
    <NavMenu variant="vertical">
      <NavMenuItem>Home</NavMenuItem>
      <NavMenuItem>Products</NavMenuItem>
      <NavMenuItem>Services</NavMenuItem>
      <NavMenuItem>About</NavMenuItem>
      <NavMenuItem>Contact</NavMenuItem>
    </NavMenu>
  ),
}

export const WithActiveState = {
  args: {
    variant: 'horizontal',
  },
  render: () => (
    <NavMenu variant="horizontal">
      <NavMenuItem isActive>Home</NavMenuItem>
      <NavMenuItem>Products</NavMenuItem>
      <NavMenuItem>Services</NavMenuItem>
      <NavMenuItem>About</NavMenuItem>
      <NavMenuItem>Contact</NavMenuItem>
    </NavMenu>
  ),
}
