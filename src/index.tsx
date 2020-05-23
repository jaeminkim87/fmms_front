import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {createGlobalStyle} from "styled-components";

const GlobalStyle = createGlobalStyle`
  html, body, #root {
    width: 100%;
    height: 100%;
  }
  
  #root {
    display: flex
  }
`;

ReactDOM.render(
  <React.StrictMode>
    <GlobalStyle/>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);