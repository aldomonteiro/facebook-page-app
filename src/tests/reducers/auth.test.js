import authReducer from '../../reducers/auth';

test('should set user for login', () => {
  const action = {
    type: 'LOGIN',
    user: {id: 'abc123'}
  };
  const state = authReducer({}, action);
  expect(state.id).toBe(action.user.id);
});

test('should clear user for logout', () => {
  const action = {
    type: 'LOGOUT'
  };
  const state = authReducer({ accessToken: 'anything' }, action);
  expect(state).toEqual({});
});
