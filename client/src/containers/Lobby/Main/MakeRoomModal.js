import React, { Component } from 'react';

import Modal from 'react-bulma-components/lib/components/modal';
import Button from 'react-bulma-components/lib/components/button';

class MakeRoomModal extends Component {
  static defaultProps = {
    modal: {}
  };

  state = {
    show: false
  };

  open = () => this.setState({ show: true });
  close = () => this.setState({ show: false });

  render() {
    return (
      <div>
        <Modal
          show={this.state.show}
          onClose={this.close}
          {...this.props.modal}
        >
          {this.props.children}
        </Modal>
        <Button onClick={this.open}>Make a Room</Button>
      </div>
    );
  }
}

export default MakeRoomModal;
