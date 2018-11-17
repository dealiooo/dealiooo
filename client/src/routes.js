import GameLobbyRoute from './containers/Lobby/Game/route';
import MainLobbyRoute from './containers/Lobby/Main/route';
import ErrorRoute from './containers/Error/route';
import ForgotPasswordRoute from './containers/Auth/ForgotPassword/route';
import NewPasswordRoute from './containers/Auth/NewPassword/route';

const routes = [
  ...GameLobbyRoute,
  ...MainLobbyRoute,
  ...ForgotPasswordRoute,
  ...NewPasswordRoute
].concat(ErrorRoute);

export default routes;
