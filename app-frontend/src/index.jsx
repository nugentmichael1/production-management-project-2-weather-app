import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import Navbar from './Components/Navigation/Navbar';
import { AuthProvider } from './context/AuthContext';

import { GoogleOAuthProvider } from "@react-oauth/google";

const clientId = process.env.REACT_APP_CLIENT_ID;

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <BrowserRouter>
    <AuthProvider>
      <GoogleOAuthProvider clientId={clientId}>
        <Navbar />
        <App />
      </GoogleOAuthProvider>
    </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
