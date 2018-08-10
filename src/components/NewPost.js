import React from 'react';
import { Modal, FormControl, Checkbox } from 'react-bootstrap';
export default class NewPostModal extends React.Component {
  state = {
    message: '',
    published: true
  };

  clearState = () => {
    this.setState(() => ({ 
      published: true,
      message: ''
    }));
  }

  onMessageChange = (e) => {
    const message = e.target.value;
    this.setState(() => ({ 
      message
     }));
  };

  onPublishedChange = (e) => {
    const published = e.target.checked;
    this.setState(() => ({ published }));
  };

  onSubmit = (e) => {
    e.preventDefault();
    this.clearState();
    this.props.onSubmit({
      message: this.state.message,
      published: this.state.published
    });
  }

  onClose = () => {
    this.clearState();
    this.props.handleClose();
  }

  submitDisabled = () => {
    return this.state.message.length == 0;
  }

  render() {
    return (
      <Modal show={this.props.show} onHide={this.props.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create a New Post</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={this.onSubmit}>
            <FormControl
              componentClass="textarea"
              value={this.state.message}
              placeholder="Enter a post message"
              onChange={this.onMessageChange}
            />
            <Checkbox inline
              checked={this.state.published}
              onChange={this.onPublishedChange}>
              Published
            </Checkbox>
            <div className="modalFooter">
              <button className="button" disabled={this.submitDisabled()}>Submit</button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    );
  }
};