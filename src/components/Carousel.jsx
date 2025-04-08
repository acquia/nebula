import React, { useState } from 'react'

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
      <div className="relative mx-auto w-full max-w-lg overflow-hidden">
        <div
          className="flex gap-2 transition-transform duration-300"
          style={{
            transform: `translateX(calc(-${currentIndex * 80}% - ${currentIndex * 10}px + 10%))`, // Tailwind cannot handle dynamic transform values
          }}
        >
          {items.map((item, index) => (
            <div
              key={`slide-${index}`}
              className="w-[80%] flex-none transition-opacity duration-300"
              style={{
                opacity: index === currentIndex ? 1 : 0.5,
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
            className={`h-2 w-2 cursor-pointer rounded-full ${
              index === currentIndex ? 'bg-blue-500' : 'bg-gray-400'
            }`}
            onClick={() => setCurrentIndex(index)}
          ></button>
        ))}
      </div>
    </div>
  )
}

export default Carousel
