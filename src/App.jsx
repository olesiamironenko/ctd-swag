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
  const [isCartSyncing, setIsCartSyncing] = useState(false);
  const [isAuthDialogOpen, setIsAuthDialogOpen] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [user, setUser] = useState({});
  const [authError, setAuthError] = useState('');
  const [cartError, setCartError] = useState('');

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
  async function handleSyncCart(workingCart) {
    if (!user.id) {
      setCart(workingCart);
      return;
    }
    setIsCartSyncing(true);
    const options = {
      method: 'PATCH',
      body: JSON.stringify({ cartItems: workingCart }),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.token}`,
      },
    };
    try {
      const resp = await fetch(`${baseUrl}/cart`, options);
      if (!resp.ok) {
        console.log('resp not okay');
        if (resp.status === 401) {
          throw new Error('Not authorized. Please log in.');
        }
        const cartData = await resp.json();
        if (cartData.error) {
          throw new Error(cartData.error);
        }
        throw new Error('Error occurred while syncing');
      }
      const cartData = await resp.json();
      setCart([...cartData]);

      //clean up state variables
      setIsCartSyncing(false);
      setCartError('');
    } catch (error) {
      setCartError(error.message);
      setIsCartSyncing(false);
    }
  }

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
    //TODO: if logged in, post item to /cart to upsert cartItem
    const inventoryItem = inventory.find((item) => item.id === id);
    if (!inventoryItem) {
      return;
    }
    const itemToUpdate = cart.find((item) => item.productId === id);
    let updatedCartItem;
    if (itemToUpdate) {
      updatedCartItem = {
        ...itemToUpdate,
        quantity: itemToUpdate.quantity + 1,
      };
    } else {
      updatedCartItem = {
        ...inventoryItem,
        quantity: 1,
        productId: inventoryItem.id,
      };
    }
    setCart([...cart.filter((item) => item.productId !== id), updatedCartItem]);
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
            cartError={cartError}
            isCartSyncing={isCartSyncing}
            cart={cart}
            handleSyncCart={handleSyncCart}
            handleCloseCart={handleCloseCart}
          />
        )}
      </main>
      <Footer />
    </>
  );
}

export default App;
