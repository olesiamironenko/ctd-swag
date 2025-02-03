import ProductViewForm from '../../features/ProductViewForm/ProductViewForm';
import ProductList from '../../features/ProductList/ProductList';

function Shop({
  filteredProducts,
  handleAddItemToCart,
  setSortBy,
  setIsSortAscending,
  sortBy,
  isSortAscending,
  searchTerm,
  setSearchTerm,
}) {
  return (
    <>
      <ProductViewForm
        setSortBy={setSortBy}
        setIsSortAscending={setIsSortAscending}
        sortBy={sortBy}
        isSortAscending={isSortAscending}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />
      <ProductList
        products={filteredProducts}
        handleAddItemToCart={handleAddItemToCart}
      />
    </>
  );
}

export default Shop;
