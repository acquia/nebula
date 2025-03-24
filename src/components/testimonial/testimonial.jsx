import { cva } from 'class-variance-authority'

export default function Testimonial({
  avatarAltText,
  name,
  role,
  organization,
  text,
  avatar,
  textColor,
}) {
  const variants = cva('text-sm', {
    variants: {
      textColor: {
        Dark: 'text-drupal-gray-default',
        Light: 'text-white',
      },
    },
  })

  return (
    <div className="border-l-2 border-l-gray-200 pl-4">
      <blockquote class="text-xl font-medium">
        <p class="">
          <em>{text}</em>
        </p>
      </blockquote>
      <div className="flex items-center gap-4">
        <img
          src={avatar}
          alt={avatarAltText}
          className="h-16 w-16 rounded-full object-contain"
        />
        <div className="flex flex-col gap-1">
          <p className="font-bold">{name}</p>
          <p
            className={variants({ textColor })}
          >{`${role} | ${organization}`}</p>
        </div>
      </div>
    </div>
  )
}
