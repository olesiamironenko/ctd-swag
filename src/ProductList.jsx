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
            name={item.baseName}
            description={item.baseDescription}
          />
        );
      })}
    </ul>
  );
}

export default ProductList;
