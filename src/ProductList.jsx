import { useState, useEffect } from 'react';
import ProductCard from './ProductCard';

//with destructuring
function ProductList({ inventory = [], children, handleAddItemToCart }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const workingProducts = [];
    inventory.forEach((item) => {
      if (!item.inStock) {
        return;
      }
      if (
        !workingProducts.find(
          (productItem) => productItem.baseName === item.baseName
        )
      ) {
        workingProducts.push({
          baseName: item.baseName,
          price: item.price,
          baseDescription: item.baseDescription,
          variants: [{ ...item }],
        });
      } else {
        const index = workingProducts.findIndex(
          (productItem) => productItem.baseName === item.baseName
        );
        workingProducts[index].variants.push({ ...item });
      }
    });
    setProducts([...workingProducts]);
  }, [inventory]);

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
