import { useAuth0 } from '@auth0/auth0-react';

const LoginButton = (): JSX.Element => {
  const { loginWithRedirect } = useAuth0();
  return (
    <button
      className="NavLink navElement btn btn-primary btn-block"
      onClick={() => loginWithRedirect()}>
      Log In 📥
    </button>
  );
};

export default LoginButton;
