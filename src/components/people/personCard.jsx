export default function PersonCard({
  name,
  title,
  avatar,
  avatarAltText,
  headingElement = 'h3',
}) {
  const Heading = headingElement
  return (
    <div className="align-center flex min-h-45 max-w-70 flex-col justify-center gap-4 rounded-2xl bg-white p-4 text-center leading-[normal]">
      <img
        className="mx-auto h-auto rounded-xl sm:w-48 lg:w-60"
        src={avatar}
        alt={avatarAltText}
      />
      <div className="mt-2 flex flex-col gap-1 sm:mt-4">
        <Heading className="font-bold text-gray-800 sm:text-base lg:text-lg">
          {name}
        </Heading>
        <p className="text-xs text-blue-700 sm:text-sm lg:text-base">{title}</p>
      </div>
    </div>
  )
}
