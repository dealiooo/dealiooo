import React, { Component } from 'react';

import Section from 'react-bulma-components/lib/components/section';
import Level from 'react-bulma-components/lib/components/level';
import Box from 'react-bulma-components/lib/components/box';
import Button from 'react-bulma-components/lib/components/button';
import NavigationBar from '../../../components/NavigationBar';

class GameLobby extends Component {
  render() {
    let gameLobbyName;
    if (this.props.match.params.id) {
      gameLobbyName = `${this.props.match.params.id}'s Lobby`;
    } else {
      gameLobbyName = 'Not Registered';
    }

    return (
      <Box>
        <NavigationBar title={gameLobbyName} />
        <Section className="has-text-centered">chat goes here</Section>
        <Section>
          <Level>
            <Level.Item />
            <Level.Item />
            <Level.Item>
              <StartButton host={this.props.host} />
            </Level.Item>
            <Level.Item>
              <Button className="is-large">Ready</Button>
            </Level.Item>
            <Level.Item>
              <Button className="is-large">Exit</Button>
            </Level.Item>
            <Level.Item />
          </Level>
        </Section>
      </Box>
    );
  }
}

function StartButton(props) {
  if (props.host) {
    return <Button className="is-large">Start</Button>;
  }
  return <div />;
}

export default GameLobby;
