import React, { Component } from 'react';
import { connect } from 'react-redux';

import CreateRoom from './CreateRoom';
import Rooms from './Rooms';
import { Header, Container } from './style';
import { Button, Title, Modal, Loader, Chat, ScrollBar } from '../../components';
import { Lobby, Center } from '../../layouts';
import { MainLobbyAPI, socket, GameLobbyAPI, history } from '../../services';
import { Room, GameStatus, RoomStatus, Auth } from '../../types';
import { RootState } from '../../store/types';

type ReduxStateProps = { auth: Auth | null };
type MainLobbyProps = {} & ReduxStateProps;
type MainLobbyState = {
  auth: Auth | null;
  loading: boolean;
  rooms: Room[];
  showModal: boolean;
};

class MainLobby extends Component<MainLobbyProps, MainLobbyState> {
  constructor(props) {
    super(props);
    this.state = {
      auth: props.auth,
      loading: false,
      rooms: [],
      showModal: false,
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.auth !== prevState.auth) {
      return { auth: nextProps.auth };
    }

    return null;
  }

  componentDidUpdate(prevProps) {
    if (this.props.auth !== prevProps.auth) {
      this.configureSocket();
      this.fetchData();
    }
  }

  openModal = event => {
    this.setState({ showModal: true });
  };

  closeModal = event => {
    this.setState({ showModal: false });
  };

  handleSendMessage = message => {
    MainLobbyAPI.postChat(message);
  };

  handleJoinGameFromSocket = data => {
    const gameId = parseInt(data.gameId, 10);
    const { auth } = this.state;

    if (auth && auth.id === data.userId) {
      history.push(`/game-lobby/${gameId}`);
      return;
    }

    const init = async () => {
      const { data: gameLobbyInfo } = await GameLobbyAPI.getInfo(gameId);

      this.setState(prevState => {
        const baseRooms = prevState.rooms.slice();
        const roomIndex = baseRooms.findIndex(room => room.id === gameId);
        baseRooms[roomIndex].players = gameLobbyInfo.Players;
        if (gameLobbyInfo.Players.length === gameLobbyInfo.player_cap) {
          baseRooms[roomIndex].roomStatus = RoomStatus.full;
        }
        return { rooms: baseRooms };
      });
    };

    init();
  };

  handleCreateGameFromSocket = data => {
    const gameId = parseInt(data.gameId, 10);
    const { auth } = this.state;

    if (auth && auth.id === data.userId) {
      history.push(`/game-lobby/${gameId}`);
      return;
    }

    const init = async () => {
      const { data: gameLobbyInfo } = await GameLobbyAPI.getInfo(gameId);
      const newRoom: Room = {
        id: gameId,
        name: data.roomName,
        capacity: data.playerCap,
        gameStatus: GameStatus.open,
        roomStatus: RoomStatus.join,
        players: gameLobbyInfo.Players,
      };

      this.setState(prevState => ({ rooms: prevState.rooms.concat(newRoom) }));
    };

    init();
  };

  handleEndGameFromSocket = data => {
    const gameId = parseInt(data.gameId, 10);
    this.setState(prevState => ({ rooms: prevState.rooms.filter(room => room.id !== gameId) }));
  };

  handleLeaveGameFromSocket = data => {
    const gameId = parseInt(data.gameId, 10);

    const baseRooms = this.state.rooms.slice();
    const roomIndex = baseRooms.findIndex(room => room.id === gameId);

    if (roomIndex === -1) {
      return;
    }

    if (baseRooms[roomIndex].players.length === 1) {
      baseRooms.splice(roomIndex, 1);
      this.setState({ rooms: baseRooms });
      return;
    }

    const init = async () => {
      const { data: gameLobbyInfo } = await GameLobbyAPI.getInfo(gameId);

      // the gameLobbyInfo is null if host left
      if (!gameLobbyInfo) {
        baseRooms.splice(roomIndex, 1);
      } else {
        // host is still in the lobby, update the players
        baseRooms[roomIndex].players = gameLobbyInfo.Players;
      }

      this.setState({ rooms: baseRooms });
    };

    init();
  };

  handleStartGameFromSocket = data => {
    const gameId = parseInt(data.gameId, 10);

    this.setState(prevState => {
      const auth = prevState.auth;
      const baseRooms = prevState.rooms.slice();
      const roomIndex = baseRooms.findIndex(room => room.id === gameId);
      const room = baseRooms[roomIndex];
      room.gameStatus = GameStatus.started;

      if (auth) {
        const inRoom = room.players.some(player => player.User.id === auth.id);
        if (inRoom) room.roomStatus = RoomStatus.enter;
      } else {
        room.roomStatus = RoomStatus.full;
      }

      return { rooms: baseRooms };
    });
  };

  fetchData = async () => {
    this.setState({ loading: true });

    const { data: games } = await MainLobbyAPI.getLobbies();

    const roomPromises: Promise<Room[]> = games.map(async game => {
      const { data: gameLobbyInfo } = await GameLobbyAPI.getInfo(game.id);

      const getRoomStatus = () => {
        const { auth } = this.state;
        if (auth) {
          const players = gameLobbyInfo.Players;
          const inRoom = players.some(player => player.User.id === auth.id);

          if (inRoom) {
            return RoomStatus.enter;
          }

          const roomFull = players.length === gameLobbyInfo.player_cap;

          if (roomFull) {
            return RoomStatus.full;
          } else {
            return RoomStatus.join;
          }
        }

        return RoomStatus.unauthorized;
      };

      const room: Room = {
        id: gameLobbyInfo.id,
        name: gameLobbyInfo.room_name,
        capacity: gameLobbyInfo.player_cap,
        players: gameLobbyInfo.Players,
        gameStatus: gameLobbyInfo.status,
        roomStatus: getRoomStatus(),
      };

      return room;
    });

    const rooms = await Promise.all(roomPromises);

    this.setState({
      rooms,
      loading: false,
    });
  };

  configureSocket = () => {
    socket.on('main-lobby:create-game', this.handleCreateGameFromSocket);
    socket.on('main-lobby:end-game', this.handleEndGameFromSocket);
    socket.on('main-lobby:join-game', this.handleJoinGameFromSocket);
    socket.on('main-lobby:leave-game', this.handleLeaveGameFromSocket);
    socket.on('main-lobby:start-game', this.handleStartGameFromSocket);
  };

  componentDidMount() {
    this.configureSocket();
    this.fetchData();
  }

  componentWillUnmount() {
    socket.off('main-lobby:create-game');
    socket.off('main-lobby:end-game');
    socket.off('main-lobby:join-game');
    socket.off('main-lobby:leave-game');
    socket.off('main-lobby:start-game');
  }

  render() {
    const { auth, rooms, showModal, loading } = this.state;

    return (
      <Lobby>
        {auth && (
          <Modal open={showModal} title="Create a Room" onClose={this.closeModal}>
            <CreateRoom />
          </Modal>
        )}
        <Container>
          <Header>
            <Title marginless>Rooms</Title>
            <Button disabled={!auth} onClick={auth ? this.openModal : undefined} color="blueLight">
              Create a Room
            </Button>
          </Header>
          {loading ? (
            <Center relative>
              <Loader size={20} />
            </Center>
          ) : (
            <ScrollBar>
              <Rooms rooms={rooms} />
            </ScrollBar>
          )}
        </Container>
        <Chat channel="main-lobby:chat" onSend={this.handleSendMessage} disabled={!auth} />
      </Lobby>
    );
  }
}

const mapState = (state: RootState): ReduxStateProps => ({
  auth: state.account.auth,
});

export default connect(mapState)(MainLobby);
