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
  createRoute('/', pages.TEMP),
  createRoute('/game/:gameId', pages.TEMP),
  createRoute('/game-lobby/:gameId', pages.TEMP),
  createRoute('/main-lobby', pages.TEMP),
  createRoute('/sign-in', pages.SignIn),
  createRoute('/sign-up', pages.SignUp),
  createRoute('/reset-password/:token', pages.ResetPassword),
  createRoute('/forgot-password', pages.ForgotPassword),
  createRoute('/game-rules', pages.TEMP),
  // Should always be last, catches all routes not specified above
  createRoute('/', pages.Unknown, false),
];

export default routes;
