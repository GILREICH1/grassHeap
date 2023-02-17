import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import ReactDOM from 'react-dom';
import './index.css';
import Auth0ProviderWithHistory from './auth/auth0-provider-with-history';
import App from './components/App/App';
import UserContext from './components/Authentication/UserContext';
import { CssVarsProvider } from '@mui/joy';

ReactDOM.render(
  <BrowserRouter>
    <Auth0ProviderWithHistory>
      <CssVarsProvider>
        <UserContext>
          <App />
        </UserContext>
      </CssVarsProvider>
    </Auth0ProviderWithHistory>
  </BrowserRouter>,
  document.getElementById('root'),
);
