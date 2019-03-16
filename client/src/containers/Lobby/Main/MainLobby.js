import React, { Component } from 'react';
import {
  Control,
  Field,
  Label,
  Input,
  Select
} from 'react-bulma-components/lib/components/form';
import Box from 'react-bulma-components/lib/components/box';
import Button from 'react-bulma-components/lib/components/button';
import Columns from 'react-bulma-components/lib/components/columns';

import {
  socket,
  MainLobby as MainLobbyAPI,
  GameLobby as GameLobbyAPI
} from '../../../api';
import GameLobbyList from './GameLobbyList';
import Chat from '../../../components/Chat';
import NavigationBar from '../../../components/NavigationBar';
import './MainLobby.css';

import MakeRoomModal from './MakeRoomModal';

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
              GameLobbyAPI.getGameLobbyInfo(game.id).then(info => {
                baseState[i].id = game.id;
                baseState[i].playerList = info.result;
                baseState[i].playerNum = info.result.length;
                baseState[i].roomName = game.room_name;
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

  onCreateGame = event => {
    var baseState = this.state.lobbies;
    var newRoom = {
      id: event.gameId,
      roomName: event.roomName,
      playerCap: event.playerCap,
      status: 'open'
    };
    GameLobbyAPI.getGameLobbyInfo(event.gameId).then(info => {
      newRoom.playerList = info.result;
      newRoom.playerNum = info.result.length;
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
    GameLobbyAPI.getGameLobbyInfo(event.gameId).then(info => {
      var baseState = this.state.lobbies;
      baseState[index].playerList = info.result;
      baseState[index].playerNum = info.result.length;
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
    GameLobbyAPI.getGameLobbyInfo(event.gameId).then(info => {
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
          <MakeRoomModal>
            <form onSubmit={this.onCreate}>
              <Label className="is-size-4">Choose Player Capacity:</Label>
              <Field className="is-grouped">
                <Control>
                  <Input
                    name="roomName"
                    type="text"
                    onChange={this.onChange}
                    placeholder="Room Name"
                    value={this.state.roomName}
                  />
                </Control>
                <Select
                  name="playerCapacity"
                  onChange={this.onChange}
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
          <NavigationBar title="Main Lobby" userName={this.state.userName} />
          <Columns>
            <Columns.Column>
              <GameLobbyList
                key="gameLobbies"
                gameLobbies={this.state.lobbies}
                userId={this.state.userId}
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
        </div>
      );
    }
    return <Box>Loading Page...</Box>;
  }
}

export default MainLobby;
