import GameLobbyRoute from './containers/Lobby/Game/route';
import MainLobbyRoute from './containers/Lobby/Main/route';
import ErrorRoute from './containers/Error/route';

const routes = [...GameLobbyRoute, ...MainLobbyRoute].concat(ErrorRoute);

export default routes;
