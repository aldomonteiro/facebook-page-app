import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import AppRouter, { history } from './routers/AppRouter';
import configureStore from './store/configureStore';
import { loadCurrentUser, logout } from './actions/auth';
import LoadingPage from './components/LoadingPage';
import 'normalize.css/normalize.css';
import './styles/styles.scss';
import 'react-table/react-table.css'

const store = configureStore();
const jsx = (
  <Provider store={store}>
    <AppRouter />
  </Provider>
);
let hasRendered = false;
const renderApp = () => {
  if (!hasRendered) {
    ReactDOM.render(jsx, document.getElementById('app'));
    hasRendered = true;
  }
};

ReactDOM.render(<LoadingPage />, document.getElementById('app'));

const handleAuthChange = ({status}) => {
  if (status === 'connected') {
    store.dispatch(loadCurrentUser()).finally(() => {
      if (history.location.pathname === '/') {
        history.push('/pages');
      }
    });
  } else {
    store.dispatch(logout());
    if(history.location.pathname !== '/') {
      history.push('/');
    }
  }
};

window.fbAsyncInit = function() {
  FB.init({
    appId            : '920629074811238',
    autoLogAppEvents : true,
    xfbml            : true,
    version          : 'v3.1'
  });

  FB.Event.subscribe('auth.authResponseChange', handleAuthChange);  
  renderApp();
};

(function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s); js.id = id;
  js.src = 'https://connect.facebook.net/en_US/sdk.js';
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));
