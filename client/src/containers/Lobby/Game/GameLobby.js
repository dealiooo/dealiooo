import React, { Component } from 'react';

import Section from 'react-bulma-components/lib/components/section';
import Level from 'react-bulma-components/lib/components/level';
import Box from 'react-bulma-components/lib/components/box';
import Button from 'react-bulma-components/lib/components/button';

class MainLobby extends Component {
  render() {
    let gameLobbyName;
    if (this.props.gameLobby) {
      gameLobbyName = this.props.gameLobby.id;
    } else {
      gameLobbyName = 'Not Registered';
    }
    return (
      <Box>
        <Section className="has-text-centered">navBar goes here</Section>
        <Section className="has-text-centered">
          Game Lobby - {gameLobbyName}
        </Section>
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

export default MainLobby;
