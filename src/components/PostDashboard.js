import React from 'react';
import { connect } from 'react-redux';
import { Image } from 'react-bootstrap';
import PostList from './PostList';
import NewPost from './NewPost';
import LoadingPage from './LoadingPage';
import { selectPage } from '../selectors/pages';
import { history } from '../routers/AppRouter';
import { createPost, clearPosts, loadPosts } from '../actions/posts';

export class PostDashboard extends React.Component {

  state = {
    showNewPostModal: false,
    loading: true
  };

  componentDidMount() {
    if(!this.props.page) {
      // Page not found. Likely a browser refresh. Just go back to main dashboard.
      history.push('/');
      return;
    }
    this.reloadPosts();
  }

  reloadPosts = () => {
    this.setState(() => ({ loading: true }));
    this.props.clearPosts();
    this.props.loadPosts(this.props.page)
      .finally(() => {
        this.setState(() => ({ loading: false }));
      });
  }

  showNewPostModal = () => {
    this.setState({showNewPostModal: true});
  }

  closeNewPostModal = () => {
    this.setState({showNewPostModal: false});
  }

  saveNewPostModal = (post) => {
    this.props.createPost(this.props.page, post);
    this.closeNewPostModal();
    this.reloadPosts();
  }

  render() {
    if(this.props.page) {
      return (
        <div className="content-container">
          <div className="list-header">
            {this.props.page.pictureUrl && <Image src={this.props.page.pictureUrl} circle/>}
            <h3 className="list-item__title">{this.props.page.name} Posts</h3>
            <button className="button" onClick={this.showNewPostModal}>New Post</button>
          </div>
          {this.state.loading ? <LoadingPage /> : <PostList {...this.props}/>}
          <NewPost 
            show={this.state.showNewPostModal}
            handleClose={this.closeNewPostModal}
            onSubmit={this.saveNewPostModal}/>
        </div>
      );
    }
    return null;
  }

};

const mapStateToProps = (state, props) => {
  return {
    page: selectPage(state.pages, {id: props.match.params.id})
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    createPost: (page, post) => dispatch(createPost(page, post)),
    clearPosts: () => dispatch(clearPosts()),
    loadPosts: (page) => dispatch(loadPosts(page))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PostDashboard);
