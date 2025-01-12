import placeholder from '../../assets/placeholder.png';
import styles from './CartItem.module.css';

function CartItem({ item, onHandleItemUpdate }) {
  return (
    <li className={styles.cartItem}>
      <img src={placeholder} alt="" />
      <div>
        <h2>{item.baseName}</h2>
        {item.variantName !== 'Default' ? <p>{item.variantName}</p> : null}
      </div>
      <div className={styles.subtotal}>
        <label>
          Count:{' '}
          <input
            type="number"
            value={item.quantity}
            onChange={(event) =>
              onHandleItemUpdate({ event, id: item.productId })
            }
          />
        </label>
        <p>Subtotal: ${(item.price * item.quantity).toFixed(2) || '0.00'}</p>
      </div>
    </li>
  );
}

export default CartItem;
