import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.css';
import reportWebVitals from './reportWebVitals.js';
import Main from './components/Main.js';
import { AuthProvider } from 'react-auth-kit'

const root = ReactDOM.createRoot(document.getElementById('root'));


root.render(
  <React.StrictMode>
    <AuthProvider authType={'cookie'} authName={'_auth'} cookieDomain={window.location.hostname} cookieSecure={false}>
    <Main />
    </AuthProvider>

  </React.StrictMode>
);

reportWebVitals();
