import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import authReducer from '../reducers/auth';
import pagesReducer from '../reducers/pages';
import postsReducer from '../reducers/posts';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
  const store = createStore(
    combineReducers({
      user: authReducer,
      pages: pagesReducer,
      posts: postsReducer
    }),
    composeEnhancers(applyMiddleware(thunk))
  );

  return store;
};
