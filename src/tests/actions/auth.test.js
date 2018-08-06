import { login, logout } from '../../actions/auth';

test('should generate login action object', () => {
  const accessToken = 'abc123';
  const action = login(accessToken);
  expect(action).toEqual({
    type: 'LOGIN',
    accessToken
  });
});

test('should generate logout action object', () => {
  const action = logout();
  expect(action).toEqual({
    type: 'LOGOUT'
  });
});
