// Posts Reducer

const postsReducerDefaultState =  {
  posts: [],
  next: ''
};

export default (state = postsReducerDefaultState, action) => {
  switch (action.type) {
    case 'ADD_POSTS':
      return {
        posts: [...state.posts, ...action.posts],
        next: action.next
      };
    case 'CLEAR_POSTS':
      return {
        posts: [],
        next: ''
      };
    default:
      return state;
  }
};
