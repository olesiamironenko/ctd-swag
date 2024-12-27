import { useEffect, useState } from 'react';
import './App.css';
import './assets/css-reset.css';
import AuthForm from './features/Auth/AuthForm';
import Cart from './features/Cart/Cart';
import Footer from './layout/Footer';
import Header from './layout/Header';
import ProductList from './features/ProductList/ProductList';

const baseUrl = import.meta.env.VITE_API_BASE_URL;
function App() {
  const [inventory, setInventory] = useState([]);
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAuthFormOpen, setIsAuthFormOpen] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [user, setUser] = useState({});
  const [authError, setAuthError] = useState('');

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

  async function handleAuthenticate(credentials) {
    const options = {
      method: 'POST',
      body: JSON.stringify(credentials),
      headers: { 'Content-Type': 'application/json' },
    };
    try {
      setIsAuthenticating(true);
      const resp = await fetch(`${baseUrl}/auth/login`, options);
      if (!resp.ok) {
        if (resp.status === 401) {
          setAuthError('email or password incorrect');
        }
        throw new Error(resp.status);
      }
      const userData = await resp.json();
      setUser({ ...userData.user, token: userData.token });
      setCart([...userData.cartItems]);
      setAuthError('');
      setIsAuthenticating(false);
      setIsAuthFormOpen(false);
    } catch (error) {
      setIsAuthenticating(false);
      console.log(error.message);
    }
  }

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
        quantity: itemToUpdate.quantity + 1,
      };
    } else {
      updatedCartItem = { ...inventoryItem, quantity: 1 };
    }
    setCart([...cart.filter((item) => item.id !== id), updatedCartItem]);
  }

  function handleCloseCart() {
    setIsCartOpen(false);
    setAuthError('');
  }

  function handleLogOut() {
    setUser({});
    setCart([]);
  }

  return (
    <>
      <Header
        cart={cart}
        handleOpenCart={() => setIsCartOpen(true)}
        handleOpenAuthForm={() => setIsAuthFormOpen(true)}
        handleLogOut={handleLogOut}
        user={user}
      />
      <main>
        {isAuthFormOpen && (
          <AuthForm
            handleCloseAuthForm={() => setIsAuthFormOpen(false)}
            handleAuthenticate={handleAuthenticate}
            authError={authError}
            isAuthenticating={isAuthenticating}
            resetAuthError={() => setAuthError('')}
          />
        )}
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
