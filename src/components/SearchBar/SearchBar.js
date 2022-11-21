import _ from 'lodash';
import { Input } from 'antd';

const SearchBar = ({ onInputChange }) => {
  const debounced = _.debounce((e) => {
    onInputChange(e);
  }, 1000);

  const searchSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <form onSubmit={searchSubmit}>
      <Input
        onChange={debounced}
        size="large"
        placeholder="Type to search..."
      />
    </form>
  );
};

export default SearchBar;
