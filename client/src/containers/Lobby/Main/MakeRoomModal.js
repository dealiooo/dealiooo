import React, { Component } from "react";
import Button from "react-bulma-components/lib/components/button";
import Columns from "react-bulma-components/lib/components/columns";
import {
  Control,
  Field,
  Label,
  Input,
  Select
} from "react-bulma-components/lib/components/form";
import Modal from "react-bulma-components/lib/components/modal";

import "./MainLobby.css";

class MakeRoomModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      roomName: this.props.roomName,
      playerCapacity: this.props.playerCapacity
    };
    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
  }

  componentWillReceiveProps = props => {
    this.setState({
      roomName: props.roomName,
      playerCapacity: props.playerCapacity
    });
  };

  open = () => this.setState({ show: true });
  close = () => this.setState({ show: false });

  render = () => (
    <div>
      <Modal show={this.state.show} onClose={this.close} closeOnBlur={true}>
        <Modal.Card>
          <Modal.Card.Body style={{ borderRadius: "0.5em" }}>
            <form onSubmit={this.props.onCreate}>
              <Columns>
                <Columns.Column>
                  <Label>Choose Player Capacity:</Label>
                </Columns.Column>
                <Columns.Column className="is-1">
                  <button className="delete" onClick={this.close} />
                </Columns.Column>
              </Columns>
              <Field className="is-grouped">
                <Control className="is-expanded">
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
          </Modal.Card.Body>
        </Modal.Card>
      </Modal>
      <Button className="make-a-room-btn" onClick={this.open}>
        Make a Room
      </Button>
    </div>
  );
}

export default MakeRoomModal;
