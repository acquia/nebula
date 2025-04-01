import { cva } from 'class-variance-authority'

import { cn } from '../lib/utils'

const textVariants = cva('my-8', {
  variants: {
    textColor: {
      Dark: 'text-slate-950',
      Light: 'text-white',
    },
    textSize: {
      ExtraSmall: 'text-xs',
      Small: 'text-sm',
      Normal: 'text-base/6',
      Large: 'text-lg/8',
      ExtraLarge: 'text-xl/8',
    },
  },
})

const Text = ({ text, textSize, textColor, className }) => {
  return (
    <p className={cn(textVariants({ textColor, textSize }), className)}>
      {text}
    </p>
  )
}

export default Text
