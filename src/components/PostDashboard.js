import React from 'react';
import { connect } from 'react-redux';
import { Image, Tabs, Tab } from 'react-bootstrap';
import { PostList } from './PostList';
import { selectPage } from '../selectors/pages';
import { history } from '../routers/AppRouter';

export class PostDashboard extends React.Component {

  componentDidMount() {
    if(!this.props.page) {
      // Page not found. Likely a browser refresh. Just go back to main dashboard.
      history.push('/');
      return;
    }
  }

  render() {
    if(this.props.page) {
      return (
        <div className="content-container">
          <div className="list-header">
            {this.props.page.pictureUrl && <Image src={this.props.page.pictureUrl} circle/>}
            <h3 className="list-item__title">{this.props.page.name}</h3>
          </div>
          <Tabs defaultActiveKey={2} id="uncontrolled-tab-example">
            <Tab eventKey={1} title="Published Posts">
              <PostList {...this.props} postType="Published"/>
            </Tab>
            <Tab eventKey={2} title="Scheduled Posts">
              <PostList {...this.props} postType="Scheduled"/>
            </Tab>
          </Tabs>
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

export default connect(mapStateToProps)(PostDashboard);
