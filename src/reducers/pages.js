// Pages Reducer

const pagesReducerDefaultState = [];

export default (state = pagesReducerDefaultState, action) => {
  switch (action.type) {
    case 'SET_PAGES':
      return action.pages;
    case 'SET_PAGE_PICTURE':
      return state.map((page) => {
          if(page.id === action.pageId) {
            return {...page, pictureUrl: action.pictureUrl};
          }
          return page;
        });
    default:
      return state;
  }
};
