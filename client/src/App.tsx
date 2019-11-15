import React, { Fragment } from 'react';
import { Provider, useSelector } from 'react-redux';
import { Router } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import { RenderFunction } from '@storybook/react';
import { ThemeProvider } from 'styled-components';

import store from './store';
import ThemeChangeTool from './ThemeChangeTool';
import { history } from './services';
import { routes } from './config';
import { GlobalStyle, fromThemeColor } from './styles';
import { selectThemeColor } from './store/Settings';
import { devEnv } from './utils';

// TODO: v1.6/7
//
// (feat) optimize all ui components for responsive screen sizes
// (feat) implement game history
// (feat) design card detail ui for property_wildcard (10color) / rent_wildcard
// (feat) design some ui around the turn player
// (feat) chat messages should be limited to 15 seconds
// (feat) card names should be normalized as words and reflected in the ui

type AppProps = {
  story?: RenderFunction;
};

const App = ({ story }: AppProps) => {
  const themeColor = useSelector(selectThemeColor);
  const theme = fromThemeColor(themeColor);

  return (
    <ThemeProvider theme={theme}>
      <Fragment>
        <GlobalStyle />
        <Router history={history}>{story ? story() : renderRoutes(routes)}</Router>
        {(story || devEnv) && <ThemeChangeTool />}
      </Fragment>
    </ThemeProvider>
  );
};

export default (appProps: AppProps) => (
  <Provider store={store}>
    <App {...appProps} />
  </Provider>
);
