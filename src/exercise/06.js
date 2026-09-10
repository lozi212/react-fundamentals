// Rendering Lists
// http://localhost:3000/isolated/exercise/07.js

import * as React from 'react'

const allItems = [
  {id: 'apple', value: '🍎 apple'},
  {id: 'orange', value: '🍊 orange'},
  {id: 'grape', value: '🍇 grape'},
  {id: 'pear', value: '🍐 pear'},
]

function App() {
  const [items, setItems] = React.useState(allItems)

  function addItem() {
    // Updater form: always works from the latest state, even with batched updates
    setItems(prevItems => {
      const itemIds = prevItems.map(i => i.id)
      const nextItem = allItems.find(i => !itemIds.includes(i.id))
      // find() returns undefined when every item is already shown,
      // so guard here instead of relying only on the disabled button
      return nextItem ? [...prevItems, nextItem] : prevItems
    })
  }

  function removeItem(item) {
    setItems(prevItems => prevItems.filter(i => i.id !== item.id))
  }

  return (
    <div className="keys">
      <button disabled={items.length >= allItems.length} onClick={addItem}>
        add item
      </button>
      <ul>
        {items.map(item => (
          // key comes from the data, so it stays stable when items move or are removed
          <li key={item.id}>
            <button onClick={() => removeItem(item)}>remove</button>{' '}
            <label htmlFor={`${item.id}-input`}>{item.value}</label>{' '}
            <input id={`${item.id}-input`} defaultValue={item.value} />
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App