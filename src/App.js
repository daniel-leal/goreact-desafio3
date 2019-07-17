import React from 'react';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';

import './config/ReactotronConfig';

import store from './store';

import Routes from './routes';

import 'react-toastify/dist/ReactToastify.css';
import 'font-awesome/css/font-awesome.css';

const App = () => (
  <Provider store={store}>
    <Routes />
    <ToastContainer autoClose={5000} />
  </Provider>
);

export default App;
