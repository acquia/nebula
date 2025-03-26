export default function IconListItem({ index, bulletImage, children }) {
  return (
    <li className="mb-4 flex gap-x-3">
      {bulletImage ? (
        <span className="mt-0.5 flex size-5 min-h-6 min-w-6 items-center justify-center rounded-full bg-blue-800 fill-white text-white">
          <img src={bulletImage} className="size-3.5" />
        </span>
      ) : null}
      <div>{children}</div>
    </li>
  )
}
