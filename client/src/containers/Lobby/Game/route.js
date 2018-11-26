import GameLobby from './GameLobby';

const GameLobbyRoute = [
  {
    path: '/game-lobby/:id',
    exact: true,
    component: GameLobby
  }
];

export default GameLobbyRoute;
