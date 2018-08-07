import React from 'react';
import ReactTable from "react-table";
import { Image } from 'react-bootstrap';
import LoadingPage from './LoadingPage';
import moment from 'moment';

export class PostList extends React.Component {
  state = {
    posts: [],
    next: '',
    loading: true,
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
      Header: 'Picture',
      accessor: 'picture',
      maxWidth: 150,
      Cell: row => (
        <Image src={row.value} rounded/>
      )
    }, {
      Header: 'Message',
      accessor: 'message'
    }
  ];

  constructor(props) {
    super(props);

    if(props.postType === 'Published') {
      this.columns.push({
          Header: 'Published',
          accessor: 'created_time',
          Cell: row => (
            <div>{moment(row.value).format('LLL')}</div>
          )
        });
    }
    else if(props.postType === 'Scheduled') {
      this.columns.push({
        Header: 'Scheduled',
        accessor: 'scheduled_publish_time',
        Cell: row => (
          <div>{moment.unix(row.value).format('LLL')}</div>
        )
      });
    }
  }

  getPostTypeString(type) {
    switch(type) {
      case 'status': return 'Status Update';
      case 'link': return 'Link';
      case 'photo': return 'Photo';
      case 'video': return 'Video';
      case 'offer': return 'Offer';
    }
  }

  loadPosts() {
    let postEndpoint = '';
    let params = {
      access_token: this.props.page.access_token, 
      fields: 'type, message, permalink_url, scheduled_publish_time, picture, created_time'
    };
    if(this.state.next) {
      postEndpoint = next;
    }
    else if(this.props.postType === 'Published') {
      postEndpoint = `/${this.props.page.id}/posts`;
    }
    else if(this.props.postType === 'Scheduled') {
      postEndpoint = `/${this.props.page.id}/promotable_posts`;
      params = {...params, is_published: false}
    }
    else {
      return Promise.reject(`Unknown post type ${this.props.postType}`);
    }

    return new Promise((resolve, reject) => {
      FB.api(postEndpoint, params, (response) => {
        if(response) {
          if(response.error) {
            reject(response.error);
            return;
          }
          this.setState((prevState) => ({
            posts: [...prevState.posts, ...response.data],
            next: response.paging && response.paging.next
           }));
        }
        resolve();
      });
    });
  }

  loadMorePosts() {
    this.setState(() => ({ loadingMore: true }));
    this.loadPosts()
      .finally(() => {
        this.setState(() => ({ loadingMore: false }));
      });
  }

  componentDidMount() {
    this.loadPosts()
      .finally(() => {
        this.setState(() => ({ loading: false }));
      });
  }

  renderPreview(row) {
    return (
      <div className="post-preview">
        <div className="fb-post" 
          data-href={row.original.permalink_url}
          data-width="500"/>
      </div>
    );
  }

  render() {
    return (
      this.state.loading ? <LoadingPage /> :
        <div>
          {(this.state.posts.length === 0) && `No ${this.props.postType} posts found for this page.`}
          <ReactTable
            data={this.state.posts}
            noDataText={''}
            SubComponent={ (this.props.postType === 'Published') && this.renderPreview }
            columns={this.columns}
            showPagination={false}
            showPageSizeOptions={false}
            minRows={0}
            className="-striped -highlight"
            onExpandedChange={() => FB.XFBML.parse() }
          />
        </div>
    );
  }
};