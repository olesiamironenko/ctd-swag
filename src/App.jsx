import React, { useState, useEffect } from 'react';
import Header from './Header.jsx';
import inventoryData from './assets/inventory.json';
import ProductList from './ProductList';
import ProductCard from './ProductCard';
import './App.css';

function App() {
  const [inventory, setInventory] = useState([]);
  useEffect(() => {
    setInventory([...inventoryData.inventory]);
  }, []);

  const [cart, setCart] = useState([]);
  function addItemToCart(item) {
    setCart([...cart, item]);
  }

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

  function promoteItem() {
    return (
      <ProductCard
        baseName="Limited Edition Tee!"
        baseDescription="Special limited edition neon green shirt with a metallic Code the Dream Logo shinier than the latest front-end framework! Signed by the legendary Frank!"
      />
    );
  }

  return (
    <main>
      <Header />
      <ProductList
        inventory={inventory}
        handleAddItemToCart={handleAddItemToCart}
      ></ProductList>
    </main>
  );
}

export default App;
