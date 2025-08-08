import { useState, useEffect } from 'react';
import placeholder from './assets/placeholder.png';
import CartItem from './CartItem';

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

  function handleUpdateField({ event, id }) {
    event.preventDefault();
    // prevent re-render if already dirty
    if (!isFormDirty) {
      setIsFormDirty(true);
    }
    const targetProduct = cart.find((item) => item.id === id);
    const targetIndex = cart.findIndex((item) => item.id === id);
    if (!targetProduct) {
      console.error('cart error: item not found');
      return;
    }
    //reject negative values or if user deletes value
    if (event.target.value < 0 || event.target.value === '') {
      return;
    }
    // create new object instead of updating old
    const updatedProduct = {
      ...targetProduct,
      itemCount: parseInt(event.target.value, 10),
    };
    //avoid re-ordering array when updating cart item
    setWorkingCart([
      ...workingCart.slice(0, targetIndex),
      updatedProduct,
      ...workingCart.slice(targetIndex + 1),
    ]);
  }

  function handleCancel(e) {
    e.preventDefault();
    setIsFormDirty(false);
    setWorkingCart([...cart]); // reset child to parent values
  }

  function handleConfirm(e) {
    e.preventDefault();
    setIsFormDirty(false);
    setCart([...workingCart]); // Push changes from child to parent
  }

  return (
    <>
      <div className="cartScreen"></div>
      <div className="cartListWrapper">
        {workingCart.length === 0 ? (
          <p>cart is empty</p>
        ) : (
          <ul className="cartList">
            {workingCart.map((item) => (
              <CartItem
                key={item.id}
                item={item}
                handleUpdateField={handleUpdateField}
                placeholder={placeholder}
              />
            ))}
          </ul>
        )}
        {isFormDirty && (
          <div>
            <button onClick={handleConfirm}>Confirm Update</button>
            <button onClick={handleCancel}>Cancel Update</button>
          </div>
        )}
        {/* cart total will need to be calculated */}
        <h2>Cart Total: ${getWorkingCartPrice() || 0}</h2>
        <button onClick={handleCloseCart}>CloseCart</button>
      </div>
    </>
  );
}

export default Cart;
