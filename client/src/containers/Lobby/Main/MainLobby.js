import React, { Component } from 'react';
import GameLobbyList from './GameLobbyList';
import ChatLog from '../../../components/Chat/ChatLog';
import ChatInput from '../../../components/Chat/ChatInput';
import NavigationBar from '../../../components/NavigationBar';

import Box from 'react-bulma-components/lib/components/box';
import Button from 'react-bulma-components/lib/components/button';
import Columns from 'react-bulma-components/lib/components/columns';
import api from '../../../api';

import './MainLobby.css';

var debug = true;

class MainLobby extends Component {
  state = {
    lobbies: null
  };

  componentWillMount() {
    api.get_game_lobby_list().then(pending_response => {
      if (pending_response.ok) {
        pending_response.text().then(promise => {
          this.setState({ lobbies: JSON.parse(promise).result });
          /*
              this.lobbies.map( ( game, i )  => {
                api.get_game_lobby_info( game.id )
                  .then( info => {
                    var tempState = this.state.lobbies;
                    tempState[i].playerList = info;
                    this.setState({'lobbies': tempState});
                  })
              });
              */
        });
      } else {
        window.location = '/login';
      }
    });
  }

  onClick = evt => {
    api.get_create_game().then(response => {
      if (response.ok) {
        console.log('create game');
        console.log(response.body);
        // notify socket
        // go to game lobby
      }
    });
  };

  render() {
    return (
      <Box>
        <NavigationBar title="Main Lobby" />
        <Columns>
          <Columns.Column>
            <GameLobbyList
              key="gameLobbies"
              gameLobbies={getGameLobbies(this.props.gameLobbies)}
            />
            <Button onClick={this.onClick} className="is-large">
              Create
            </Button>
          </Columns.Column>
          <Columns.Column>
            <ChatLog />
            <ChatInput />
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
