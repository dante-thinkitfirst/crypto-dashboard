const FilterInput = ({ filter, onFilterChange }) => {
  return (
    <div className="filter">
      <input
        type="text"
        id="filter"
        value={filter}
        onChange={(e) => onFilterChange(e.target.value)}
        placeholder="Filter coins by name or symbol"
      />
    </div>
  );
};

export default FilterInput;
