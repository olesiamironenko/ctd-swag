import ctdLogo from './assets/icons/mono-blue-logo.svg';
import './App.css';

function App() {
  return (
    <div className="coming-soon">
      <h1>CTD Swag</h1>
      <div>
        <img
          src={ctdLogo}
          alt="Code The Dream Logo"
          style={{ height: 100, width: 100 }}
        />
      </div>
      <h2>Coming Soon...</h2>
    </div>
  );
}

export default App;
