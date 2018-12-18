import * as userActions from './userActions';

export const removeEmptyPropertySets = player => {
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

export const getDestinations = {
  property: getPropertyDestinations,
  property_wildcard: getPropertyDestinations,
  building: getBuildingDestinations,
  rent: getRentDestinations,
  all: getAllDestinations
};
/**
 * Two types of actions
 * UserActions

 *    > click
 * CardActions
 *    > Play as action
 *    > Play as money
 *    > move to set n
 * All functions with side-effects do not need to reference window
 *
 * Source is always a pile or Array of Cards
 * Destination is always a pile or Array of Cards
 *
 */

/**
 * Add card to hand from deck (always at start of turn)
 * @param {Player.id} player_id
 */
export const drawCard = (Game, player) => {
  if (!getDeckEmpty(Game)) {
    const card = Game.deck.pop();
    player.hand.push(card);
  }
};

/**
 * Everybody has to pay rent to person unless its a debt-collector action card (forces one player to pay you rent)
 * Can only use bank or property card as rent
 * Have until the amount of rent is fulfilled
 * If you have no property_card_value or bank_value than you do not have to pay
 * You can only charge rent against the Multicolor Property Wild card if it is played with another property card
 * @param {Player | Payee} source
 * @param {Player} destination
 * @param {Integer} amount
 */
export const payRent = (Game, payee, player, amount, callback) => {
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

/**
 * Swap a property card with property card on the field
 * @param {card, pile, player} source
 * @param {card, pile, player} destination
 */
export const swapPropertyCards = (source, destination) => {
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

/**
 * Side Effect
 * Move one card from source (reference) to destination (reference)
 * @param {Deck | Discard | Player.Hand | Player.Field.Action_Cards | Player.Field.Property_Cards | Player.Field.Property_Cards[Index] | Player.Field.Bank_Cards} source
 * @param {Deck | Discard | Player.Hand | Player.Field.Action_Cards | Player.Field.Property_Cards | Player.Field.Property_Cards[Index] | Player.Field.Bank_Cards} destination
 * @param {Card | [Card]} card
 *
 */
export const moveCard = (source, destination, card) => {
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

/**
 * Side Effect
 * Move entire pile from source (reference) to destination (reference)
 */
export const movePile = (source, destination) => {
  for (let i = 0; i < source.length; i++) {
    destination.push(source.pop());
  }
};

// pile is array of cards
export const isPileNotEmpty = pile => {
  return pile.length === 0;
};

/**
 * Shuffle the pile (used mainly for deck and discard)
 * Side-Effect
 * @param {Deck | Discard} source
 */
export const shufflePile = (Game, source) => {
  source = Game.shuffle(source);
};

/**
 * Side Effect
 * Set mainColor of card to newColor
 * @param {Integer} card_id
 * @param {String} color
 */
export const switchColor = (card, newColor) => {
  card.mainColor = newColor;
};

/**
 * Side Effect
 * @param {?} source
 * @param {Property | Bank} destination
 * @param {Property_Card | Bank_Card} card
 */
export const pay = (source, destination, card) => {
  moveCard(destination, card);
};

/**
 * Side Effect
 */
export const removePlayer = (Game, player) => {
  Game.players = Game.players.filter(p => p.id !== player.id);
};

// Returns false if did not find full property_set and true if found a full property_set
// property_set is a array inside player.field.property_cards
export const getPropertySetStatus = (Game, property_set) => {
  let color = property_set[0].mainColor;
  let wildcard_count = property_set.filter(
    card => 'property-wildcard' === card.type
  ).length;
  if (wildcard_count === Game.rent_values[color].maxSize) {
    return false;
  }
  return property_set.length >= Game.rent_values[color].maxSize;
};

// Counts how many full set a player has
export const getNumberFullPropertySets = (Game, player) => {
  let sum = 0;
  player.field.property_cards.map(
    property_set => (sum += getPropertySetStatus(Game, property_set))
  );
  return sum;
};

export const getPropertyPileValue = property_field => {
  let sum = 0;
  property_field.map(set => set.map(card => (sum += card.value)));
  return sum;
};

// pile is array of cards
// Get sum of values in a pile
// Can only be bank cards
export const getPileValue = pile => {
  let sum = 0;
  pile.map(card => (sum += card.value));
  return sum;
};

// Check if house card exists in set of property cards
// Check if full stacks
// Cannot have hotel without house
// maxSetSize is the max of the amount of cards you can stack in property-stack
// [property_card1, property_card2, house_card] === maxPropertySetSize + 1
// [property_card1, property_card2, house, hotel] === maxPropertySetSize + 2
export const getHouseStatus = (Game, property_set) => {
  return (
    property_set.length ===
    Game.rent_values[property_set[0].mainColor].maxSetSize + 1
  );
};

// House and hotel cards cannot be laid on railroads or utility cards cause that just doesnÃ¢ÂÂt make any sense silly.
// Rule :if a player charges you money and you decide to pay with some of the property from your completed set that includes a House and/or Hotel, the House or Hotel must be placed on the table next to your property section until you complete another set and it can be placed on top. You can also pay with your house or hotel card if you choose.
// Rule: House and hotel cards cannot be laid on railroads or utility cards cause that just doesnÃ¢ÂÂt make any sense silly.
// check if a player can add a house to a property_set
// 0: cannot 1: can
export const getCanAddHouseToPropertySet = (Game, property_set) => {
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

// Returns a boolean whether hotel already exists
// True: exists, False: does not exists
export const getHotelStatus = (Game, property_set) => {
  return (
    property_set.length ===
    Game.rent_values[property_set[0].mainColor].maxSize + 2
  );
};

export const getCanAddHotelToPropertySet = (Game, property_set) => {
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

/*
 * Return the number of double the rent cards in the action field pile
 */
export const getDoubleTheRentStatus = action_cards => {
  return action_cards.filter(card => card.name === 'double-the-rent').length;
};

export const getPropertySetValue = (Game, property_set) => {
  let offset =
    getHouseStatus(Game, property_set) + getHotelStatus(Game, property_set);
  return (
    Game.rent_values[property_set[0].mainColor].rentValues[
      property_set.length - offset
    ] +
    offset * 2
  );
};

export const getRentValue = (Game, player, property_set) => {
  return (
    getPropertySetValue(Game, property_set) *
    Math.pow(2, getDoubleTheRentStatus(player.field.action_cards))
  );
};

export const getPropertyColorMatchesRentColor = (property_card, rent_card) => {
  return property_card.mainColor === rent_card.mainColor;
};

export const getDeckEmpty = Game => {
  return 0 === Game.deck.length;
};

export const getHasThreeFullPropertySets = (Game, player_id) => {
  return 3 <= getNumberFullPropertySets(Game, player_id);
};

export const getHasPlayedThreeCards = Game => {
  return 3 > Game.cards_played;
};

export const getHasSevenOrLessCards = player => {
  return 7 >= player.hand.length;
};

export const getHasTwoToFivePlayers = Game => {
  return Game.player_count >= 2 && Game.player_count <= 5;
};
