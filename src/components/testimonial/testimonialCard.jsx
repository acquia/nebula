export default function TestimonialCard({
  avatarAltText,
  name,
  role,
  organization,
  text,
  avatar,
}) {
  return (
    <div className="align-center flex min-h-45 max-w-70 flex-col justify-center gap-4 rounded-2xl bg-white p-6 leading-[normal]">
      <blockquote class="border-l-1 border-l-drupal-gray-default pl-4">
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
