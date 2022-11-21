const SearchBar = ({ onInputChange }) => {
  const inputChange = (e) => {
    onInputChange(e);
  };
  const searchSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <form onSubmit={searchSubmit}>
      <input type="text" onChange={inputChange} />
    </form>
  );
};

export default SearchBar;
