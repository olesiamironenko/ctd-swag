import placeholder from './assets/placeholder.png';

function Cart({ cart, handleCloseCart }) {
  function getCartPrice() {
    // floating point arethmetic cannot fully represent normal
    // math and introduces suprising rounding issues.
    // eg: .99 + .99 +.99 === 2.9699999999999998;
    // teams would normally use a mathematics or a currency library in
    // a live application because money is a bad thing to get wrong
    return cart
      .reduce((acc, item) => acc + item.price * item.itemCount, 0)
      .toFixed(2);
  }

  return (
    <div className="cartListWrapper">
      {cart.length === 0 ? (
        <p>cart is empty</p>
      ) : (
        <ul className="cartList">
          {cart.map((item) => {
            return (
              <li className="cartListItem" key={item.id}>
                <img src={placeholder} alt="" />
                <h2>{item.name}</h2>
                <div className="cartListItemSubtotal">
                  <p>Count: {item.itemCount}</p>
                  <p>Subtotal: ${(item.price * item.itemCount).toFixed(2)}</p>
                </div>
              </li>
            );
          })}
        </ul>
      )}
      <h2>Cart Total: ${getCartPrice()}</h2>
      <button onClick={handleCloseCart}>CloseCart</button>
    </div>
  );
}

export default Cart;
