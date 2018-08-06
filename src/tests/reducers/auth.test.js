import authReducer from '../../reducers/auth';

test('should set accessToken for login', () => {
  const action = {
    type: 'LOGIN',
    accessToken: 'abc123'
  };
  const state = authReducer({}, action);
  expect(state.accessToken).toBe(action.accessToken);
});

test('should clear accessToken for logout', () => {
  const action = {
    type: 'LOGOUT'
  };
  const state = authReducer({ accessToken: 'anything' }, action);
  expect(state).toEqual({});
});
