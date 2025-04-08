import React, { useState } from 'react'

const MultiCarousel = ({ items, slidesToShow = 1 }) => {
  const [currentIndex, setCurrentIndex] = useState(0)

  const totalPages = Math.ceil(items.length / slidesToShow)

  const handlePrev = () => {
    // Move by slidesToShow number of slides
    setCurrentIndex((prevIndex) => {
      const newIndex = prevIndex - slidesToShow
      return newIndex < 0 ? Math.max(items.length - slidesToShow, 0) : newIndex
    })
  }

  const handleNext = () => {
    // Move by slidesToShow number of slides
    setCurrentIndex((prevIndex) => {
      const newIndex = prevIndex + slidesToShow
      return newIndex >= items.length ? 0 : newIndex
    })
  }

  // Handle dot indicator clicks
  const goToPage = (pageIndex) => {
    const newIndex = pageIndex * slidesToShow
    setCurrentIndex(Math.min(newIndex, items.length - slidesToShow))
  }

  // Get the current page for indicators
  const currentPage = Math.floor(currentIndex / slidesToShow)

  return (
    <div>
      <div className="relative mx-auto w-full max-w-lg overflow-hidden">
        <div
          className="flex gap-2 transition-transform duration-300"
          style={{
            transform: `translateX(calc(-${currentIndex * (100 / slidesToShow)}% - ${currentIndex * (10 / slidesToShow)}px))`,
          }}
        >
          {items.map((item, index) => {
            // Determine if this is a current active slide
            const isActive =
              index >= currentIndex && index < currentIndex + slidesToShow

            return (
              <div
                key={`slide-${index}`}
                className="transition-opacity duration-300"
                style={{
                  opacity: isActive ? 1 : 0.5,
                  filter: isActive ? 'none' : 'grayscale(100%)',
                  flex: `0 0 calc(${100 / slidesToShow}% - ${((slidesToShow - 1) * 10) / slidesToShow}px)`,
                  width: `calc(${100 / slidesToShow}% - ${((slidesToShow - 1) * 10) / slidesToShow}px)`,
                }}
              >
                {item}
              </div>
            )
          })}
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
        {[...Array(totalPages)].map((_, pageIndex) => (
          <button
            key={pageIndex}
            className={`h-2 w-2 cursor-pointer rounded-full ${
              pageIndex === currentPage ? 'bg-blue-500' : 'bg-gray-400'
            }`}
            onClick={() => goToPage(pageIndex)}
          ></button>
        ))}
      </div>
    </div>
  )
}

export default MultiCarousel
