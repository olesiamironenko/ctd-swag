import placeholder from '../../assets/placeholder.png';

function CartItem({ item, onHandleItemUpdate }) {
  return (
    <li className="cartListItem">
      <img src={placeholder} alt="" />
      <div className="cartListItemDetails">
        <h2>{item.baseName}</h2>
        {item.variantName !== 'Default' ? <p>{item.variantName}</p> : null}
      </div>
      <div className="cartListItemSubtotal">
        <label>
          Count:{' '}
          <input
            type="number"
            value={item.quantity}
            onChange={(event) => onHandleItemUpdate({ event, id: item.id })}
          />
        </label>
        <p>Subtotal: ${(item.price * item.quantity).toFixed(2) || '0.00'}</p>
      </div>
    </li>
  );
}

export default CartItem;
