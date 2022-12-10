import _ from 'lodash'
import { Input } from 'antd'
import './SearchBar.scss'

function SearchBar({ onInputChange }) {
  const debounced = _.debounce((e) => {
    onInputChange(e)
  }, 2000)

  const searchSubmit = (e) => {
    e.preventDefault()
  }
  return (
    <form onSubmit={searchSubmit}>
      <Input onChange={debounced} size="large" placeholder="Type to search..." className="input" />
    </form>
  )
}

export default SearchBar
