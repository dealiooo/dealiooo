import React, { Component } from 'react';
import Image from 'react-bulma-components/lib/components/image';
import Button from 'react-bulma-components/lib/components/button';
import Section from 'react-bulma-components/lib/components/section';

class GeneralGameInfo extends Component {
  constructor(props) {
    super();
  }

  render() {
    const {
      cardImage, // TODO:
      onEndTurn, // TODO:
      onForfeit, // TODO:
      general_info,
      prompts_info
    } = this.props;

    return (
      <Section>
        <Section>
          <Image
            src={process.env.PUBLIC_URL + '/cards/action/dealbreaker.jpg'}
          />
        </Section>
        <Section style={{ padding: '12px' }}>
          <p>Turn: {general_info.turnCount}</p>
          <p>Current Player: {general_info.currentPlayer}</p>
          <p>Cards Played: {general_info.cardsPlayed}</p>
        </Section>
        <Section style={{ padding: '12px' }}>
          <p>Prompt</p>
          <p>{prompts_info.promptMessage}</p>
          <p>{prompts_info.promptPlayer}</p>
        </Section>
        <Section style={{ padding: '12px' }}>
          <Button onEndTurn={onEndTurn}>End Turn</Button>
          <Button onForfeit={onForfeit}>Forfeit</Button>
        </Section>
      </Section>
    );
  }
}

export default GeneralGameInfo;
