import App from '../App/App';
import Auth0ProviderWithHistory from '../../auth/auth0-provider-with-history';

const AuthComponent = (): JSX.Element => {
  return (
    <Auth0ProviderWithHistory>
      <App />
    </Auth0ProviderWithHistory>
  );
};

export default AuthComponent;
