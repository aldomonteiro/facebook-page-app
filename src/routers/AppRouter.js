import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import PageList from '../components/PageList';
import NotFoundPage from '../components/NotFoundPage';
import LoginPage from '../components/LoginPage';
import PostDashboard from '../components/PostDashboard';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';

export const history = createHistory();

const AppRouter = () => (
  <Router history={history}>
    <div>
      <Switch>
        <PublicRoute path="/" component={LoginPage} exact={true} />
        <PrivateRoute path="/pages" component={PageList} />
        <PrivateRoute path="/page/:id" component={PostDashboard} />
        <Route component={NotFoundPage} />
      </Switch>
    </div>
  </Router>
);

export default AppRouter;
