import React from 'react';

export default class LoginPage extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    // Ensure login button always renders
    FB.XFBML.parse();
  }

  render() {
    return (
      <div className="box-layout">
        <div className="box-layout__box">
          <h1 className="box-layout__title">Facebook Page Manager</h1>
          <p>Create and view posts on your Facebook Pages.</p>
          <div className="fb-login-button" 
            data-max-rows="1" 
            data-size="large" 
            data-button-type="login_with"
            data-use-continue-as="true"
            scope="manage_pages, publish_pages, read_insights"/>
        </div>
      </div>
    );
  }
};
