function ProductViewForm({
  setSortBy,
  setIsSortAscending,
  sortBy,
  isSortAscending,
}) {
  const handleSortDirectionChange = (e) => {
    const sortDirection = e.target.value;
    if (sortDirection === 'false') {
      setIsSortAscending(false);
    } else {
      setIsSortAscending(true);
    }
  };

  return (
    <form className="viewForm">
      <div className="filterOption">
        <label htmlFor="sortBy">Sort by: </label>
        <select
          name="sortBy"
          id="sortBy"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="baseName">Product Name</option>
          <option value="price">Price</option>
        </select>
      </div>
      <div className="filterOption">
        <label htmlFor="sortDirection">Direction: </label>
        <select
          name="sortDirection"
          id="sortDirection"
          value={isSortAscending}
          onChange={handleSortDirectionChange}
        >
          <option value={true}>Ascending</option>
          <option value={false}>Descending</option>
        </select>
      </div>
    </form>
  );
}

export default ProductViewForm;
