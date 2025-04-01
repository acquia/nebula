export default function IconListItem({ bulletImage, children }) {
  return (
    <li className="mb-4 flex gap-x-3">
      {bulletImage ? (
        <span className="mt-0.5 flex size-5 min-h-6 min-w-6 items-center justify-center rounded-full bg-blue-800 fill-white text-white">
          <img className="size-3.5" src={bulletImage} />
        </span>
      ) : null}
      <div>{children}</div>
    </li>
  )
}
