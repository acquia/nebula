import { cva } from 'class-variance-authority'

export default function Testimonial({
  avatarAltText,
  name,
  role,
  organization,
  text,
  avatar,
  textColor = 'Dark',
  textSize = 'Large',
}) {
  const textVariants = cva('', {
    variants: {
      textSize: {
        Large: 'text-lg',
        Medium: 'text-base',
        Small: 'text-sm',
      },
    },
  })

  const nameVariants = cva('font-bold', {
    variants: {
      textSize: {
        Large: 'text-sm',
        Medium: 'text-sm',
        Small: 'text-xs',
      },
    },
  })

  const roleVariants = cva('text-sm', {
    variants: {
      textSize: {
        Large: 'text-sm',
        Medium: 'text-sm',
        Small: 'text-xs',
      },
      textColor: {
        Dark: 'text-drupal-gray-default',
        Light: 'text-white',
      },
    },
  })

  return (
    <div className="flex flex-col gap-2 border-l-2 border-l-gray-200 pl-2">
      <blockquote class={textVariants({ textSize })}>
        <p>{text}</p>
      </blockquote>
      <div className="flex items-center gap-4">
        <img
          src={avatar}
          alt={avatarAltText}
          className="h-10 w-10 rounded-full object-contain"
        />
        <div className="flex flex-col gap-1">
          <p className={nameVariants({ textSize })}>{name}</p>
          <p
            className={roleVariants({ textColor, textSize })}
          >{`${role} | ${organization}`}</p>
        </div>
      </div>
    </div>
  )
}
