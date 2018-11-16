import React, { Component } from 'react';
import GameLobbyList from './GameLobbyList';
import ChatLog from '../../../components/Chat/ChatLog';

import Box from 'react-bulma-components/lib/components/box';
import Button from 'react-bulma-components/lib/components/button';
import Columns from 'react-bulma-components/lib/components/columns';
import Section from 'react-bulma-components/lib/components/section';

import './MainLobby.css';

var debug = true;

class MainLobby extends Component {
  render() {
    return (
      <Box>
        <Section>navBar goes here</Section>
        <Columns>
          <Columns.Column>
            <GameLobbyList
              key="gameLobbies"
              gameLobbies={getGameLobbies(this.props.gameLobbies)}
            />
            <Button className="is-large">Create</Button>
          </Columns.Column>
          <Columns.Column>
            <ChatLog />
          </Columns.Column>
        </Columns>
      </Box>
    );
  }
}

function getGameLobbies(val) {
  if (debug) {
    return [
      {
        id: 1000,
        playerNum: 5,
        playerCap: 5,
        playerList: ['zxcqa1', 'zxcqa2', 'zxcqa3', 'zxcqa4', 'zxcqa5']
      },
      {
        id: 1001,
        playerNum: 5,
        playerCap: 5,
        playerList: ['zxcqb1', 'zxcqb2', 'zxcqb3', 'zxcqb4', 'zxcqb5']
      },
      {
        id: 1002,
        playerNum: 2,
        playerCap: 5,
        playerList: ['qwe1', 'qwe2']
      },
      {
        id: 1003,
        playerNum: 1,
        playerCap: 4,
        playerList: ['joinMe']
      },
      {
        id: 1004,
        playerNum: 2,
        playerCap: 2,
        playerList: ['asd1', 'asd2']
      },
      {
        id: 1005,
        playerNum: 5,
        playerCap: 5,
        playerList: ['zxc1', 'zxc2', 'zxc3', 'zxc4', 'zxc5']
      },
      {
        id: 1006,
        playerNum: 5,
        playerCap: 5,
        playerList: ['zxcq1', 'zxcq2', 'zxcq3', 'zxcq4', 'zxcq5']
      }
    ];
  }
  return val;
}

export default MainLobby;
