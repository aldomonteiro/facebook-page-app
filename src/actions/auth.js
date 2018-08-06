import { history } from '../routers/AppRouter';

export const login = (accessToken) => ({
  type: 'LOGIN',
  accessToken
});

export const logout = () => ({
  type: 'LOGOUT'
});
