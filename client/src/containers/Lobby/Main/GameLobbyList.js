import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PerfectScrollbar from 'perfect-scrollbar';
import GameLobbyListItem from './GameLobbyListItem';
import MakeRoomModal from './MakeRoomModal';

import Box from 'react-bulma-components/lib/components/box';
import {
  Control,
  Field,
  Label,
  Input,
  Select
} from 'react-bulma-components/lib/components/form';
import Button from 'react-bulma-components/lib/components/button';

import 'perfect-scrollbar/css/perfect-scrollbar.css';

class GameLobbyList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      roomName: this.props.roomName,
      playerCapacity: this.props.playerCapacity
    }
  }

  componentWillReceiveProps(props) {
    this.setState({
      roomName: props.roomName,
      playerCapacity: props.playerCapacity
    })
  }

  componentDidMount() {
    this.ps = new PerfectScrollbar(ReactDOM.findDOMNode(this));
  }

  componentDidUpdate(_) {
    this.ps.update();
  }

  render() {
    let gameLobbyListItems;
    if (this.props.gameLobbies) {
      gameLobbyListItems = this.props.gameLobbies.map(gameLobby => {
        return (
          <GameLobbyListItem
            key={gameLobby.id}
            gameLobby={gameLobby}
            userId={this.props.userId}
            gameId={gameLobby.id}
          />
        );
      });
    }
    return <Box>
    <MakeRoomModal>
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
          </MakeRoomModal>
    {gameLobbyListItems}
    </Box>;
  }
}

export default GameLobbyList;
