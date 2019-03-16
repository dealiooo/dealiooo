import React, { Component } from 'react';
import {
  Control,
  Field,
  Label,
  Input,
  Select
} from 'react-bulma-components/lib/components/form';
import Button from 'react-bulma-components/lib/components/button';
import Modal from 'react-bulma-components/lib/components/modal';

class MakeRoomModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      roomName: this.props.roomName,
      playerCapacity: this.props.playerCapacity
    }
    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
  }

  componentWillReceiveProps = (props) => {
    this.setState({
      roomName: props.roomName,
      playerCapacity: props.playerCapacity
    })
  }

  open = () => this.setState({ show: true });
  close = () => this.setState({ show: false });

  render = () => {
    return (
      <div>
        <Modal
          show={this.state.show}
          onClose={this.close}
        >
          <form onSubmit={this.props.onCreate}>
              <Label className="is-size-4">Choose Player Capacity:</Label>
              <Field className="is-grouped">
                <Control>
                  <Input
                    name="roomName"
                    type="text"
                    onChange={this.props.onChange}
                    placeholder="Room Name"
                    value={this.state.roomName}
                  />
                </Control>
                <Select
                  name="playerCapacity"
                  onChange={this.props.onChange}
                  value={this.state.playerCapacity}
                >
                  <option value={2}>2</option>
                  <option value={3}>3</option>
                  <option value={4}>4</option>
                  <option value={5}>5</option>
                </Select>
                <Control>
                  <Button className="is-info" type="submit">
                    Create
                  </Button>
                </Control>
              </Field>
            </form>
        </Modal>
        <Button onClick={this.open}>Make a Room</Button>
      </div>
    );
  }
}

export default MakeRoomModal;
