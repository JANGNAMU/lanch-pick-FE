import React from 'react';
import ReactDOM from 'react-dom';
// import ReactDOM from 'react-dom/client';

import './index.css';
import App from './app';
import reportWebVitals from './reportWebVitals';

// const root = document.getElementById('root');
// ReactDOM.render(React.createElement('div'), root);

// root.render(
//   // use strict
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );


ReactDOM.render(
  <>
    <App />
  </>, document.getElementById('root')
)

reportWebVitals();
