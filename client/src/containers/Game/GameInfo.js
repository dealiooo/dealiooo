import React, { Component } from 'react';
import Image from 'react-bulma-components/lib/components/image';
import Button from 'react-bulma-components/lib/components/button';
import Section from 'react-bulma-components/lib/components/section';

class GameChat extends Component {
  constructor(props) {
    super();
  }

  render() {
    const {
      cardImage, // TODO:
      turnCount,
      currentPlayer,
      cardsPlayed,
      promptMessage,
      promptPlayer,
      onEndTurn, // TODO:
      onForfeit // TODO:
    } = this.props;

    console.log(currentPlayer);

    return (
      <Section>
        <Section>
          <Image
            src={process.env.PUBLIC_URL + '/cards/action/dealbreaker.jpg'}
          />
        </Section>
        <Section style={{ padding: '12px' }}>
          <p>Turn: {turnCount}</p>
          <p>Current Player: {currentPlayer}</p>
          <p>Cards Played: {cardsPlayed}</p>
        </Section>
        <Section style={{ padding: '12px' }}>
          <p>Prompt</p>
          <p>{promptMessage}</p>
          <p>{promptPlayer}</p>
        </Section>
        <Section style={{ padding: '12px' }}>
          <Button onEndTurn={onEndTurn}>End Turn</Button>
          <Button onForfeit={onForfeit}>Forfeit</Button>
        </Section>
      </Section>
    );
  }
}

export default GameChat;
