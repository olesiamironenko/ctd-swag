import { useEffect, useState } from 'react';
import './App.css';
import './assets/css-reset.css';
import AuthDialog from './features/Auth/AuthDialog';
import Cart from './features/Cart/Cart';
import Footer from './layout/Footer';
import Header from './layout/Header';
import ProductList from './features/ProductList/ProductList';

const baseUrl = import.meta.env.VITE_API_BASE_URL;
function App() {
  const [inventory, setInventory] = useState([]);
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAuthDialogOpen, setIsAuthDialogOpen] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [user, setUser] = useState({});
  const [authError, setAuthError] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);

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
      setIsAuthDialogOpen(false);
    } catch (error) {
      setIsAuthenticating(false);
      console.log(error.message);
    }
  }

  async function handleRegister(user) {
    const options = {
      method: 'POST',
      body: JSON.stringify(user),
      headers: { 'Content-Type': 'application/json' },
    };
    try {
      setIsAuthenticating(true);
      const resp = await fetch(`${baseUrl}/auth/register`, options);
      console.log(resp);
      if (!resp.ok) {
        setAuthError('failed to create new user account');
        throw new Error(resp.status);
      }
      const userData = await resp.json();
      setUser({
        id: userData.id,
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
        token: userData.token,
      });
      setAuthError('');
      setIsAuthenticating(false);
      setIsAuthDialogOpen(false);
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

  function handleOpenAuthDialog(option) {
    switch (option) {
      case 'register':
        setIsRegistering(true);
        break;
      default:
        setIsRegistering(false);
        break;
    }
    setIsAuthDialogOpen(true);
  }

  return (
    <>
      <Header
        cart={cart}
        handleOpenCart={() => setIsCartOpen(true)}
        handleOpenAuthDialog={handleOpenAuthDialog}
        handleLogOut={handleLogOut}
        user={user}
      />
      <main>
        {isAuthDialogOpen && (
          <AuthDialog
            handleCloseAuthDialog={() => setIsAuthDialogOpen(false)}
            handleAuthenticate={handleAuthenticate}
            handleRegister={handleRegister}
            authError={authError}
            isAuthenticating={isAuthenticating}
            isRegistering={isRegistering}
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
