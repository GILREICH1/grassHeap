import { useAuth0 } from '@auth0/auth0-react';

const LogoutButton = (): JSX.Element => {
  const { logout } = useAuth0();
  return (
    <button
      className="btn btn-danger btn-block"
      onClick={() =>
        logout({
          returnTo: window.location.origin,
        })
      }>
      Log Out
    </button>
  );
};

export default LogoutButton;
