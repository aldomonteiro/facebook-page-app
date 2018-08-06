import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import authReducer from '../reducers/auth';
import pagesReducer from '../reducers/pages';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
  const store = createStore(
    combineReducers({
      user: authReducer,
      pages: pagesReducer
    }),
    composeEnhancers(applyMiddleware(thunk))
  );

  return store;
};
