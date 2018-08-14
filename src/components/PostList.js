import React from 'react';
import ReactTable from "react-table";
import { connect } from 'react-redux';
import moment from 'moment';
import LoadingPage from './LoadingPage';
import { loadPosts, clearPosts } from '../actions/posts';

export class PostList extends React.Component {
  state = {
    loadingMore: false
  };

  columns = [{
      Header: 'Type',
      accessor: 'type',
      maxWidth: 100,
      Cell: row => (
        <div>{this.getPostTypeString(row.value)}</div>
      )
    }, {
      Header: 'Message',
      accessor: 'message'
    }, {
      Header: 'Date Created',
      accessor: 'updated_time',
      maxWidth: 160,
      Cell: row => (
        <div>{moment(row.value).format('lll')}</div>
      )
    }, {
      Header: 'Published',
      accessor: 'is_published',
      maxWidth: 75,
      Cell: row => (
        <div>{row.value ? 'Yes' : 'No'}</div>
      )
    }, {
      Header: 'Impressions',
      accessor: 'post_impressions_unique',
      maxWidth: 100
    }
  ];

  getPostTypeString(type) {
    switch(type) {
      case 'status': return 'Status Update';
      case 'link':   return 'Link';
      case 'photo':  return 'Photo';
      case 'video':  return 'Video';
      case 'offer':  return 'Offer';
    }
  }

  loadMorePosts = () => {
    this.setState(() => ({ loadingMore: true }));
    this.props.loadPosts(this.props.page)
      .finally(() => {
        this.setState(() => ({ loadingMore: false }));
      });
  }

  render() {
    return (
      <div>
        {(this.props.posts.length === 0) && 'No posts found for this page'}
        <ReactTable
          data={this.props.posts}
          noDataText={''}
          columns={this.columns}
          showPagination={false}
          showPageSizeOptions={false}
          minRows={0}
          className="-striped -highlight"
        />
        <span className="pagination-container">
          {this.props.next && <button className="button" onClick={this.loadMorePosts}>Load more posts...</button>}
          {this.state.loadingMore && <LoadingPage />}
        </span>
      </div>
    );
  }
};

const mapStateToProps = (state) => {
  return {
    posts: state.posts.posts,
    next: state.posts.next
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadPosts: (page) => dispatch(loadPosts(page)),
    clearPosts: () => dispatch(clearPosts())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PostList);