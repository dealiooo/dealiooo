import React from 'react';
import { Provider, useSelector } from 'react-redux';
import { Router } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import { RenderFunction } from '@storybook/react';
import { ThemeProvider } from 'styled-components';

import store from './store';
import ThemeTool from './ThemeTool';
import { history } from './services';
import { routes } from './config';
import { GlobalStyle, createTheme } from './styles';
import { selectThemeColor } from './store/Settings';
import { devEnv } from './config';

type AppProps = {
  story?: RenderFunction;
};

const App: React.FC<AppProps> = ({ story }) => {
  const themeColor = useSelector(selectThemeColor);
  const theme = createTheme({ themeColor });

  return (
    <ThemeProvider theme={theme}>
      <>
        <GlobalStyle />
        <Router history={history}>{story ? story() : renderRoutes(routes)}</Router>
        {(story || devEnv) && <ThemeTool />}
      </>
    </ThemeProvider>
  );
};

const withRedux = Component => props => (
  <Provider store={store}>
    <Component {...props} />
  </Provider>
);

export default withRedux(App);
