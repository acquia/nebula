import { cva } from 'class-variance-authority'

import { cn } from '../../lib/utils'

const cardVariants = cva('gap-2 flex flex-col leading-[normal]', {
  variants: {
    layout: {
      'Left aligned': 'pl-3 items-start border-l-2 border-l-gray-200 text-left',
      'Center aligned':
        'pl-3 items-center border-l-2 border-l-gray-200 text-center',
      'Right aligned': 'pr-3 items-end border-r-2 border-r-gray-200 text-right',
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
      Dark: 'text-gray-dark',
      Light: 'text-gray-light',
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
        <div className="gap-4 flex items-center">
          {avatar && (
            <img
              alt={avatarAltText}
              className="h-10 w-10 rounded-full object-contain"
              src={avatar}
            />
          )}
          <div className="gap-1 flex flex-col">
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
