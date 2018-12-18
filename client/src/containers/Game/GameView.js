import React, { Component } from 'react';
import Image from 'react-bulma-components/lib/components/image';
import Columns from 'react-bulma-components/lib/components/columns';
import Level from 'react-bulma-components/lib/components/level';
import Box from 'react-bulma-components/lib/components/box';
import Tile from 'react-bulma-components/lib/components/tile';
import Card from 'react-bulma-components/lib/components/card';

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

const getPileTitle = (cards, type) =>
  `${
    {
      bank_cards: '🏦',
      property_cards: '🏠',
      building_cards: '🏢',
      action_cards: '🚴‍'
    }[type]
  } $${getTotalValue(cards)}`;

const renderPileViewComponents = (cards, type) => {
  let PileView;
  if (type === 'property_cards') {
    PileView = cards.map(card => {
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
    PileView = keys.map(key => {
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
    PileView =
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
  } else if (type === 'bank_cards') {
    const frequencies = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 10: 0 };
    cards.map(c => frequencies[c.value]++);
    const valueCards = Object.keys(frequencies).filter(
      key => frequencies[key] > 0
    );
    PileView = valueCards.map(card => (
      <Card>
        <Card.Header>
          <Card.Header.Title>{frequencies[card]}</Card.Header.Title>
        </Card.Header>
        <Card.Content>${card}</Card.Content>
      </Card>
    ));
  }

  return PileView;
};

const renderCardsModalView = cards =>
  Array.isArray(cards[0]) ? (
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

const renderStack = (cards, type) => {
  return (
    <Tile
      kind="child"
      size={type === 'property_cards' || type === 'bank_cards' ? 4 : 2}
    >
      <Box>
        <Level renderAs="nav">
          <Level.Side align="left">
            <Level.Item>{getPileTitle(cards, type)}</Level.Item>
          </Level.Side>
          <Level.Side align="right">
            <Level.Item>
              <ZoomModal>{renderCardsModalView(cards)}</ZoomModal>
            </Level.Item>
          </Level.Side>
        </Level>
        <Card style={{ overflowX: 'auto' }}>
          <Tile>
            {renderPileViewComponents(cards, type).map(card => (
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
  bank_cards
}) => {
  return (
    <Tile kind="parent" size={12}>
      {renderStack(bank_cards, 'bank_cards')}
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

const PlayerView = ({ player_info, showHand = false }) => {
  return (
    <div>
      <Tile kind="ancestor">
        <PlayerField {...player_info} />
      </Tile>
      {showHand ? (
        <Tile kind="ancestor">
          <PlayerHand hand={player_info.hand} />
        </Tile>
      ) : null}
    </div>
  );
};

// Calculate how to render other players
const PlayerViews = ({ players_info }) => {
  const ColumnSizes = {
    2: [12],
    3: [6, 6],
    4: [6, 6, 10],
    5: [6, 6, 6, 6]
  };
  const numPlayers = players_info.length - 1;
  return (
    <Columns>
      {players_info.map((player_info, i) => {
        if (i === 0 || i == numPlayers) {
          return null;
        }
        return (
          <Columns.Column
            size={ColumnSizes[numPlayers][i - 1]}
            style={{ margin: '0 auto' }}
          >
            <PlayerView player_info={player_info} />
          </Columns.Column>
        );
      })}
    </Columns>
  );
};

// Render deck and discard pile
const MiddleFieldView = ({ deck_count, discard }) => {
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
    super(props);
  }

  // TODO
  handleCardClick = event => {};

  render() {
    const { players_info } = this.props;
    // TODO: fix-me
    const me =
      players_info[Math.floor(Math.random() * players_info.length) + 1];

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
        <PlayerViews players_info={players_info} />
        <MiddleFieldView
          deck={players_info[0].deck}
          discard={players_info[0].discard}
        />
        <PlayerView
          player_info={me}
          showHand={true}
          onCardClicked={this.handleCardClick}
        />
      </div>
    );
  }
}

export default GameView;
