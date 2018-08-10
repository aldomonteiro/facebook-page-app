
export const addPosts = (posts, next) => ({
  type: 'ADD_POSTS',
  posts,
  next
});

export const clearPosts = () => ({
  type: 'CLEAR_POSTS',
});

const loadPostInsight = (post, token, insight) => {
  return new Promise((resolve, reject) => {
    let params = {
      access_token: token
    };
    FB.api(`/${post.id}/insights/${insight}`, params, (response) => {
      if(!response || response.error) {
        reject(response.error);
        return;
      }

      post[insight] = response.data[0].values[0].value;
      resolve();
    });
  });
}

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

        let promises = [];
        response.data.forEach((post) => {
          promises.push(loadPostInsight(post, page.access_token, 'post_impressions'));
        });

        Promise.all(promises)
          .finally(() => {
            dispatch(addPosts(response.data, response.paging ? response.paging.next : ''));
            resolve();
          });
      });
    });
  }
}

export const createPost = (page, post) => {
  return (dispatch) => {
    let params = {
      access_token: page.access_token,
      message: post.message,
      published: post.published
    };

    return new Promise((resolve, reject) => {
      FB.api(`/${page.id}/feed`, 'post', params, (response) => {
        if(!response || response.error) {
          reject(response.error);
          return;
        }
        resolve();
      });
    });
  }
}