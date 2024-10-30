import { useRef, useState } from 'react';
import './App.css';
import './assets/css-reset.css';
import catalog from './assets/catalog.json';
import Header from './Header';
import ProductList from './ProductList';
import ProductCard from './ProductCard';

function App() {
  const [inventory, setInventory] = useState(catalog.products);
  const [cart, setCart] = useState([]);
  const year = useRef(
    (() => {
      const now = new Date(Date.now());
      return now.getFullYear();
    })()
  );

  function promoteProduct() {
    return (
      <ProductCard
        name="Special Limited Edition Tee!"
        description="Special limited edition neon green shirt with a metallic Code the Dream Logo shinier than the latest front-end framework! Signed by the legendary Frank!"
      />
    );
  }
  return (
    <>
      <Header cart={cart} />
      <main>
        <ProductList inventory={inventory}>{promoteProduct()}</ProductList>
      </main>
      <footer>
        <p>
          Made with ❤️ | &copy; {year.current}{' '}
          <a href="https://codethedream.org/">CTD </a>
        </p>
      </footer>
    </>
  );
}

export default App;
