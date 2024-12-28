import spinner from '../../assets/icons/spinner.svg';
import AuthForm from './LoginForm';
import RegisterForm from './RegisterForm';
function AuthDialog({
  handleCloseAuthDialog,
  handleAuthenticate,
  isAuthenticating,
  authError,
  dismissAuthError,
  handleRegister,
  isRegistering,
}) {
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
      ) : isRegistering ? (
        <RegisterForm
          handleRegister={handleRegister}
          handleCloseAuthDialog={handleCloseAuthDialog}
          authError={authError}
          dismissAuthError={dismissAuthError}
        />
      ) : (
        <AuthForm
          handleAuthenticate={handleAuthenticate}
          handleCloseAuthDialog={handleCloseAuthDialog}
          authError={authError}
          dismissAuthError={dismissAuthError}
        />
      )}
    </>
  );
}
export default AuthDialog;
