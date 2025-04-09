import React, { useState } from 'react'

import { cn } from '../../lib/utils'

const Carousel = ({ items }) => {
  const [currentIndex, setCurrentIndex] = useState(0)

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? items.length - 1 : prevIndex - 1
    )
  }

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === items.length - 1 ? 0 : prevIndex + 1
    )
  }

  return (
    <div>
      <div className="relative mx-auto box-border w-full max-w-lg overflow-hidden">
        <div
          className="box-border flex gap-2 transition-transform duration-300"
          style={{
            transform: `translateX(calc(-${currentIndex * 80}% - ${currentIndex * 10}px  + 2px + 10%))`, // Tailwind cannot handle dynamic transform values
          }}
        >
          {items.map((item, index) => (
            <div
              key={`slide-${index}`}
              className={cn(
                'box-border w-[80%] flex-none transition-opacity duration-300',
                index === currentIndex ? 'opacity-100' : 'opacity-40'
              )}
              style={{
                filter: index === currentIndex ? 'none' : 'grayscale(100%)',
                display:
                  Math.abs(index - currentIndex) <= 1 ||
                  (currentIndex === 0 && index === items.length - 1) ||
                  (currentIndex === items.length - 1 && index === 0)
                    ? 'block'
                    : 'none',
              }}
            >
              {item}
            </div>
          ))}
        </div>
        <button
          aria-label="Previous Slide"
          className="absolute top-1/2 left-2 flex h-7 w-7 -translate-y-1/2 transform cursor-pointer items-center justify-center rounded-full bg-blue-500 text-white hover:bg-blue-400"
          onClick={handlePrev}
        >
          &larr;
        </button>
        <button
          aria-label="Next Slide"
          className="absolute top-1/2 right-2 flex h-7 w-7 -translate-y-1/2 transform cursor-pointer items-center justify-center rounded-full bg-blue-500 text-white hover:bg-blue-400"
          onClick={handleNext}
        >
          &rarr;
        </button>
      </div>
      <div className="mx-auto mt-4 flex w-full max-w-lg justify-center space-x-2">
        {items.map((_, index) => (
          <button
            key={`paginator-${index}`}
            className={cn(
              'h-2 w-2 cursor-pointer rounded-full',
              index === currentIndex ? 'bg-blue-500' : 'bg-gray-400'
            )}
            onClick={() => setCurrentIndex(index)}
          ></button>
        ))}
      </div>
    </div>
  )
}

export default Carousel
