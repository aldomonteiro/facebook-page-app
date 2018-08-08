import React from 'react';
import { Modal, FormGroup, FormControl, Checkbox } from 'react-bootstrap';

export default class NewPostModal extends React.Component {
  state = {
    message: '',
    published: false
  };

  onMessageChange = (e) => {
    const message = e.target.value;
    this.setState(() => ({ message }));
  };

  onPublishedChange = (e) => {
    const published = e.target.checked;
    this.setState(() => ({ published }));
  };

  onSubmit = (e) => {
    e.preventDefault();
    this.props.onSubmit({
      message: this.state.message,
      published: this.state.published
    });
  }

  render() {
    return (
      <Modal show={this.props.show} onHide={this.props.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create a New Post</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={this.onSubmit}>
            <FormGroup>
              <FormControl
                componentClass="textarea"
                value={this.state.message}
                placeholder="Enter post message"
                onChange={this.onMessageChange}
              />
              <Checkbox inline
                checked={this.state.published}
                onChange={this.onPublishedChange}>
                Published
              </Checkbox>
            </FormGroup>
            <div>
              <button className="button">Submit</button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    );
  }
};