import React, { useEffect, useState } from 'react'

const MultiCarousel = ({ items, slidesToShow = 1 }) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [visibleSlides, setVisibleSlides] = useState(slidesToShow)

  useEffect(() => {
    const updateSlidesToShow = () => {
      if (window.innerWidth < 640) {
        setVisibleSlides(1)
      } else {
        setVisibleSlides(slidesToShow)
      }
    }

    updateSlidesToShow()
    window.addEventListener('resize', updateSlidesToShow)
    return () => window.removeEventListener('resize', updateSlidesToShow)
  }, [slidesToShow])

  const totalPages = Math.ceil(items.length / visibleSlides)

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => {
      const newIndex = prevIndex - visibleSlides
      return newIndex < 0 ? Math.max(items.length - visibleSlides, 0) : newIndex
    })
  }

  const handleNext = () => {
    setCurrentIndex((prevIndex) => {
      const newIndex = prevIndex + visibleSlides
      return newIndex >= items.length ? 0 : newIndex
    })
  }

  const goToPage = (pageIndex) => {
    const newIndex = pageIndex * visibleSlides
    setCurrentIndex(Math.min(newIndex, items.length - visibleSlides))
  }

  const currentPage = Math.floor(currentIndex / visibleSlides)

  return (
    <div>
      <div className="relative mx-auto w-full overflow-hidden">
        <div
          className="flex gap-2 transition-transform duration-300"
          style={{
            transform: `translateX(calc(-${currentIndex * (100 / visibleSlides)}% - ${currentIndex * (10 / visibleSlides)}px))`,
          }}
        >
          {items.map((item, index) => {
            const isActive =
              index >= currentIndex && index < currentIndex + visibleSlides

            return (
              <div
                key={`slide-${index}`}
                className="transition-opacity duration-300"
                style={{
                  opacity: isActive ? 1 : 0.5,
                  filter: isActive ? 'none' : 'grayscale(100%)',
                  flex: `0 0 calc(${100 / visibleSlides}% - ${((visibleSlides - 1) * 10) / visibleSlides}px)`,
                  width: `calc(${100 / visibleSlides}% - ${((visibleSlides - 1) * 10) / visibleSlides}px)`,
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
            key={`paginator-${pageIndex}`}
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
