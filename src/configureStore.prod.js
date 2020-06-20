/*
 * @file: configureStore.prod.js
 * @description: Configure redux store for production
 * @author: Megha Sethi
 * */
import { applyMiddleware, createStore, compose } from 'redux';
import { persistStore } from 'redux-persist';
import thunk from 'redux-thunk';
import { routerMiddleware } from 'react-router-redux';
import reducer from './reducers';

export default history => {
  const store = createStore(reducer, compose(applyMiddleware(thunk, routerMiddleware(history))));
  const persistor = persistStore(store);
  return { persistor, store };
};