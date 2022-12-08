import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { UserContextProvider } from './helpers/ContextInfo';
import { reducer } from './helpers/reducer';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <UserContextProvider reducer={reducer}>
      <App />
    </UserContextProvider>
  </React.StrictMode>
);
