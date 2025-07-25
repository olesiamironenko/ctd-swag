import ProductCard from './ProductCard';

//with destructuring
function ProductList({ inventory = [], children, handleAddItemToCart }) {
  //destructuring assignment grabs `inventory` out of props
  //we're also setting a default value og `inventory` to an empty array
  return (
    <ul>
      {children}{' '}
      {/* this location guarantees that this list item will be first */}
      {inventory.map((item) => {
        return (
          <ProductCard
            key={item.id}
            id={item.id}
            baseName={item.baseName}
            baseDescription={item.baseDescription}
            handleAddItemToCart={handleAddItemToCart}
          />
        );
      })}
    </ul>
  );
}

export default ProductList;
