import React from 'react'

import { MultiCarousel } from './'

const meta = {
  title: 'Components/MultiCarousel',
  component: MultiCarousel,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    slidesToShow: {
      control: { type: 'number', min: 1, max: 5 },
      description: 'Number of slides to show at once',
    },
  },
}

export default meta

export const Default = {
  args: {
    slidesToShow: 1,
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
      <div
        key="slide-4"
        className="h-64 text-xl font-bold flex items-center justify-center bg-primary-200"
      >
        Slide 4
      </div>,
      <div
        key="slide-5"
        className="h-64 bg-green-200 text-xl font-bold flex items-center justify-center"
      >
        Slide 5
      </div>,
      <div
        key="slide-6"
        className="h-64 bg-red-200 text-xl font-bold flex items-center justify-center"
      >
        Slide 6
      </div>,
    ],
  },
}

export const MultipleSlidesVisible = {
  args: {
    slidesToShow: 3,
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
      <div
        key="slide-4"
        className="h-64 text-xl font-bold flex items-center justify-center bg-primary-200"
      >
        Slide 4
      </div>,
      <div
        key="slide-5"
        className="h-64 bg-green-200 text-xl font-bold flex items-center justify-center"
      >
        Slide 5
      </div>,
      <div
        key="slide-6"
        className="h-64 bg-red-200 text-xl font-bold flex items-center justify-center"
      >
        Slide 6
      </div>,
    ],
  },
}

export const WithImages = {
  args: {
    slidesToShow: 2,
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
