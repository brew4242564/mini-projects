const SearchBar = ({ inputValue, handleInputValue, changeSearch, text }) => {
  return (
    <div className="searchBar">
      <button onClick={changeSearch}>{text}</button>
      <input type="text" value={inputValue} onChange={handleInputValue} />
    </div>
  );
};

export default SearchBar;