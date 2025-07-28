import React, { useState, useEffect } from 'react';
import './App.css';
import inventoryData from './assets/inventory.json';
import Header from './Header.jsx';
import ProductList from './ProductList';

function App() {
  const [inventory, setInventory] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    setInventory([...inventoryData.inventory]);
  }, []);

  function handleAddItemToCart(id) {
    const target = inventory.find((item) => item.id === id);
    //if no inventory items are found
    //we want to prevent the app from crashing
    //by exiting this function now
    if (!target) {
      console.error('cart error: item not found');
      return;
    }
    //create an new object, spread the contents of the item selected
    //and add a `cartItemId`
    const cartItem = { ...target, cartItemId: Date.now() };
    console.log(cartItem);
    setCart([...cart, cartItem]);
  }

  function removeItemFromCart(id) {
    const updatedCart = cart.filter((item) => item.id !== id);
    setCart([...updatedCart]);
  }

  return (
    <main>
      <Header cart={cart} />
      <ProductList
        inventory={inventory}
        handleAddItemToCart={handleAddItemToCart}
      />
    </main>
  );
}

export default App;
