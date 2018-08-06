import { login, logout } from '../../actions/auth';

test('should generate login action object', () => {
  const user = {id: 'abc123'};
  const action = login(user);
  expect(action).toEqual({
    type: 'LOGIN',
    user
  });
});

test('should generate logout action object', () => {
  const action = logout();
  expect(action).toEqual({
    type: 'LOGOUT'
  });
});
