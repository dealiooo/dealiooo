import React, { Component } from 'react';
import Image from 'react-bulma-components/lib/components/image';
import Columns from 'react-bulma-components/lib/components/columns';
import Level from 'react-bulma-components/lib/components/level';
import Box from 'react-bulma-components/lib/components/box';
import Tile from 'react-bulma-components/lib/components/tile';
import Card from 'react-bulma-components/lib/components/card';

import { Data } from './Data';
import ZoomModal from './ZoomModal';

const getTotalValue = set => {
  let total = 0;
  if (Array.isArray(set[0])) {
    set.map(s => s.map(c => (total += c.value)));
  } else {
    set.map(c => (total += c.value));
  }
  return total;
};

const renderStack = (cards, type) => {
  let icons = {
    money_cards: '🏦',
    property_cards: '🏠',
    building_cards: '🏢',
    action_cards: '🚴‍'
  };
  let titleBar = `${icons[type]} $${getTotalValue(cards)}`;
  let pileView;

  if (type === 'property_cards') {
    pileView = cards.map(card => {
      return (
        <Card>
          <Card.Header>
            <Card.Header.Title>{card.length}</Card.Header.Title>
          </Card.Header>
          <Card.Content className={card[0].mainColor}>P</Card.Content>
        </Card>
      );
    });
  } else if (type === 'building_cards') {
    const cardFrequencies = { house: 0, hotel: 0 };
    // calculate frequencies for each card
    cards.map(c => cardFrequencies[c.name]++);
    const keys = Object.keys(cardFrequencies);
    pileView = keys.map(key => {
      if (cardFrequencies[key] > 0) {
        return (
          <Card>
            <Card.Header>
              <Card.Header.Title>{cardFrequencies[key]}</Card.Header.Title>
            </Card.Header>
            <Card.Content>{key}</Card.Content>
          </Card>
        );
      }
    });
  } else if (type === 'action_cards') {
    pileView =
      cards.length === 0 ? (
        <Card>
          <Card.Header>
            <Card.Header.Title>Empty Set</Card.Header.Title>
          </Card.Header>
        </Card>
      ) : (
        cards.map(card => (
          <Card>
            <Card.Header>
              <Card.Header.Title>{card.name}</Card.Header.Title>
            </Card.Header>
            <Card.Content>{card.mainColor || '_'}</Card.Content>
          </Card>
        ))
      );
  } else if (type === 'money_cards') {
    const cardFrequencies = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 10: 0 };
    cards.map(c => cardFrequencies[c.value]++);
    const keys = Object.keys(cardFrequencies).filter(
      key => cardFrequencies[key] > 0
    );
    pileView = keys.map(key => (
      <Card>
        <Card.Header>
          <Card.Header.Title>{cardFrequencies[key]}</Card.Header.Title>
        </Card.Header>
        <Card.Content>${key}</Card.Content>
      </Card>
    ));
  }

  const cardsModalView = Array.isArray(cards[0]) ? (
    <div>
      {cards.map(set => (
        <div>
          {set.map(card => (
            <Image onClick={() => {}} src="" alt="card" />
          ))}
        </div>
      ))}
    </div>
  ) : (
    <div>
      {cards.map(card => (
        <Image onClick={() => {}} src="" alt="card" />
      ))}
    </div>
  );

  return (
    <Tile
      kind="child"
      size={type === 'property_cards' || type === 'money_cards' ? 4 : 2}
    >
      <Box>
        <Level renderAs="nav">
          <Level.Side align="left">
            <Level.Item>{titleBar}</Level.Item>
          </Level.Side>
          <Level.Side align="right">
            <Level.Item>
              <ZoomModal>{cardsModalView}</ZoomModal>
            </Level.Item>
          </Level.Side>
        </Level>
        <Card style={{ overflowX: 'auto' }}>
          <Tile>
            {pileView.map(card => (
              <Tile style={{ paddingRight: 8 }}>{card}</Tile>
            ))}
          </Tile>
        </Card>
      </Box>
    </Tile>
  );
};

const PlayerField = ({
  building_cards,
  property_cards,
  action_cards,
  money_cards
}) => {
  return (
    <Tile kind="parent" size={12}>
      {renderStack(money_cards, 'money_cards')}
      {renderStack(property_cards, 'property_cards')}
      {renderStack(action_cards, 'action_cards')}
      {renderStack(building_cards, 'building_cards')}
    </Tile>
  );
};

const PlayerHand = ({ hand }) => {
  return (
    <Tile kind="parent" size={12} style={{ justifyContent: 'center' }}>
      {hand.map(card => (
        <Tile kind="child" size={1}>
          <Image
            onClick={() => {}}
            src={process.env.PUBLIC_URL + '/cards/cardback.jpg'}
            alt="hand-card"
          />
        </Tile>
      ))}
    </Tile>
  );
};

const PlayerView = ({ data, style, showHand = false }) => {
  return (
    <div>
      <Tile kind="ancestor" style={style}>
        <PlayerField {...data} />
      </Tile>
      {showHand ? (
        <Tile kind="ancestor" style={style}>
          <PlayerHand {...data} />
        </Tile>
      ) : null}
    </div>
  );
};

// Calculate how to render other players
const PlayerViews = ({ players }) => {
  const ColumnSizes = {
    2: [12],
    3: [6, 6],
    4: [6, 6, 10],
    5: [6, 6, 6, 6]
  };
  const numPlayers = players.length - 1;
  return (
    <Columns>
      {players.map((player, i) => {
        if (i === 0 || i == numPlayers) {
          return null;
        }
        return (
          <Columns.Column
            size={ColumnSizes[numPlayers][i - 1]}
            style={{ margin: '0 auto' }}
          >
            <PlayerView data={player} />
          </Columns.Column>
        );
      })}
    </Columns>
  );
};

// Render deck and discard pile
const MiddleFieldView = ({ gameMaster }) => {
  return (
    <Tile
      kind="ancestor"
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 0,
        marginRight: 0
      }}
      className="has-background-grey-darker"
    >
      <Tile kind="parent" size={1}>
        <Tile kind="child" style={{ padding: 2 }}>
          <Image
            src={process.env.PUBLIC_URL + '/cards/cardback.jpg'}
            alt="Deck"
          />
        </Tile>
        <Tile kind="child" style={{ padding: 2 }}>
          <Image
            src={process.env.PUBLIC_URL + '/cards/spawned.jpg'}
            alt="Discard"
          />
        </Tile>
      </Tile>
    </Tile>
  );
};

class GameView extends Component {
  constructor(props) {
    super();
  }

  render() {
    const gameMaster = Data.general_info.players[0];
    const players_data = Data.general_info.players;
    const me =
      players_data[Math.floor(Math.random() * players_data.length) + 1];

    return (
      <div
        className="has-background-white-ter"
        style={{
          height: '100%',
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'column',
          alignItems: 'stretch',
          padding: 8
        }}
      >
        <PlayerViews players={players_data} />
        <MiddleFieldView gameMaster={gameMaster} />
        <PlayerView data={me} showHand={true} />
      </div>
    );
  }
}

export default GameView;
