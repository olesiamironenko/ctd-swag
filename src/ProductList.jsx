import ProductCard from './ProductCard';

//with destructuring
function ProductList({ inventory = [] }) {
  //destructuring assignment grabs `inventory` out of props
  //we're also setting a default value og `inventory` to an empty array
  return (
    <ul>
      {inventory.map((item) => {
        return (
          <ProductCard
            key={item.id}
            baseName={item.baseName}
            baseDescription={item.baseDescription}
          />
        );
      })}
    </ul>
  );
}

export default ProductList;
