import ctdLogo from './assets/mono-blue-logo.svg';

function Header() {
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
    </div>
  );
}

export default Header;
