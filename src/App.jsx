import { useEffect, useState } from 'react';
import './App.css';
import './assets/css-reset.css';
import Cart from './features/Cart/Cart';
import Footer from './layout/Footer';
import Header from './layout/Header';
import ProductList from './features/ProductList/ProductList';

const baseUrl = import.meta.env.VITE_API_BASE_URL;

function App() {
  const [inventory, setInventory] = useState([]);
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const resp = await fetch(`${baseUrl}/products`);
        if (!resp.ok) {
          throw new Error(resp.status);
        }
        const products = await resp.json();
        setInventory([...products]);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  function handleAddItemToCart(id) {
    const inventoryItem = inventory.find((item) => item.id === id);
    if (!inventoryItem) {
      return;
    }
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
        {isCartOpen && (
          <Cart
            cart={cart}
            setCart={setCart}
            handleCloseCart={handleCloseCart}
          />
        )}
      </main>
      <Footer />
    </>
  );
}

export default App;
