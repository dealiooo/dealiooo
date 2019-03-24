import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PerfectScrollbar from 'perfect-scrollbar';

import GameLobbyListItem from './GameLobbyListItem';

import 'perfect-scrollbar/css/perfect-scrollbar.css';

class GameLobbyMessage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lobbies: this.props.lobbies
    }
  }
  
  componentWillReceiveProps = props => {
    this.setState({
      lobbies: props.lobbies
    })
  }

  componentDidMount = () => {
    this.ps = new PerfectScrollbar(ReactDOM.findDOMNode(this), {
      useBothWheelAxes: false,
      suppressScrollX: true
    });
  }

  componentDidUpdate = _ => this.ps.update();

  render = () => {
    let gameLobbyListItems;
    if (this.state.lobbies) {
      gameLobbyListItems = this.state.lobbies.map(lobby => {
        return (
          <GameLobbyListItem
            key={lobby.id}
            gameLobby={lobby}
            userId={this.props.userId}
            gameId={lobby.id}
          />
        );
      });
    }
    return (
      <div>
        {gameLobbyListItems}
      </div>
    );
  }
}

export default GameLobbyMessage;
