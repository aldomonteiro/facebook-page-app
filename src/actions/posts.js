
export const addPosts = (posts, next) => ({
  type: 'ADD_POSTS',
  posts,
  next
});

export const clearPosts = () => ({
  type: 'CLEAR_POSTS',
});

export const loadPosts = (page) => {
  return (dispatch, getState) => {
    let postEndpoint = '';
    let params = {
      access_token: page.access_token, 
      fields: `type, 
              message, 
              scheduled_publish_time,
              updated_time, 
              is_published`,
      limit: 5
    };

    if(getState().posts.next) {
      postEndpoint = getState().posts.next;
    }
    else {
      postEndpoint = `/${page.id}/promotable_posts`;
    }

    return new Promise((resolve, reject) => {
      FB.api(postEndpoint, params, (response) => {
        if(!response || response.error) {
          reject(response.error);
          return;
        }

        dispatch(addPosts(response.data, response.paging ? response.paging.next : ''));
        resolve();
      });
    });
  }
}