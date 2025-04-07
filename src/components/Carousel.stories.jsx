import React from 'react'

import Carousel from './Carousel'

const meta = {
  title: 'Components/Carousel',
  component: Carousel,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
}

export default meta

export const Default = {
  args: {
    items: [
      <div
        key="slide-1"
        className="flex h-64 items-center justify-center bg-blue-200 text-xl font-bold"
      >
        Slide 1
      </div>,
      <div
        key="slide-2"
        className="flex h-64 items-center justify-center bg-green-200 text-xl font-bold"
      >
        Slide 2
      </div>,
      <div
        key="slide-3"
        className="flex h-64 items-center justify-center bg-red-200 text-xl font-bold"
      >
        Slide 3
      </div>,
    ],
  },
}

export const WithImages = {
  args: {
    items: [
      <img
        key="image-1"
        alt="Image 1"
        className="h-64 w-full object-contain"
        src="/src/assets/images/hero-background-placeholder-dark.png"
      />,
      <img
        key="image-2"
        alt="Image 2"
        className="h-64 w-full object-contain"
        src="/src/assets/images/placeholder.png"
      />,
      <img
        key="image-3"
        alt="Image 3"
        className="h-64 w-full object-contain"
        src="/src/assets/images/hero-background-placeholder-dark.png"
      />,
    ],
  },
}
