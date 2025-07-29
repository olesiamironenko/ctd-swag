import placeholder from './assets/placeholder.png';

// `handleCloseCart` is not made yet but we know we will need it
function Cart({ cart, handleCloseCart }) {
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
                    <p>${item.price}</p>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
        {/* cart total will need to be calculated */}
        <h2>Cart Total: $0.00</h2>
        <button onClick={handleCloseCart}>CloseCart</button>
      </div>
    </>
  );
}

export default Cart;
