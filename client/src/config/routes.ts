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
  createRoute('/sign-in', pages.TEMP),
  createRoute('/sign-up', pages.TEMP),
  createRoute('/new-password/:sid', pages.TEMP),
  createRoute('/forgot-password', pages.TEMP),
  createRoute('/game-rules', pages.TEMP),
  // Should always be last, catches all routes not specified above
  createRoute('/', pages.TEMP, false),
];

export default routes;
