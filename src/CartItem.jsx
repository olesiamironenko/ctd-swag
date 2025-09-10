import ProductImage from './ProductImage';

function CartItem({ item, handleUpdateField }) {
  return (
    <li className="cartListItem" key={item.id}>
      <ProductImage
        src={item.image}
        alt={item.baseName}
        className="productImage"
      />
      <h2>{item.baseName}</h2>
      {item.variantName !== 'Default' ? <p>{item.variantName}</p> : null}
      <div className="cartListItemSubtotal">
        <label>
          Count:
          <input
            type="number"
            value={item.itemCount}
            onChange={(event) => handleUpdateField({ event, id: item.id })}
          />
        </label>
        <p>Subtotal: ${(item.price * item.itemCount).toFixed(2) || 0}</p>
      </div>
    </li>
  );
}

export default CartItem;
