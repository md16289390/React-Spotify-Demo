/*
 * @file: Root.js
 * @description: Configure Root component having root of the application by providing all providers to the application 
 * @author: Megha Sethi
 * */
import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { createBrowserHistory } from 'history';
import { PersistGate } from 'redux-persist/es/integration/react';
import App from "./App";
import configureStore from "./configureStore";
import Loader from './Components/Loader';

require('dotenv').config();

export const history = createBrowserHistory();
const { persistor, store } = configureStore(history);

function Root() {
  return (
    <Provider store={store}>
      <PersistGate loading={<Loader />} persistor={persistor}>
          <Router history={history}>
              <App />
          </Router>
        </PersistGate>
    </Provider>
  );
}

export default Root;
