import { cn } from '../lib/utils'

const Header = ({ backgroundColor = '', className, logo, menu }) => {
  return (
    <header
      className={cn(
        'gap-4 px-8 py-3 md:grid-cols-[1fr_auto_1fr] grid w-full grid-cols-2 justify-center border-b border-solid border-gray-200 leading-[normal]',
        'bg-[var(--color-bg)]',
        className
      )}
      style={{
        '--color-bg': backgroundColor,
      }}
    >
      <div className="my-1 max-h-8 md:my-3">{logo}</div>
      <div className="md:content-center md:px-6 md:py-2 w-full">{menu}</div>
    </header>
  )
}

export default Header
