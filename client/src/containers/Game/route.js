import Game from './Game';

const GameRoute = [
  {
    path: '/game/:id',
    exact: true,
    component: Game
  }
];

export default GameRoute;
