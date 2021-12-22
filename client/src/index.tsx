import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import ReactDOM from 'react-dom';
import './index.css';
import AuthComponent from './components/Authentication/AuthComponent';

ReactDOM.render(
  <BrowserRouter>
    <AuthComponent />
  </BrowserRouter>,
  document.getElementById('root'),
);
