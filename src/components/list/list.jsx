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
      Dark: 'text-gray-900',
      Light: 'text-white',
    },
  },
})

const List = ({ items, type = 'None', textColor, children, className }) => {
  const List = type === 'Ordered' ? 'ol' : 'ul'
  return (
    <List className={listVariants({ type, textColor, className })}>
      {items?.length
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
   * Be sure to define your own `<li>` elements
   * as a wrapper.
   */
  children: PropTypes.node,
  /**
   * Additional classes to apply to the list.
   */
  className: PropTypes.string,
  /**
   * Can be used instead of children.
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
   * Specifies the text color to use.
   * Options are 'Dark' and 'Light'.
   */
  textColor: PropTypes.oneOf(['Dark', 'Light']),
  /**
   * Sets the type of list to render.
   * Options are 'Ordered', 'Unordered', and 'None'.
   */
  type: PropTypes.oneOf(['Ordered', 'Unordered', 'None', 'Icon']),
}

export default List
