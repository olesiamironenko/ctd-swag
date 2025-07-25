import ctdLogo from './assets/icons/mono-blue-logo.svg';
import { useEffect } from 'react';
import shoppingCart from './assets/icons/shoppingCart.svg';

function Header({ cart }) {
  useEffect(() => {
    cart.forEach((item) => {
      console.log(item.baseName, item.cartItemId);
    });
    if (cart.length > 0) {
      console.log(cart.length);
      console.log('--end of cart--');
    }
  }, [cart]);

  return (
    <div className="coming-soon">
      <h1>CTD Swag</h1>
      <div>
        <img
          src={ctdLogo}
          alt="Code The Dream Logo"
          style={{ height: 100, width: 100 }}
        />
      </div>
      <div className="shoppingCart">
        <button type="button">
          <img src={shoppingCart} alt="" />
          <p>{cart.length}</p>
        </button>
      </div>
    </div>
  );
}

export default Header;
