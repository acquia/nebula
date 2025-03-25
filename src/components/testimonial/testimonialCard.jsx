import Testimonial from './testimonial'

export default function TestimonialCard({ ...props }) {
  return (
    <div className="align-center flex min-h-45 max-w-70 flex-col justify-center gap-4 rounded-2xl bg-white p-4 leading-[normal]">
      <Testimonial textSize="Small" {...props} />
    </div>
  )
}
