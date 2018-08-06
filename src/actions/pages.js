// SET_PAGES
export const setPages = (pages) => ({
  type: 'SET_PAGES',
  pages
});

// ADD_PAGE
export const setPagePicture = (pageId, pictureUrl) => ({
  type: 'SET_PAGE_PICTURE',
  pageId,
  pictureUrl
});

export const loadPages = () => {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      FB.api('/me/accounts', (response) => {
        let pages = [];
        if(response) {
          if(response.error) {
            reject(response.error);
            return;
          }
          pages = response.data;
        }
        dispatch(setPages(pages));
        resolve(pages);
      });
    });
  };
};

export const loadPagePicture = (page) => {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      FB.api(`/${page.id}/picture`,  {type: 'small', redirect: '0'}, (response) => {
        if(response) {
          if(response.error) {
            reject(response.error);
            return;
          }
          dispatch(setPagePicture(page.id, response.data.url));
        }
        resolve();
      });
    });
  };
};
