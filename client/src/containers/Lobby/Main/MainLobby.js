import React, { Component } from 'react';
import GameLobbyList from './GameLobbyList';
import ChatLog from '../../../components/Chat/ChatLog';
import ChatInput from '../../../components/Chat/ChatInput';
import NavigationBar from '../../../components/NavigationBar';

import Box from 'react-bulma-components/lib/components/box';
import Button from 'react-bulma-components/lib/components/button';
import Columns from 'react-bulma-components/lib/components/columns';
import api from '../../../api';

import './MainLobby.css';

class MainLobby extends Component {
  constructor(props) {
    super(props);
    this.onCreateGame = this.onCreateGame.bind(this);
    this.onEndGame = this.onEndGame.bind(this);
    this.onJoinGame = this.onJoinGame.bind(this);
    this.onLeaveGame = this.onLeaveGame.bind(this);
    this.onStartGame = this.onStartGame.bind(this);
    this.onCreate = this.onCreate.bind(this);
    this.state = {
      startRender: false,
      userId: null,
      userName: null,
      lobbies: [],
      socket: api.socket
    };
    api.socket.on('main-lobby:create-game', this.onCreateGame);
    api.socket.on('main-lobby:end-game', this.onEndGame);
    api.socket.on('main-lobby:join-game', this.onJoinGame);
    api.socket.on('main-lobby:leave-game', this.onLeaveGame);
    api.socket.on('main-lobby:start-game', this.onStartGame);
  }

  componentDidMount() {
    api.getMainLobby().then(response => {
      if (response.ok) {
        response.text().then(body => {
          body = JSON.parse(body);
          this.setState({ userId: body.id });
          this.setState({ userName: body.name });
          this.setState({ startRender: true });
          api.postMainLobby().then(promise => {
            var baseState = promise.result;
            baseState.map((game, i) =>
              api.getGameLobbyInfo(game.id).then(info => {
                baseState[i].id = game.id;
                baseState[i].playerList = info.result;
                baseState[i].playerNum = info.result.length;
                baseState[i].playerCap = game.player_cap;
                baseState[i].status = game.status;
                this.setState({ lobbies: baseState });
              })
            );
          });
        });
      } else {
        window.location = '/login';
      }
    });
  }

  onCreateGame(event) {
    var baseState = this.state.lobbies;
    var newRoom = {
      id: event.gameId,
      playerCap: event.playerCap,
      status: 'open'
    };
    api.getGameLobbyInfo(event.gameId).then(info => {
      newRoom.playerList = info.result;
      newRoom.playerNum = info.result.length;
      baseState = baseState.concat(newRoom);
      this.setState({ lobbies: baseState });
    });
  }

  onEndGame(event) {
    // todo
  }

  onJoinGame(event) {
    // todo: convert this array operation to a dictionary operation
    var length = this.state.lobbies.length;
    var index = 0;
    for (var i = 0; i < length; i++) {
      if (this.state.lobbies[i].id === event.gameId) {
        index = i;
        break;
      }
    }
    api.getGameLobbyInfo(event.gameId).then(info => {
      var baseState = this.state.lobbies;
      baseState[index].playerList = info.result;
      baseState[index].playerNum = info.result.length;
      this.setState({ lobbies: baseState });
    });
  }

  onLeaveGame(event) {
    // todo: convert this array operation to a dictionary operation
    var length = this.state.lobbies.length;
    var index = 0;
    for (var i = 0; i < length; i++) {
      if (this.state.lobbies[i].id === parseInt(event.gameId)) {
        index = i;
        break;
      }
    }
    api.getGameLobbyInfo(event.gameId).then(info => {
      var baseState = this.state.lobbies;
      if (info.result.length) {
        baseState[index].playerList = info.result;
        baseState[index].playerNum = info.result.length;
      } else {
        baseState.splice(index, 1);
      }
      this.setState({ lobbies: baseState });
    });
  }

  onStartGame(event) {
    // todo: convert this array operation to a dictionary operation
    var length = this.state.lobbies.length;
    var index = 0;
    for (var i = 0; i < length; i++) {
      if (this.state.lobbies[i].id === parseInt(event.gameId)) {
        index = i;
        break;
      }
    }
    var baseState = this.state.lobbies;
    baseState.splice(index, 1);
    this.setState({ lobbies: baseState });
  }

  onCreate = _ => {
    api
      .postMainLobbyCreateGame()
      .then(result => (window.location = `/game-lobby/${result.result.id}`));
  };

  render() {
    if (this.state.startRender) {
      return (
        <Box>
          <NavigationBar title="Main Lobby" />
          <Columns>
            <Columns.Column>
              <GameLobbyList
                key="gameLobbies"
                gameLobbies={this.state.lobbies}
                userId={this.state.userId}
              />
              <Button onClick={this.onCreate} className="is-large">
                Create
              </Button>
            </Columns.Column>
            <Columns.Column>
              <ChatLog socket={this.state.socket} roomId={'main-lobby:chat'} />
              <ChatInput roomId={null} api={api.postMainLobbyChat} />
            </Columns.Column>
          </Columns>
        </Box>
      );
    }
    return <Box>Loading Page...</Box>;
  }
}

export default MainLobby;
