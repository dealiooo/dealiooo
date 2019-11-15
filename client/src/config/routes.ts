import { RouteConfig } from 'react-router-config';

import * as pages from '../pages';

function createRoute(path: string, page: React.FC<any>, exact: boolean = true): RouteConfig {
  return {
    path,
    component: page,
    exact,
  };
}

const routes: RouteConfig[] = [
  createRoute('/', pages.MainLobby),
  createRoute('/game/:gameId', pages.Game),
  createRoute('/game-lobby/:gameId', pages.GameLobby),
  createRoute('/main-lobby', pages.MainLobby),
  createRoute('/sign-in', pages.SignIn),
  createRoute('/sign-up', pages.SignUp),
  createRoute('/reset-password/:token', pages.ResetPassword),
  createRoute('/forgot-password', pages.ForgotPassword),
  createRoute('/game-rules', pages.GameRules),
  // Should always be last, catches all routes not specified above
  createRoute('/', pages.Unknown, false),
];

export default routes;
