import React from 'react';
import { connect } from 'react-redux';
import PageListItem from './PageListItem';
import { selectPages } from '../selectors/pages';
import { loadPages, loadPagePicture } from '../actions/pages';
import LoadingPage from './LoadingPage';
import { ListGroup, ListGroupItem } from 'react-bootstrap';

export class PageList extends React.Component {
  state = {
    loading: true
  };

  componentDidMount() {
    this.props.loadPages().then((pages) => {
      let pictureResults = [];
      pages.forEach((page) => {
        pictureResults.push(this.props.loadPagePicture(page));
      })
      return Promise.all(pictureResults);
    })
    .finally(() => {
      this.setState(() => ({ loading: false }));
    });
  }

  render() {
    return (
      this.state.loading ? <LoadingPage /> :
        <div className="content-container">
          <div className="list-header">
            <div>{this.props.pages.length.toString()} {this.props.pages.length == 1 ? 'Page' : 'Pages'}</div>
          </div>
          <ListGroup>
            {
              this.props.pages.length === 0 ? (
                <div className="list-item list-item--message">
                  <span>No Facebook Pages found for this account.</span>
                </div>
              ) : (
                  this.props.pages.map((page) => {
                    return (
                      <ListGroupItem key={page.id}>
                        <PageListItem {...page} />
                      </ListGroupItem>
                    );
                  })
                )
            }
          </ListGroup>
        </div>
    );
  }
};

const mapStateToProps = (state) => {
  return {
    pages: selectPages(state.pages, {text: ''/*TODO allow filters*/})
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadPages: () => dispatch(loadPages()),
    loadPagePicture: (page) => dispatch(loadPagePicture(page))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PageList);
