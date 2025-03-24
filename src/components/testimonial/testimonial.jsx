export default function Testimonial({
  avatarAltText,
  name,
  role,
  organization,
  text,
  avatar,
}) {
  return (
    <div className="border-l-1 border-l-drupal-gray-default pl-4">
      <blockquote class="">
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
          <p className="text-sm text-drupal-gray-default">{`${role} | ${organization}`}</p>
        </div>
      </div>
    </div>
  )
}
