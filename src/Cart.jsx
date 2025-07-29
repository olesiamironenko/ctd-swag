import { useState, useEffect } from 'react';
import placeholder from './assets/placeholder.png';

// `handleCloseCart` is not made yet but we know we will need it
function Cart({ cart, handleCloseCart }) {
  const [workingCart, setWorkingCart] = useState(cart);
  const [isFormDirty, setIsFormDirty] = useState(false);

  useEffect(() => {
    setWorkingCart(cart);
  }, [cart]);

  function getWorkingCartPrice() {
    // using `.toFixed` because floating point arithmetic
    // introduces suprising rounding issues
    // eg: `console.log(.99 + .99 +.99)` will print 2.9699999999999998
    return workingCart
      .reduce((acc, item) => acc + item.price * item.itemCount, 0)
      .toFixed(2);
  }

  function handleUpdateField() {}
  function handleCancel() {}

  return (
    <>
      <div className="cartScreen"></div>
      <div className="cartListWrapper">
        {workingCart.length === 0 ? (
          <p>cart is empty</p>
        ) : (
          <ul className="cartList">
            {workingCart.map((item) => {
              return (
                <li className="cartListItem" key={item.id}>
                  <img src={placeholder} alt="" />
                  <h2>{item.baseName}</h2>
                  {item.variantName !== 'Default' ? (
                    <p>{item.variantName}</p>
                  ) : null}
                  <div className="cartListItemSubtotal">
                    <label>
                      Count:
                      <input
                        type="number"
                        value={item.itemCount}
                        onChange={(event) =>
                          handleUpdateField({ event, id: item.id })
                        }
                      />
                    </label>
                    <p>
                      Subtotal: ${(item.price * item.itemCount).toFixed(2) || 0}
                    </p>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
        {/* cart total will need to be calculated */}
        <h2>Cart Total: ${getWorkingCartPrice() || 0}</h2>
        <button onClick={handleCloseCart}>CloseCart</button>
      </div>
    </>
  );
}

export default Cart;
