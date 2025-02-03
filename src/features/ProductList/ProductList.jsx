import ProductCard from './ProductCard';

function ProductList({ products, handleAddItemToCart }) {
  return (
    <ul className="productList">
      {products.map((product) => {
        return (
          <ProductCard
            product={product}
            key={product.baseName}
            handleAddItemToCart={handleAddItemToCart}
          />
        );
      })}
    </ul>
  );
}

export default ProductList;
