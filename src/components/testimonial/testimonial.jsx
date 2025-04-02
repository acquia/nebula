import { cva } from 'class-variance-authority'

import { cn } from '../../lib/utils'

const cardVariants = cva('flex flex-col gap-2 leading-[normal]', {
  variants: {
    layout: {
      'Left aligned': 'items-start border-l-2 border-l-gray-200 pl-3 text-left',
      'Center aligned':
        'items-center border-l-2 border-l-gray-200 pl-3 text-center',
      'Right aligned': 'items-end border-r-2 border-r-gray-200 pr-3 text-right',
    },
    textColor: {
      Dark: '',
      Light: 'text-white',
    },
  },
  defaultVariants: {
    layout: 'Left aligned',
  },
})

const textVariants = cva('max-w-3xl', {
  variants: {
    textSize: {
      Large: 'text-xl',
      Medium: 'text-lg',
      Small: 'text-base',
    },
  },
})

const nameVariants = cva('font-bold', {
  variants: {
    textSize: {
      Large: 'text-base',
      Medium: 'text-sm',
      Small: 'text-xs',
    },
  },
})

const roleVariants = cva('text-sm', {
  variants: {
    textSize: {
      Large: 'text-base',
      Medium: 'text-sm',
      Small: 'text-xs',
    },
    textColor: {
      Dark: 'text-drupal-gray-default',
      Light: 'text-gray-300',
    },
  },
})

export default function Testimonial({
  avatarAltText,
  backgroundColor = '',
  backgroundColorOnHover = '',
  className,
  layout,
  name,
  role = '',
  organization = '',
  text,
  avatar,
  textColor = 'Dark',
  textSize = 'Large',
}) {
  return (
    <div
      className={cn(
        'rounded-xl',
        'p-4',
        'bg-[var(--color-bg)]',
        'hover:bg-[var(--color-bg-hover)]',
        className
      )}
      style={{
        '--color-bg': backgroundColor,
        '--color-bg-hover': backgroundColorOnHover,
      }}
    >
      <div className={cardVariants({ layout, textColor })}>
        {text && (
          <blockquote className={textVariants({ textSize })}>
            <p>{text}</p>
          </blockquote>
        )}
        <div className="flex items-center gap-4">
          {avatar && (
            <img
              alt={avatarAltText}
              className="h-10 w-10 rounded-full object-contain"
              src={avatar}
            />
          )}
          <div className="flex flex-col gap-1">
            {name && <p className={nameVariants({ textSize })}>{name}</p>}
            {(role || organization) && (
              <p
                className={roleVariants({ textColor, textSize })}
              >{`${role} ${role && organization ? '|' : ''} ${organization}`}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
