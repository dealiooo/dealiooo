import { RouteConfig } from 'react-router-config';

import * as pages from '../pages';

const generateRoute = (path: string, page: React.ComponentType<any>, exact: boolean = true): RouteConfig => ({
  path,
  component: page,
  exact,
});

const routes: RouteConfig[] = [
  generateRoute('/', pages.MainLobby),
  generateRoute('/game/:gameId', pages.Game),
  generateRoute('/game-lobby/:gameId', pages.GameLobby),
  generateRoute('/main-lobby', pages.MainLobby),
  generateRoute('/sign-in', pages.SignIn),
  generateRoute('/sign-up', pages.SignUp),
  generateRoute('/reset-password/:token', pages.ResetPassword),
  generateRoute('/forgot-password', pages.ForgotPassword),
  generateRoute('/game-rules', pages.GameRules),
  // Should always be last, catches all routes not specified above
  generateRoute('/', pages.Unknown, false),
];

export default routes;
