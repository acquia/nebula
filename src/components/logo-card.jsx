export default function LogoCard({
  altText,
  image,
  backgroundColor = "#F1F5F9",
}) {
  return (
    <div className="flex max-w-50 max-h-33 justify-center align-center flex-col gap-4 rounded-2xl p-6 leading-[normal]" style={{backgroundColor}}>
      <img src={image} alt={altText} className="object-contain h-auto w-50"/>
    </div>
  );
}
