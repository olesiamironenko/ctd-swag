import React, { useState } from 'react';
import Header from './Header.jsx';
import inventoryData from './assets/inventory.json';
import ProductList from './ProductList';
import ProductCard from './ProductCard';
import './App.css';

function App() {
  const [inventory, setInventory] = useState(inventoryData.inventory);

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
      <ProductList inventory={inventory}>{promoteItem()}</ProductList>
    </main>
  );
}

export default App;
