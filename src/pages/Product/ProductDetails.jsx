import { useParams } from 'react-router';
import placeholder from '../../assets/placeholder.png';

const ProductDetail = ({ inventory, handleAddItemToCart }) => {
  const { id } = useParams();

  const [product] = inventory.filter((product) => {
    return product.id === parseInt(id);
  });

  return (
    <div>
      {product ? (
        <>
          <h2>{product.baseName}</h2>
          <img src={placeholder} alt="" />
          <p>{product.baseDescription}</p>
        </>
      ) : (
        <h2>Nothing Found</h2>
      )}
    </div>
  );
};

export default ProductDetail;
