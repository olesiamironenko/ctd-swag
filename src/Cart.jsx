import placeholder from './assets/placeholder.png';

// `handleCloseCart` is not made yet but we know we will need it
function Cart({ cart, handleCloseCart }) {
  function getCartPrice() {
    // using `.toFixed` because floating point arithmetic
    // introduces suprising rounding issues
    // eg: `console.log(.99 + .99 +.99)` will print 2.9699999999999998
    return cart
      .reduce((acc, item) => acc + item.price * item.itemCount, 0)
      .toFixed(2);
  }

  return (
    <>
      <div className="cartScreen"></div>
      {/* .cartScreen covers the product list with a div that has a blur effect placed on it. this makes the product buttons unclickable */}
      <div className="cartListWrapper">
        {cart.length === 0 ? (
          <p>cart is empty</p>
        ) : (
          <ul className="cartList">
            {cart.map((item) => {
              return (
                <li className="cartListItem" key={item.cartItemId}>
                  <img src={placeholder} alt="" />
                  <h2>{item.baseName}</h2>
                  <div className="cartListItemSubtotal">
                    <p>Count: {item.itemCount}</p>
                    <p>Subtotal: ${(item.price * item.itemCount).toFixed(2)}</p>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
        {/* cart total will need to be calculated */}
        <h2>Cart Total: ${getCartPrice()}</h2>
        <button onClick={handleCloseCart}>CloseCart</button>
      </div>
    </>
  );
}

export default Cart;
