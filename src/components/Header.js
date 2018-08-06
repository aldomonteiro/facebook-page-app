import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { startLogout } from '../actions/auth';

export class Header extends React.Component {
  constructor(props) {
    super(props);
  }

  doLogout() {
    FB.logout();
    history.push('/');
  };

  render() {
    return (
      <header className="header">
        <div className="content-container">
          <div className="header__content">
            <Link className="header__title" to="/dashboard">
              <h1>Facebook Page Manager</h1>
            </Link>
            <button className="button button--link" onClick={this.doLogout}>Logout</button>
          </div>
        </div>
      </header>
    );
  }
};

const mapDispatchToProps = (dispatch) => ({
  fbLogout: () => dispatch(fbLogout())
});

export default connect(undefined, mapDispatchToProps)(Header);
