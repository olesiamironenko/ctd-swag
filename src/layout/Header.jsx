import { useEffect, useState } from 'react';
import ctdLogo from '../assets/icons/mono-blue-logo.svg';
import shoppingCart from '../assets/icons/shoppingCart.svg';

function Header({
  cart,
  handleOpenCart,
  handleOpenAuthDialog,
  user,
  handleLogOut,
}) {
  const [cartCount, setCartCount] = useState(0);
  useEffect(() => {
    if (cart.length > 0) {
      setCartCount(
        cart.reduce((acc, item) => {
          return acc + item.quantity;
        }, 0)
      );
    } else {
      setCartCount(0);
    }
  }, [cart, user]);
  return (
    <header>
      <div className="siteBranding">
        <img src={ctdLogo} alt="Code The Dream Logo" />
        <h1>CTD Swag</h1>
      </div>
      <div className="userActions">
        {user.id ? (
          <>
            <span>Hi, {user.firstName}</span>
            <button className="authButton signOut" onClick={handleLogOut}>
              Sign out
            </button>
          </>
        ) : (
          <>
            <button
              className="authButton"
              type="button"
              onClick={() => handleOpenAuthDialog('login')}
            >
              Log in
            </button>
            <span> or </span>
            <button
              className="authButton"
              type="button"
              onClick={() => handleOpenAuthDialog('register')}
            >
              Register
            </button>
          </>
        )}
      </div>
      <div className="shoppingCart">
        <button type="button" onClick={handleOpenCart}>
          <img src={shoppingCart} alt="" />
          <p className="cartCount">{cartCount}</p>
        </button>
      </div>
    </header>
  );
}

export default Header;
