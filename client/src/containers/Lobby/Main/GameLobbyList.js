import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PerfectScrollbar from 'perfect-scrollbar';
import GameLobbyListItem from './GameLobbyListItem';
import MakeRoomModal from './MakeRoomModal';

import Box from 'react-bulma-components/lib/components/box';

import 'perfect-scrollbar/css/perfect-scrollbar.css';

class GameLobbyList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      roomName: this.props.roomName,
      playerCapacity: this.props.playerCapacity
    }
  }

  componentWillReceiveProps = props => {
    this.setState({
      roomName: props.roomName,
      playerCapacity: props.playerCapacity
    })
  }

  componentDidMount = () => {
    this.ps = new PerfectScrollbar(ReactDOM.findDOMNode(this));
  }

  componentDidUpdate = _ => {
    this.ps.update();
  }

  render = () => {
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
    <MakeRoomModal
      roomName={this.state.roomName}
      playerCapacity={this.state.playerCapacity}
      onCreate={this.props.onCreate}
      onChange={this.props.onChange}
    />
    {gameLobbyListItems}
    </Box>;
  }
}

export default GameLobbyList;
