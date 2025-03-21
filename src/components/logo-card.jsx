export default function LogoCard({
  altText,
  image,
  backgroundColor = '#F1F5F9',
}) {
  return (
    <div
      className="align-center flex max-h-33 max-w-50 flex-col justify-center gap-4 rounded-2xl p-6 leading-[normal]"
      style={{ backgroundColor }}
    >
      <img src={image} alt={altText} className="h-auto w-50 object-contain" />
    </div>
  )
}
