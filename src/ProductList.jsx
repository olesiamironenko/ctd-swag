import ProductCard from './ProductCard';

function ProductList({ inventory, children }) {
  return (
    <ul className="productList">
      {children}
      {inventory.map((product) => {
        return (
          <ProductCard
            key={product.id}
            name={product.name}
            description={product.description}
          />
        );
      })}
    </ul>
  );
}

export default ProductList;
