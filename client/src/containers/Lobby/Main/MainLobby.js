import React, { Component } from 'react';
import Box from 'react-bulma-components/lib/components/box';
import Columns from 'react-bulma-components/lib/components/columns';
import Section from 'react-bulma-components/lib/components/section';

import {
  socket,
  MainLobby as MainLobbyAPI,
  GameLobby as GameLobbyAPI
} from '../../../api';
import GameLobbyMessage from './GameLobbyMessage';
import Chat from '../../../components/Chat';
import NavigationBar from '../../../components/NavigationBar';
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
    this.onChange = this.onChange.bind(this);
    this.state = {
      startRender: false,
      playerCapacity: 2,
      userId: null,
      userName: null,
      lobbies: [],
      socket: socket,
      roomName: ''
    };
    socket.on('main-lobby:create-game', this.onCreateGame);
    socket.on('main-lobby:end-game', this.onEndGame);
    socket.on('main-lobby:join-game', this.onJoinGame);
    socket.on('main-lobby:leave-game', this.onLeaveGame);
    socket.on('main-lobby:start-game', this.onStartGame);
  }

  componentDidMount = () => {
    MainLobbyAPI.getMainLobby().then(response => {
      if (response.ok) {
        response.text().then(body => {
          body = JSON.parse(body);
          this.setState({ userId: body.id });
          this.setState({ userName: body.name });
          this.setState({ startRender: true });
          MainLobbyAPI.postMainLobby().then(promise => {
            var baseState = promise.result;
            baseState.map((game, i) =>
              GameLobbyAPI.getGameLobbyInfo(game.id).then(gameInfo => {
                baseState[i].id = gameInfo.id;
                baseState[i].playerList = gameInfo.Players;
                baseState[i].playerNum = gameInfo.Players.length;
                baseState[i].roomName = gameInfo.room_name;
                baseState[i].playerCap = gameInfo.player_cap;
                baseState[i].status = gameInfo.status;
                gameInfo.Players.filter(player => player.host).map(
                  player => {
                    baseState[i].hostId = player.User.id;
                    baseState[i].hostName = player.User.name;
                    return player;
                  }
                )
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

  onCreateGame = event => {
    var baseState = this.state.lobbies;
    var newRoom = {
      id: event.gameId,
      roomName: event.roomName,
      playerCap: event.playerCap,
      status: 'open'
    };
    GameLobbyAPI.getGameLobbyInfo(event.gameId).then(gameInfo => {
      newRoom.playerList = gameInfo.Players;
      newRoom.playerNum = gameInfo.Players.length;
      baseState = baseState.concat(newRoom);
      this.setState({ lobbies: baseState });
    });
  }

  onEndGame = event => {
    // todo
  }

  onJoinGame = event => {
    // todo: convert this array operation to a dictionary operation
    var length = this.state.lobbies.length;
    var index = 0;
    for (var i = 0; i < length; i++) {
      if (this.state.lobbies[i].id === event.gameId) {
        index = i;
        break;
      }
    }
    GameLobbyAPI.getGameLobbyInfo(event.gameId).then(gameInfo => {
      var baseState = this.state.lobbies;
      baseState[index].playerList = gameInfo.Players;
      baseState[index].playerNum = gameInfo.Players.length;
      this.setState({ lobbies: baseState });
    });
  }

  onLeaveGame = event => {
    // todo: convert this array operation to a dictionary operation
    var length = this.state.lobbies.length;
    var index = 0;
    for (var i = 0; i < length; i++) {
      if (this.state.lobbies[i].id === parseInt(event.gameId)) {
        index = i;
        break;
      }
    }
    GameLobbyAPI.getGameLobbyInfo(event.gameId).then(gameInfo => {
      var baseState = this.state.lobbies;
      if (gameInfo.Players.length) {
        baseState[index].playerList = gameInfo.Players;
        baseState[index].playerNum = gameInfo.Players.length;
      } else {
        baseState.splice(index, 1);
      }
      this.setState({ lobbies: baseState });
    });
  }

  onStartGame = event => {
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

  onCreate = event => {
    event.preventDefault();
    MainLobbyAPI.postMainLobbyCreateGame(this.state.roomName, this.state.playerCapacity).then(
      result => {
        window.location = `/game-lobby/${result.th_game_id}`;
      }
    );
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render = () => {
    if (this.state.startRender) {
      return (
        <div>
          <NavigationBar title="Main Lobby" userName={this.state.userName} />
          <Section>
            <Columns>
              <Columns.Column>
                <GameLobbyMessage
                  key="gameLobbies"
                  gameLobbies={this.state.lobbies}
                  userId={this.state.userId}
                  roomName={this.state.roomName}
                  playerCapacity={this.state.playerCapacity}
                  onCreate={this.onCreate}
                  onChange={this.onChange}
                />
              </Columns.Column>
              <Columns.Column className="main-lobby-chat is-two-fifths">
                <Chat
                  socket={this.state.socket}
                  api={MainLobbyAPI.postMainLobbyChat}
                  channel={'main-lobby:chat'}
                  roomId={null}
                />
              </Columns.Column>
            </Columns>
          </Section>
        </div>
      );
    }
    return <Box>Loading Page...</Box>;
  }
}

export default MainLobby;
