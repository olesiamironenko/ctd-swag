import { useState } from 'react';
import spinner from '../../assets/icons/spinner.svg';
import ctdLogo from '../../assets/icons/mono-blue-logo.svg';

function AuthForm({
  handleCloseAuthForm,
  handleAuthenticate,
  isAuthenticating,
  authError,
  dismissAuthError,
}) {
  const [email, setEmail] = useState('dev@test.com');
  const [password, setPassword] = useState('password123');

  function handleSubmit(e) {
    e.preventDefault();
    handleAuthenticate({ email, password });
  }
  return (
    <>
      <div className="authFormScreen"></div>
      {isAuthenticating ? (
        <div className="loadingScreen">
          <div className="spinnerWrapper">
            <img src={spinner} alt="code the dream logo" />
          </div>
          <p>Logging into CTD Swag...</p>
        </div>
      ) : (
        <form className="authForm">
          <div className="siteBranding">
            <img src={ctdLogo} alt="Code The Dream Logo" />
            <h2>Log in to CTD Swag</h2>
          </div>
          <div className="inputGroup">
            <label htmlFor="email">Email</label>
            <input
              autoComplete="off"
              type="text"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="inputGroup">
            <label htmlFor="password">Password</label>
            <input
              autoComplete="off"
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="authButtons">
            <button
              disabled={!email || !password}
              type="button"
              onClick={handleSubmit}
            >
              Submit
            </button>
            <button type="button" onClick={handleCloseAuthForm}>
              Cancel
            </button>
          </div>
          {authError && (
            <div className="authErrorMessage" onClick={dismissAuthError}>
              <p>{authError}</p>
            </div>
          )}
        </form>
      )}
    </>
  );
}
export default AuthForm;
