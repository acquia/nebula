import { cva } from 'class-variance-authority'
import PropTypes from 'prop-types'

import { cn } from '../../lib/utils'
import { Link } from '../button'

const wrapperVariants = cva('flex items-center justify-center gap-2', {
  variants: {
    orientation: {
      Horizontal: 'flex-row flex-wrap',
      Vertical: 'flex-col',
    },
  },
  defaultVariants: {
    orientation: 'Horizontal',
  },
})

export const SocialIconButton = ({ variant, children, link, ...props }) => {
  return (
    <Link className="size-10" link={link} variant={variant} {...props}>
      {children}
    </Link>
  )
}

const Social = ({ orientation, variant = 'solid', className }) => {
  return (
    <div className={cn(wrapperVariants({ orientation }), className)}>
      <SocialIconButton
        variant={variant}
        link="#"
        aria-label="Facebook"
        title="Facebook"
      >
        <FacebookSolidIcon />
      </SocialIconButton>
      <SocialIconButton
        variant={variant}
        link="#"
        aria-label="Google"
        title="Google"
      >
        <GoogleSolidIcon />
      </SocialIconButton>
      <SocialIconButton
        variant={variant}
        link="#"
        aria-label="GitHub"
        title="GitHub"
      >
        <GitHubSolidIcon />
      </SocialIconButton>
      <SocialIconButton
        variant={variant}
        link="#"
        aria-label="Instagram"
        title="Instagram"
      >
        <InstagramOutlineIcon />
      </SocialIconButton>
      <SocialIconButton
        variant={variant}
        link="#"
        aria-label="LinkedIn"
        title="LinkedIn"
      >
        <LinkedInOutlineIcon />
      </SocialIconButton>
    </div>
  )
}

export const FacebookSolidIcon = () => (
  <svg
    aria-hidden="true"
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    fill="currentColor"
    viewBox="0 0 16 16"
  >
    <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z" />
  </svg>
)

export const GoogleSolidIcon = () => (
  <svg
    aria-hidden="true"
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    fill="currentColor"
    viewBox="0 0 16 16"
  >
    <path d="M15.545 6.558a9.42 9.42 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.689 7.689 0 0 1 5.352 2.082l-2.284 2.284A4.347 4.347 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.792 4.792 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.702 3.702 0 0 0 1.599-2.431H8v-3.08h7.545z" />
  </svg>
)

export const XSolidIcon = () => (
  <svg
    aria-hidden="true"
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    fill="currentColor"
    viewBox="0 0 16 16"
  >
    <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z" />
  </svg>
)

export const GitHubSolidIcon = () => (
  <svg
    aria-hidden="true"
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    fill="currentColor"
    viewBox="0 0 16 16"
  >
    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
  </svg>
)

export const FacebookOutlineIcon = () => (
  <svg
    aria-hidden="true"
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g>
      <path
        d="M14.9999 1.6665H12.4999C11.3948 1.6665 10.335 2.10549 9.55364 2.88689C8.77224 3.66829 8.33325 4.7281 8.33325 5.83317V8.33317H5.83325V11.6665H8.33325V18.3332H11.6666V11.6665H14.1666L14.9999 8.33317H11.6666V5.83317C11.6666 5.61216 11.7544 5.4002 11.9107 5.24392C12.0669 5.08763 12.2789 4.99984 12.4999 4.99984H14.9999V1.6665Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
  </svg>
)

export const InstagramOutlineIcon = () => (
  <svg
    aria-hidden="true"
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g>
      <path
        d="M14.1667 1.6665H5.83342C3.53223 1.6665 1.66675 3.53198 1.66675 5.83317V14.1665C1.66675 16.4677 3.53223 18.3332 5.83342 18.3332H14.1667C16.4679 18.3332 18.3334 16.4677 18.3334 14.1665V5.83317C18.3334 3.53198 16.4679 1.6665 14.1667 1.6665Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M13.3333 9.47476C13.4361 10.1683 13.3176 10.8766 12.9947 11.4989C12.6718 12.1213 12.1609 12.6259 11.5346 12.9412C10.9083 13.2564 10.1986 13.3661 9.50641 13.2547C8.81419 13.1433 8.17472 12.8165 7.67895 12.3207C7.18318 11.825 6.85636 11.1855 6.74497 10.4933C6.63359 9.80106 6.74331 9.09134 7.05852 8.46507C7.37374 7.83881 7.87841 7.32788 8.50074 7.00496C9.12307 6.68205 9.83138 6.56359 10.5249 6.66643C11.2324 6.77133 11.8873 7.10098 12.393 7.60669C12.8987 8.11239 13.2283 8.76733 13.3333 9.47476Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14.5833 5.4165H14.5916"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
  </svg>
)

export const LinkedInOutlineIcon = () => (
  <svg
    aria-hidden="true"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M16 8C17.5913 8 19.1174 8.63214 20.2426 9.75736C21.3679 10.8826 22 12.4087 22 14V21H18V14C18 13.4696 17.7893 12.9609 17.4142 12.5858C17.0391 12.2107 16.5304 12 16 12C15.4696 12 14.9609 12.2107 14.5858 12.5858C14.2107 12.9609 14 13.4696 14 14V21H10V14C10 12.4087 10.6321 10.8826 11.7574 9.75736C12.8826 8.63214 14.4087 8 16 8Z"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M6 9H2V21H6V9Z"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M4 6C5.10457 6 6 5.10457 6 4C6 2.89543 5.10457 2 4 2C2.89543 2 2 2.89543 2 4C2 5.10457 2.89543 6 4 6Z"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

export default Social

Social.propTypes = {
  /**
   * Specifies the orientation of the social icons.
   * Options are 'Horizontal' and 'Vertical'.
   */
  orientation: PropTypes.oneOf(['Horizontal', 'Vertical']),
  /**
   * Specifies the variant of the social icons.
   * Default is 'solid'. See buttons for further variants.
   */
  variant: PropTypes.oneOf(['solid', 'outline']),
  /**
   * Additional class names for styling.
   */
  className: PropTypes.string,
}
