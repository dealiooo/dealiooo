const userActions = require('./userActions');

const removeEmptyPropertySets = player => {
  player.field.property_cards = player.field.property_cards.filter(
    set => set.length
  );
};

const getAllDestinations = (player, card, source) => {
  let destinationIndexes = [];
  let destinations = player.field.property_cards.filter((set, i) => {
    destinationIndexes.push(`${i}`);
    return set;
  });
  return { destinations, destinationIndexes };
};

const getPropertyDestinations = (Game, player, card, source) => {
  let destinationIndexes = [];
  let destinations = player.field.property_cards.filter((set, i) => {
    if (set.length) {
      if (set[0].mainColor === card.mainColor) {
        if (!getPropertySetStatus(Game, set)) {
          destinationIndexes.push(`${i}`);
        }
      }
    } else {
      destinationIndexes.push(`${i}`);
    }
    return set;
  });
  return { destinations, destinationIndexes };
};

const getBuildingDestinations = (Game, player, card, source) => {
  let destination = [];
  let destinationIndexes = [];
  if (player.field.building_cards !== source) {
    destination = [];
  } else if ('house' === card.name) {
    destination = player.field.property_cards.filter((set, i) => {
      let condition = getCanAddHouseToPropertySet(Game, set);
      if (condition) {
        destinationIndexes.push(`${i}`);
      }
      return condition;
    });
  } else {
    destination = player.field.property_cards.filter((set, i) => {
      let condition = getCanAddHotelToPropertySet(Game, set);
      if (condition) {
        destinationIndexes.push(`${i}`);
      }
      return condition;
    });
  }
  return { destination, destinationIndexes };
};

const getRentDestinations = (player, card, source) => {
  let destinationIndexes = [];
  let destinations = player.field.property_cards.filter((set, i) => {
    let condition = set.length && set[0].mainColor === card.mainColor;
    if (condition) {
      destinationIndexes.push(`${i}`);
    }
    return condition;
  });

  return { destinations, destinationIndexes };
};

const getDestinations = {
  property: getPropertyDestinations,
  property_wildcard: getPropertyDestinations,
  building: getBuildingDestinations,
  rent: getRentDestinations,
  all: getAllDestinations
};

const drawCard = (Game, player) => {
  if (!getDeckEmpty(Game)) {
    const card = Game.deck.pop();
    player.hand.push(card);
  }
};

const payRent = (Game, payee, player, amount, callback) => {
  console.log(
    `Pay rent:\npayee id:${payee.id}\nplayer id:${player.id}\namount:${amount}`
  );
  let pile = [];
  if (getPropertyPileValue(payee.field.property_cards)) {
    pile.push('property_cards');
  }
  if (getPileValue(payee.field.bank_cards)) {
    pile.push('bank_cards');
  }
  if (getPileValue(payee.field.building_cards)) {
    pile.push('building_cards');
  }
  if (pile.length) {
    userActions.pick_valuable_field_card(
      Game,
      payee,
      pile,
      (error, card, source) => {
        if (error) {
          console.log('you cant escape rent unless you have no money');
          console.log(error);
          payRent(Game, payee, player, amount, callback);
        } else {
          if ('property_cards' === source.pileName) {
            if (getPropertySetStatus(Game, source.pile)) {
              if ('building' === card.type) {
                if ('house' === card.name && getHotelStatus(source.pile)) {
                  moveCard(
                    source.pile,
                    player.field.building_cards,
                    source.pile.filter(card => 'hotel' === card.name)[0]
                  );
                }
                moveCard(source.pile, player.field.building_cards, card);
              } else {
                // TODO: use reduce
                source.pile
                  .filter(card => 'building' === card.type)
                  .map(card =>
                    moveCard(source.pile, player.field.building_cards, card)
                  );
                player.field.property_cards.push([]);
                moveCard(
                  source.pile,
                  player.field.property_cards[
                    player.field.property_cards.length - 1
                  ],
                  card
                );
                removeEmptyPropertySets(payee);
              }
            } else {
              player.field.property_cards.push([]);
              moveCard(
                source.pile,
                player.field.property_cards[
                  player.field.property_cards.length - 1
                ],
                card
              );
              removeEmptyPropertySets(payee);
            }
          } else {
            moveCard(source.pile, player.field[source.pileName], card);
          }
          if (card.value < amount) {
            payRent(Game, payee, player, amount - card.value, callback);
          } else {
            callback(null);
          }
        }
      }
    );
  } else {
    callback(null);
  }
};

const swapPropertyCards = (source, destination) => {
  source.player.field.property_cards.push([]);
  destination.player.field.property_cards.push([]);
  moveCard(
    source.pile,
    destination.player.field.property_cards[
      destination.player.field.property_cards.length - 1
    ],
    source.card
  );
  moveCard(
    destination.pile,
    source.player.field.property_cards[
      source.player.field.property_cards.length - 1
    ],
    destination.card
  );
  removeEmptyPropertySets(source.player);
  removeEmptyPropertySets(destination.player);
};

const moveCard = (source, destination, card) => {
  // add card to destination
  destination.push(card);

  // inelegantly remove the card from source
  let stack = [];
  let offset = 0;
  for (let i = 0; i < source.length; i++) {
    if (source[i].id === card.id) {
      offset = i;
      break;
    }
  }

  offset = source.length - offset;
  for (let i = 0; i < offset; i++) {
    stack.push(source.pop());
  }

  stack.pop();

  for (let i = 1; i < offset; i++) {
    source.push(stack.pop());
  }
};

const movePile = (source, destination) => {
  for (let i = 0; i < source.length; i++) {
    destination.push(source.pop());
  }
};

const isPileNotEmpty = pile => {
  return pile.length === 0;
};

const shufflePile = (Game, source) => {
  source = Game.shuffle(source);
};

const switchColor = (card, newColor) => {
  card.mainColor = newColor;
};

const pay = (source, destination, card) => {
  moveCard(destination, card);
};

const removePlayer = (Game, player) => {
  Game.players = Game.players.filter(p => p.id !== player.id);
};

const getPropertySetStatus = (Game, property_set) => {
  let color = property_set[0].mainColor;
  let wildcard_count = property_set.filter(
    card => 'property-wildcard' === card.type
  ).length;
  if (wildcard_count === Game.rent_values[color].maxSize) {
    return false;
  }
  return property_set.length >= Game.rent_values[color].maxSize;
};

const getNumberFullPropertySets = (Game, player) => {
  let sum = 0;
  player.field.property_cards.map(
    property_set => (sum += getPropertySetStatus(Game, property_set))
  );
  return sum;
};

const getPropertyPileValue = property_field => {
  let sum = 0;
  property_field.map(set => set.map(card => (sum += card.value)));
  return sum;
};

const getPileValue = pile => {
  let sum = 0;
  pile.map(card => (sum += card.value));
  return sum;
};

const getHouseStatus = (Game, property_set) => {
  return (
    property_set.length ===
    Game.rent_values[property_set[0].mainColor].maxSetSize + 1
  );
};

const getCanAddHouseToPropertySet = (Game, property_set) => {
  if (getHouseStatus(Game, property_set)) {
    // house already exists
    return 0;
  } else if (!getPropertySetStatus(Game, property_set)) {
    // not a full property set
    return 0;
  } else if (
    property_set[0].mainColor === 'railroad' ||
    property_set[0].mainColor === 'utility'
  ) {
    // cannot be added to railroad or utility
    return 0;
  } else {
    // success
    return 1;
  }
};

const getHotelStatus = (Game, property_set) => {
  return (
    property_set.length ===
    Game.rent_values[property_set[0].mainColor].maxSize + 2
  );
};

const getCanAddHotelToPropertySet = (Game, property_set) => {
  if (getHotelStatus(Game, property_set)) {
    // hotel already exists
    return 0;
  } else if (!getHouseStatus(Game, property_set)) {
    // house does not exist
    return 0;
  } else if (
    property_set[0].mainColor === 'railroad' ||
    property_set[0].mainColor === 'utility'
  ) {
    // cannot be added to railroad or utility
    return 0;
  } else {
    // success
    return 1;
  }
};

const getDoubleTheRentStatus = action_cards => {
  return action_cards.filter(card => card.name === 'double-the-rent').length;
};

const getPropertySetValue = (Game, property_set) => {
  let offset =
    getHouseStatus(Game, property_set) + getHotelStatus(Game, property_set);
  return (
    Game.rent_values[property_set[0].mainColor].rentValues[
      property_set.length - offset
    ] +
    offset * 2
  );
};

const getRentValue = (Game, player, property_set) => {
  return (
    getPropertySetValue(Game, property_set) *
    Math.pow(2, getDoubleTheRentStatus(player.field.action_cards))
  );
};

const getPropertyColorMatchesRentColor = (property_card, rent_card) => {
  return property_card.mainColor === rent_card.mainColor;
};

const getDeckEmpty = Game => {
  return 0 === Game.deck.length;
};

const getHasThreeFullPropertySets = (Game, player_id) => {
  return 3 <= getNumberFullPropertySets(Game, player_id);
};

const getHasPlayedThreeCards = Game => {
  return 3 > Game.cards_played;
};

const getHasSevenOrLessCards = player => {
  return 7 >= player.hand.length;
};

const getHasTwoToFivePlayers = Game => {
  return Game.player_count >= 2 && Game.player_count <= 5;
};

module.exports = {
  removeEmptyPropertySets,
  getDestinations,
  drawCard,
  payRent,
  swapPropertyCards,
  moveCard,
  movePile,
  isPileNotEmpty,
  shufflePile,
  switchColor,
  removePlayer,
  getPropertySetStatus,
  getNumberFullPropertySets,
  getPropertyPileValue,
  getPileValue,
  getHotelStatus,
  getCanAddHouseToPropertySet,
  getHotelStatus,
  getCanAddHotelToPropertySet,
  getDoubleTheRentStatus,
  getPropertySetValue,
  getRentValue,
  getPropertyColorMatchesRentColor,
  getDeckEmpty,
  getHasThreeFullPropertySets,
  getHasPlayedThreeCards,
  getHasSevenOrLessCards,
  getHasTwoToFivePlayers
};
