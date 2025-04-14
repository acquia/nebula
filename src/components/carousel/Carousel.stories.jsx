import React from 'react'

import { Carousel } from './'

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
        className="h-64 text-xl font-bold flex items-center justify-center bg-primary-200"
      >
        Slide 1
      </div>,
      <div
        key="slide-2"
        className="h-64 bg-green-200 text-xl font-bold flex items-center justify-center"
      >
        Slide 2
      </div>,
      <div
        key="slide-3"
        className="h-64 bg-red-200 text-xl font-bold flex items-center justify-center"
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
