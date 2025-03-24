import { cva } from 'class-variance-authority'

import Testimonial from './testimonial'

export default function ColumnTestimonial({
  image,
  imageAltText,
  background,
  textColor,
  ...props
}) {
  const variants = cva(
    'flex min-h-100 flex-row flex-wrap items-center justify-between gap-8 bg-top bg-no-repeat p-8',
    {
      variants: {
        textColor: {
          Dark: '',
          Light: 'text-white',
        },
      },
    }
  )

  return (
    <div
      className={variants({ textColor })}
      style={{ backgroundImage: `url(${background})`, color: textColor }}
    >
      {image && (
        <div className="md:flex-1">
          <img src={image} alt={imageAltText} />
        </div>
      )}
      <div className="md:flex-1">
        <Testimonial textColor={textColor} {...props} />
      </div>
    </div>
  )
}
