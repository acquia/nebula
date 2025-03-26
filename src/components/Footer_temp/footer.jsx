import { cva } from 'class-variance-authority'
import PropTypes from 'prop-types'

import { cn } from '../../lib/utils'
import { Link } from '../button'

const footerVariants = cva(
  'mx-auto mt-auto w-full max-w-[85rem] border-t border-solid border-slate-200 px-4 py-10 sm:px-6 lg:px-8',
  {
    variants: {
      textColor: {
        Dark: 'text-gray-900',
        Light: 'text-gray-200',
      },
    },
  }
)

const Footer = ({ footerElement, textColor, className }) => {
  const Footer = footerElement || 'footer'
  return (
    <Footer className={cn(footerVariants({ textColor }), className)}>
      <div className="mb-10 grid grid-cols-2 gap-6 md:grid-cols-4 lg:grid-cols-5">
        <div>
          <div className="text-xs font-semibold uppercase">Product</div>
          <div className="mt-3 grid space-y-3 text-sm">
            <p>
              <Link link="#">Pricing</Link>
            </p>
            <p>
              <Link link="#">Changelog</Link>
            </p>
            <p>
              <Link link="#">Docs</Link>
            </p>
            <p>
              <Link link="#">Download</Link>
            </p>
          </div>
        </div>

        <div>
          <div className="text-xs font-semibold uppercase">Company</div>
          <div className="mt-3 grid space-y-3 text-sm">
            <p>
              <Link link="#">About us</Link>
            </p>
            <p>
              <Link link="#">Blog</Link>
            </p>
            <p>
              <Link link="#">Careers</Link>
            </p>
            <p>
              <Link link="#">Customers</Link>
            </p>
            <p>
              <Link link="#">Newsroom</Link>
            </p>
          </div>
        </div>

        <div>
          <div className="text-xs font-semibold uppercase">Resources</div>
          <div className="mt-3 grid space-y-3 text-sm">
            <p>
              <Link link="#">Community</Link>
            </p>
            <p>
              <Link link="#">Help & Support</Link>
            </p>
            <p>
              <Link link="#">eBook</Link>
            </p>
            <p>
              <Link link="#">What's New</Link>
            </p>
          </div>
        </div>

        <div>
          <div className="text-xs font-semibold uppercase">Developers</div>
          <div className="mt-3 grid space-y-3 text-sm">
            <p>
              <Link link="#">API</Link>
            </p>
            <p>
              <Link link="#">GitHub</Link>
            </p>
            <p>
              <Link link="#">Status</Link>
            </p>
          </div>

          <div className="mt-7 text-xs font-semibold uppercase">Industries</div>
          <div className="mt-3 grid space-y-3 text-sm">
            <p>
              <Link link="#">Financial Services</Link>
            </p>
            <p>
              <Link link="#">Education</Link>
            </p>
          </div>
        </div>

        <div>
          <div className="text-xs font-semibold uppercase">Contact us</div>
          <div className="mt-3 grid space-y-3 text-sm">
            <p>
              456 Elm Street <br />
              Suite 300 <br />
              Los Angeles, CA 90001 <br />
              USA
            </p>
          </div>
        </div>
      </div>
    </Footer>
  )
}

export default Footer

Footer.propTypes = {
  /**
   * Allows for customizing the footer element.
   * Use `'div'` if nesting within a footer element.
   * @default 'footer'
   */
  footerElement: PropTypes.elementType,
  /**
   * The text color of the footer.
   * @default 'Dark'
   */
  textColor: PropTypes.oneOf(['Dark', 'Light']),
  /**
   * Additional classes to apply to the footer.
   */
  className: PropTypes.string,
}
