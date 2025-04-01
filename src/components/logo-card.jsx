export default function LogoCard({
  altText,
  backgroundColor = '#F1F5F9',
  image,
}) {
  return (
    <div
      className="align-center flex max-h-33 max-w-50 flex-col justify-center gap-4 rounded-2xl p-6 leading-[normal]"
      style={{ backgroundColor }}
    >
      <img alt={altText} className="h-auto w-50 object-contain" src={image} />
    </div>
  )
}
