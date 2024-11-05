import placeholder from './assets/placeholder.png';

function Cart({ cart, handleCloseCart }) {
  function getCartPrice() {
    return cart.reduce((acc, item) => acc + item.price, 0);
  }

  return (
    <div className="cartListWrapper">
      {cart.length === 0 ? (
        <p>cart is empty</p>
      ) : (
        <ul className="cartList">
          {cart.map((item) => {
            return (
              <li className="cartListItem" key={item.cartItemId}>
                <img src={placeholder} alt="" />
                <h2>{item.name}</h2>
                <div className="cartListItemSubtotal">
                  <p>Count: 1 </p>
                  <p>Total: ${item.price}</p>
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
