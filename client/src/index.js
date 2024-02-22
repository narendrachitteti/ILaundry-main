import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import "./input.css"
import App from './App';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import authReducer from './Redux/Reducer/authReducer';
const store=createStore(authReducer);
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <App />
    </Provider>
);

