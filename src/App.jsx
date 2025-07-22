import React, { useState } from 'react';
import ctdLogo from './assets/icons/mono-blue-logo.svg';
import './App.css';
import inventoryData from './assets/inventory.json';

//without destructuring
function ProductList(props) {
  const inventory = props.inventory;
  return (
    <ul>
      {inventory.map((item) => {
        return <li key={item.id}>{item.baseName}</li>;
      })}
    </ul>
  );
}

function App() {
  const [inventory, setInventory] = useState(inventoryData.inventory);
  return (
    <main>
      <div className="coming-soon">
        <h1>CTD Swag</h1>
        <div>
          <img
            src={ctdLogo}
            alt="Code The Dream Logo"
            style={{ height: 100, width: 100 }}
          />
        </div>
      </div>
      <ProductList inventory={inventory} />
    </main>
  );
}

export default App;
