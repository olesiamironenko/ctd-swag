import { useEffect, useRef, useState } from 'react';
import './App.css';
import './assets/css-reset.css';
import catalog from './assets/catalog.json';
import Header from './Header';
import ProductList from './ProductList';
import ProductCard from './ProductCard';

function App() {
  const [inventory, setInventory] = useState([]);
  const [cart, setCart] = useState([]);
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

  return (
    <>
      <Header cart={cart} />
      <main>
        <ProductList
          inventory={inventory}
          handleAddItemToCart={handleAddItemToCart}
        ></ProductList>
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
