import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logoutCurrentUser } from '../actions/auth';

export class Header extends React.Component {

  render() {
    return (
      <header className="header">
        <div className="content-container">
          <div className="header__content">
            <Link className="header__title" to="/pages">
              <h1>Facebook Page Manager</h1>
            </Link>
            <span className="header__user">
              {this.props.user && <p>Logged in as {this.props.user.name}</p>}
              <button className="button button--link" onClick={this.props.logout}>Logout</button>
            </span>
          </div>
        </div>
      </header>
    );
  }
};

const mapDispatchToProps = (dispatch) => ({
  logout: () => dispatch(logoutCurrentUser())
});

const mapStateToProps = (state) => ({
  user: state.user
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
