export default (state = {}, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        accessToken: action.accessToken
      };
    case 'LOGOUT':
      return {};
    default:
      return state;
  }
};
