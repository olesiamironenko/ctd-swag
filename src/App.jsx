import React, { useState } from 'react';
import Header from './Header.jsx';
import inventoryData from './assets/inventory.json';
import ProductList from './ProductList';
import './App.css';

function App() {
  const [inventory, setInventory] = useState(inventoryData.inventory);

  return (
    <main>
      <Header />
      <ProductList inventory={inventory} />
    </main>
  );
}

export default App;
