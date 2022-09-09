/* Importing the React library. */
import React from 'react';

/* Importing the client side of the react-dom library. */
import ReactDOM from 'react-dom/client';

/* Importing the index.css file. */
import './index.css';

/* Importing the App.js file. */
import App from './App';

/* Importing the ant design css file. */
import 'antd/dist/antd.css'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
