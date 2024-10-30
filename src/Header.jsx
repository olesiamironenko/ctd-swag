import ctdLogo from './assets/icons/mono-blue-logo.svg';
import shoppingCart from './assets/icons/shoppingCart.svg';

function Header({ cart }) {
  return (
    <header>
      <div className="siteBranding">
        <img src={ctdLogo} alt="Code The Dream Logo" />
        <h1>CTD Swag</h1>
      </div>
      <div className="shoppingCart">
        <button type="button">
          <img src={shoppingCart} alt="" />
          <p className="cartCount">{cart.length}</p>
        </button>
      </div>
    </header>
  );
}

export default Header;
