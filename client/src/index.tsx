import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App/App';
import { QueryClient, QueryClientProvider } from 'react-query';

const reactQueryClient = new QueryClient();

ReactDOM.render(
  <BrowserRouter>
    <QueryClientProvider client={reactQueryClient}>
      <App />
    </QueryClientProvider>
  </BrowserRouter>,
  document.getElementById('root'),
);
