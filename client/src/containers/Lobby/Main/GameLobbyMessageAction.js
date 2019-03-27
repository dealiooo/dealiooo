import React, { Component } from "react";
import Button from "react-bulma-components/lib/components/button";
import Columns from "react-bulma-components/lib/components/columns";
import {
  Control,
  Field,
  Input
} from "react-bulma-components/lib/components/form";

import Icon from "react-bulma-components/lib/components/icon";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

import MakeRoomModal from "./MakeRoomModal";

class GameLobbyMessageAction extends Component {
  constructor(props) {
    super(props);
    this.state = {
      roomName: this.props.roomName,
      playerCapacity: this.props.playerCapacity,
      searchRoomName: this.props.searchRoomName
    };
  }

  componentWillReceiveProps = props => {
    this.setState({
      roomName: props.roomName,
      playerCapacity: props.playerCapacity,
      searchRoomName: props.searchRoomName
    });
  };

  render = () => (
    <Columns>
      <Columns.Column className="is-two-thirds">
        <Field className="has-addons">
          <Control>
            <Button className="is-fullwidth">
              <Icon>
                <FontAwesomeIcon icon={faSearch} />
              </Icon>
            </Button>
          </Control>
          <Control className="is-expanded">
            <Input
              name="searchRoomName"
              type="text"
              onChange={this.props.onSearch}
              value={this.state.searchRoomName}
              placeholder="Find a room"
            />
          </Control>
        </Field>
      </Columns.Column>
      <Columns.Column className="has-text-right">
        <MakeRoomModal
          roomName={this.state.roomName}
          playerCapacity={this.state.playerCapacity}
          onCreate={this.props.onCreate}
          onChange={this.props.onChange}
        />
      </Columns.Column>
    </Columns>
  );
}

export default GameLobbyMessageAction;
