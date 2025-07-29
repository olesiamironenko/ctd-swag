import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import inventoryData from './assets/inventory.json';
import Header from './Header.jsx';
import ProductList from './ProductList';
import Cart from './Cart';

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
    setInventory([...inventoryData.inventory]);
  }, []);

  function handleAddItemToCart(id) {
    const inventoryItem = inventory.find((item) => item.id === id);
    //if no inventory items are found
    //we want to prevent the app from crashing
    //by exiting this function now
    if (!inventoryItem) {
      console.error('cart error: item not found');
      return;
    }
    //create an new object, spread the contents of the item selected
    //and add a `cartItemId`
    const itemToUpdate = cart.find((item) => item.id === id);
    let updatedCartItem;
    if (itemToUpdate) {
      updatedCartItem = {
        ...itemToUpdate,
        itemCount: itemToUpdate.itemCount + 1,
      };
    } else {
      updatedCartItem = { ...inventoryItem, itemCount: 1 };
    }
    setCart([...cart.filter((item) => item.id !== id), updatedCartItem]);
  }

  function removeItemFromCart(id) {
    const updatedCart = cart.filter((item) => item.id !== id);
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
      <main>
        <Header cart={cart} handleOpenCart={handleOpenCart} />
        <ProductList
          inventory={inventory}
          handleAddItemToCart={handleAddItemToCart}
        />
        {/*`isCartOpen has to be true for the cart to be rendered*/}
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
