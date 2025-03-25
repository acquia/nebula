import { cva } from 'class-variance-authority'
import PropTypes from 'prop-types'

import { Link } from '../button'

const listVariants = cva('list-inside', {
  variants: {
    type: {
      Ordered: 'list-decimal',
      Unordered: 'list-disc',
      None: 'list-none',
    },
    textColor: {
      Dark: 'text-black',
      Light: 'text-white',
    },
  },
})

const List = ({ items, type = 'None', textColor, children }) => {
  const List = type === 'Ordered' ? 'ol' : 'ul'
  return (
    <List className={listVariants({ type, textColor })}>
      {items.length
        ? items.map((item, index) => (
            <li key={`list-${index}`}>
              {item.url ? <Link link={item.url}>{item.text}</Link> : item.text}
            </li>
          ))
        : children}
    </List>
  )
}

List.propTypes = {
  /**
   * Can pass children instead of items.
   * Be sure to define your own <li> elements.
   */
  children: PropTypes.node,
  /**
   * Takes in a list of items to render.
   * Items should be an array of objects with
   * required text strings and optional url strings.
   * Including a url will render the text as a link.
   */
  items: PropTypes.arrayOf({
    text: PropTypes.string.isRequired,
    url: PropTypes.string,
  }),
  /**
   * Sets the type of list to render.
   * Options are 'Ordered', 'Unordered', and 'None'.
   */
  type: PropTypes.oneOf(['Ordered', 'Unordered', 'None']),
  /**
   * Specifies the text color to use.
   * Options are 'Dark' and 'Light'.
   */
  textColor: PropTypes.oneOf(['Dark', 'Light']),
}

export default List
