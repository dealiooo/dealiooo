import React, { Component } from 'react';

import Section from 'react-bulma-components/lib/components/section';
import Level from 'react-bulma-components/lib/components/level';
import Box from 'react-bulma-components/lib/components/box';
import Button from 'react-bulma-components/lib/components/button';
import Columns from 'react-bulma-components/lib/components/columns';
import Container from 'react-bulma-components/lib/components/container';

import GameInfo from './GameInfo';
import GameView from './GameView';
import GameChat from './GameChat';

import './Game.css';

import { Data } from './Data';

class Game extends Component {
  constructor(props) {
    super();
  }

  render() {
    return (
      <Columns>
        <Columns.Column size={10}>
          <GameView />
        </Columns.Column>
        <Columns.Column size={2}>
          <GameInfo {...Data.general_info.game} />
          <GameChat {...this.props} />
        </Columns.Column>
      </Columns>
    );
  }
}

export default Game;
