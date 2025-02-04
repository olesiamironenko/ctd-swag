import styles from './ProductDetailsCard.module.css';
import placeholder from '../../assets/placeholder.png';

function ProductDetailsCard({ product, handleAddItemToCart }) {
  return (
    <div className={styles.variant}>
      <div className={styles.preview}>
        <img
          className={styles.baseImage}
          src={placeholder}
          alt="product preview placeholder"
        />
      </div>
      <div className={styles.variantDetails}>
        {product.variantName !== 'Default' && (
          <h4>
            {product.variantName} {product.baseName}
          </h4>
        )}
        <p>{product.variantDescription}</p>
        <p>${product.price.toFixed(2) || '0.00'}</p>
        <div className="buttonGroup">
          <button onClick={() => handleAddItemToCart(product.id)}>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetailsCard;
