import { useCallback, useEffect, useReducer, useState } from 'react';
import './App.css';
import './assets/css-reset.css';
import AuthDialog from './features/Auth/AuthDialog';
import Cart from './features/Cart/Cart';
import Footer from './layout/Footer';
import Header from './layout/Header';
import ProductList from './features/ProductList/ProductList';
import Dialog from './shared/Dialog';
import ProductViewForm from './features/ProductViewForm/ProductViewForm';
import {
  initialState as cartInitialState,
  cartActions,
  cartReducer,
} from './reducers/App/cart.reducer';

function sortByBaseName({ productItems, isSortAscending }) {
  return productItems.toSorted((a, b) => {
    const baseNameA = a.baseName.toLowerCase();
    const baseNameB = b.baseName.toLowerCase();
    if (baseNameA > baseNameB) {
      if (isSortAscending) {
        return 1;
      } else {
        return -1;
      }
    }
    if (baseNameA < baseNameB) {
      if (isSortAscending) {
        return -1;
      } else {
        return 1;
      }
    }
    return 0;
  });
}

function sortByPrice({ productItems, isSortAscending }) {
  return productItems.toSorted((a, b) => {
    if (isSortAscending) {
      return a.price - b.price;
    } else {
      return b.price - a.price;
    }
  });
}

function filterByQuery({ productItems, searchTerm }) {
  const term = searchTerm.toLowerCase();
  if (term === '') {
    return productItems;
  }
  return productItems.filter((item) => {
    if (item.baseName.toLowerCase().includes(term)) {
      return item;
    } else if (item.baseDescription.toLowerCase().includes(term)) {
      return item;
    } else if (item.variantDescription.toLowerCase().includes(term)) {
      return item;
    }
  });
}

const baseUrl = import.meta.env.VITE_API_BASE_URL;
function App() {
  const [inventory, setInventory] = useState([]);
  const [filteredInventory, setFilteredInventory] = useState([]);
  const [isAuthDialogOpen, setIsAuthDialogOpen] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [user, setUser] = useState({});
  const [authError, setAuthError] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const [isSortAscending, setIsSortAscending] = useState(true);
  const [sortBy, setSortBy] = useState('baseName');
  const [searchTerm, setSearchTerm] = useState('');

  //reducers
  const [cartState, dispatch] = useReducer(cartReducer, cartInitialState);

  useEffect(() => {
    (async () => {
      try {
        const resp = await fetch(`${baseUrl}/products`);
        if (!resp.ok) {
          throw new Error(resp.status);
        }
        const products = await resp.json();
        const sortedProducts = sortByBaseName({
          productItems: products,
          isSortAscending: true,
        });
        setInventory([...sortedProducts]);
        setFilteredInventory([...sortedProducts]);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  useEffect(() => {
    if (sortBy === 'baseName') {
      setFilteredInventory((previous) =>
        sortByBaseName({ productItems: previous, isSortAscending })
      );
    } else {
      setFilteredInventory((previous) =>
        sortByPrice({ productItems: previous, isSortAscending })
      );
    }
  }, [isSortAscending, sortBy]);

  useEffect(() => {
    setFilteredInventory(
      filterByQuery({ productItems: inventory, searchTerm })
    );
  }, [searchTerm, inventory]);

  const handleSyncCart = useCallback(
    async (workingCart) => {
      if (!user.id) {
        dispatch({ type: cartActions.updateCart, cart: workingCart });
        return;
      }
      dispatch({ type: cartActions.sync });
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
        }
        const cartData = await resp.json();
        if (cartData.error) {
          throw new Error(cartData.error);
        }
        dispatch({ type: cartActions.updateCart, cart: cartData });
      } catch (error) {
        console.error(error);
        dispatch({ type: cartActions.error, error: error.message });
      } finally {
        dispatch({ type: cartActions.notSyncing });
      }
    },
    [user.id, user.token, dispatch]
  );

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
      dispatch({
        type: cartActions.updateCart,
        cart: userData.cartItems,
      });
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
    } catch (error) {
      console.log(error.message);
    } finally {
      setIsAuthenticating(false);
    }
  }

  //START
  async function handleAddItemToCart(id) {
    //exit out of function to prevent anon fetches
    dispatch({ type: cartActions.addItem, id, inventory });
    if (!user.id) {
      return;
    }
  }

  function handleCloseCart() {
    dispatch({ type: cartActions.close });
    setAuthError('');
  }

  function handleLogOut() {
    dispatch({ type: cartActions.reset });
    setUser({});
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

  function handleCloseDialog() {
    setIsDialogOpen(false);
    dispatch({ type: cartActions.dismissError });
  }

  return (
    <>
      {isDialogOpen && (
        <Dialog
          message={cartState.error}
          handleCloseDialog={handleCloseDialog}
        />
      )}
      <Header
        cart={cartState.cart}
        handleOpenCart={() => dispatch({ type: cartActions.open })}
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
        <ProductViewForm
          setSortBy={setSortBy}
          setIsSortAscending={setIsSortAscending}
          setBy={sortBy}
          isSortAscending={isSortAscending}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />
        <ProductList
          inventory={filteredInventory}
          handleAddItemToCart={handleAddItemToCart}
        ></ProductList>
        {cartState.isCartOpen && (
          <Cart
            cartError={cartState.error}
            isCartSyncing={cartState.isCartSyncing}
            cart={cartState.cart}
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
