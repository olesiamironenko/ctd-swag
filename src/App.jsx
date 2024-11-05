import { useEffect, useRef, useState } from 'react';
import './App.css';
import './assets/css-reset.css';
import catalog from './assets/catalog.json';
import Cart from './Cart';
import Header from './Header';
import ProductList from './ProductList';

function App() {
  const [inventory, setInventory] = useState([]);
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const year = useRef(
    (() => {
      const now = new Date(Date.now());
      return now.getFullYear();
    })()
  );

  useEffect(() => {
    setInventory([...catalog.products]);
  }, []);

  function handleAddItemToCart(id) {
    const target = inventory.find((item) => item.id === id);
    if (!target) {
      console.error('cart error: item not found');
      return;
    }
    const cartItem = { ...target, cartItemId: Date.now() };
    setCart([...cart, cartItem]);
  }
  function handleRemoveItemFromCart(cartItemId) {
    const updatedCart = cart.filter((item) => item.cartItemId !== cartItemId);
    setCart([...updatedCart]);
  }

  function handleCloseCart() {
    //prevents re-render if unchanged
    if (isCartOpen) {
      setIsCartOpen(false);
    }
  }

  function handleOpenCart() {
    //prevents re-render if unchanged
    if (!isCartOpen) {
      setIsCartOpen(true);
    }
  }

  return (
    <>
      <Header cart={cart} handleOpenCart={handleOpenCart} />
      <main>
        <ProductList
          inventory={inventory}
          handleAddItemToCart={handleAddItemToCart}
        ></ProductList>
        {isCartOpen && <Cart cart={cart} handleCloseCart={handleCloseCart} />}
      </main>
      <footer>
        <p>
          Made with ❤️ | &copy; {year.current}{' '}
          <a href="https://codethedream.org/">CTD </a>
        </p>
      </footer>
    </>
  );
}

export default App;
