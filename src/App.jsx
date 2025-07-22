import React, { useState } from 'react';
import ctdLogo from './assets/icons/mono-blue-logo.svg';
import './App.css';
import inventoryData from './assets/inventory.json';

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
      <ul>
        {inventory.map((item) => {
          return (
            <li key={item.id}>
              <div className="itemCard">
                <h2>{item.baseName}</h2>
                <p>{item.baseDescription}</p>
              </div>
            </li>
          );
        })}
      </ul>
    </main>
  );
}

export default App;
