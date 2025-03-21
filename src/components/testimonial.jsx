import { cva } from "class-variance-authority";
import PropTypes from "prop-types";

const testimonialVariants = cva("mx-auto max-w-7xl px-4 sm:px-6 lg:px-8", {
  variants: {
    intent: {
      primary: "bg-black",
      secondary: "bg-gray-800",
      accent: "bg-sky-900",
    },
    spacing: {
      condensed: "py-8 lg:py-12",
      relaxed: "py-16 lg:py-24",
    },
  },
  defaultVariants: {
    intent: "primary",
    spacing: "relaxed",
  },
});

const Testimonial = ({ name, title, quote, intent, spacing }) => (
  <div className={testimonialVariants({ intent, spacing })}>
    <div className="mx-auto max-w-4xl">
      <blockquote className="mx-auto max-w-4xl">
        <p className="mb-6 md:text-lg">
          <span className="font-semibold text-emerald-300">{name},</span>{" "}
          <span className="text-slate-400">{title}</span>
        </p>

        <p className="text-xl text-white sm:text-2xl md:text-3xl md:leading-normal">
          {quote}
        </p>

        <footer className="mt-6 md:mt-10">
          <div className="border-neutral-700">
            <button
              type="button"
              className="group inline-flex items-center gap-x-3 text-sm text-slate-400 focus:outline-none disabled:pointer-events-none disabled:opacity-50"
            >
              <span className="flex size-8 flex-col items-center justify-center rounded-full bg-white text-black group-hover:bg-emerald-400 group-focus:bg-emerald-400 md:size-10">
                <svg
                  className="size-5 shrink-0"
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393" />
                </svg>
              </span>
              Watch the Video
            </button>
          </div>
        </footer>
      </blockquote>
    </div>
  </div>
);

Testimonial.propTypes = {
  name: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  quote: PropTypes.string.isRequired,
  intent: PropTypes.oneOf(["primary", "secondary", "accent"]),
  spacing: PropTypes.oneOf(["condensed", "relaxed"]),
};

Testimonial.displayName = "Testimonial";
export default Testimonial;
