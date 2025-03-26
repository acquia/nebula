import { cva } from 'class-variance-authority'

const textVariants = cva('text-xs', {
  variants: {
    textColor: {
      Dark: 'text-gray-600',
      Light: 'text-gray-200',
    },
  },
})

const Copyright = ({ textColor = 'Dark', text }) => {
  return <p className={textVariants({ textColor })}>{text}</p>
}

export default Copyright
