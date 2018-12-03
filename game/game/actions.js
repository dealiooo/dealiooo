/**
 * Two types of actions
 * UserActions

 *    > click
 * CardActions
 *    > Play as action
 *    > Play as money
 *    > move to set n
 *
 */

/**
 * Move one card from source (reference) to destination (reference)
 * @param {Deck | Discard | Player.Hand | Player.Field.Action_Cards | Player.Field.Property_Cards | Player.Field.Property_Cards[Index] | Player.Field.Bank_Cards} source
 * @param {Deck | Discard | Player.Hand | Player.Field.Action_Cards | Player.Field.Property_Cards | Player.Field.Property_Cards[Index] | Player.Field.Bank_Cards} destination
 * @param {Card | [Card]} card
 */
export const moveCard = (source, destination, card) => {
  // add card(s) to destination
  destination.push(card);
  // remove card from source
  source = source.filter(srcCard => (srcCard.id = card.id));
};

/**
 * Move array of cards from source (reference) to destination (reference)
 */
export const moveCards = (source, destination, cards) => {
  // add card(s) to destination
  destination.push(cards);
  // remove card from source
  source = [];
};

// source is a pile that can be moved
// either deck, discard, property_cards, bank_cards, or action_cards
// where type is an Array of Cards
export const movePile = (source, destination) => {
  // add all cards removed to destination
  destination = destination.concat(source);
  // remove all cards from source
  source = [];
};

/**
 * Shuffle the pile
 * @param {Deck | Discard} source
 */
export const shufflePile = source => {
  window.shuffle(source);
};

/**
 * Set mainColor of card to newColor
 * Add oldMainColor to card's subColors
 * @param {Integer} card_id
 * @param {String} color
 */
export const switchColor = (card_id, newColor) => {
  let card = window.card_values[card_id];
  card.subColors.push(card.mainColor);
  card.mainColor = newColor;
  card.subColors = card.subColors.splice(card.indexOf(newColor), 1);
};

/**
 *
 * @param {Property_Card | Bank_Card} source
 * @param {Property | Bank} destination
 */
export const pay = (source, destination) => {
  moveCard(source.id, destination);
};

// Check if a color is allowed to be switched
export const getCanSwitchColor = (card_id, color) => {
  let card = window.card_values[card_id];
  return card.subColors.include(color);
};

// Returns 0 if did not find full property_set and 1 if found a full property_set
// property_set is a array inside player.field.property_cards
export const getPropertySetStatus = property_set => {
  let color = property_set[0].mainColor;
  return parseInt(property_set.length >= window.rent_values[color].maxSize);
};

// Counts how many full set a player has
export const getNumberFullPropertySets = player_id => {
  let sum = 0;
  let player = window.players.filter(layer => player.id === player_id);
  player.field.property_cards.map(card => (sum += getPropertySetStatus(card)));
  return sum;
};

// Get value of card based on card id
const getCardValue = card_id => {
  return window.card_values[card_id].value;
};

// Get sum of values in a pile
// Can only be property or bank cards
export const getPileValue = pile => {
  // TODO: define Property_Pile
  let sum = 0;
  if (pile === 'Property_Pile') {
    pile.map(set => set.map(card => (sum += getCardValue(card.id))));
  } else {
    pile.map(card => (sum += getCardValue(card.id)));
  }
  return sum;
};
// Check if house card exists in set of property cards
// Chec if full stacks
// Cannot have hotel without house
// maxSetSize is the max of the amount of cards you can stack in property-stack
// [property_card1, property_card2, house_card] === maxPropertySetSize + 1
// [property_card1, property_card2, house, hotel] === maxPropertySetSize + 2
export const getHouseStatus = property_set => {
  return (
    property_set.length >=
    window.rent_values[property_set[0].mainColor].maxSetSize + 1
  );
};

/**
 * add house to property_set
 * @param {Property_Set} property_set
 * @param {House_Card} houseCard
 */
export const addHouse = (property_set, houseCard) => {
  property_set.push(houseCard);
};

// House and hotel cards cannot be laid on railroads or utility cards cause that just doesnât make any sense silly.
// Rule :if a player charges you money and you decide to pay with some of the property from your completed set that includes a House and/or Hotel, the House or Hotel must be placed on the table next to your property section until you complete another set and it can be placed on top. You can also pay with your house or hotel card if you choose.
// Rule: House and hotel cards cannot be laid on railroads or utility cards cause that just doesnât make any sense silly.
// check if a player can add a house to a property_set
// 0: cannot 1: can
export const getCanAddHouseToPropertySet = (property_set, card) => {
  if (getHouseStatus(property_set)) {
    // house already exists
    return 0;
  } else if (!getPropertySetStatus(property_set)) {
    // not a full property set
    return 0;
  } else {
    // success
    return 1;
  }
};

/**
 * @param {Property_Set} property_set
 * @param {Hotel_Card} hotelCard
 */
export const addHotel = (property_set, hotelCard) => {
  property_set.push(hotelCard);
};

// Returns a boolean whether hotel already exists
// True: exists, False: does not exists
export const getHotelStatus = property_set => {
  return (
    property_set.length >=
    window.rent_values[property_set[0].mainColor].maxSize + 2
  );
};

export const getCanAddHotelToPropertySet = (property_set, card) => {
  if (getHotelStatus(property_set)) {
    // hotel already exists
    return 0;
  } else if (!getPropertySetStatus(property_set)) {
    // not a full property set
    return 0;
  } else {
    // success
    return 1;
  }
};

// note: might be difficult to implement
// note: If a player plays a multicolor wild rent card, then they only collect rent against one player that they choose.
// If a player plays a normal rent card, then all players play
// note: you can only charge rent against the Multicolor Property Wild card if it is played with another property card.
// user can player up to 3 rent cards
// so we have to be extra careful when changing game state accordingly
// Only need the color of property card must match color of rent card to play
// Return 0 if cannot play
// Return 1 if can play

/*
 * return the number of double the rent cards in the action field pile
 */
export const getDoubleTheRentStatus = action_cards => {
  let sum = 0;
  action_cards.map(card => {
    if (34 === card.id || 35 === card.id) {
      sum++;
    }
    return card;
  });
  return sum;
};

export const getPropertySetValue = property_set => {
  let offset = getHotelStatus(property_set) + getHouseStatus(property_set);
  return (
    window.rent_values[property_set[0].mainColor].rentValues[
      property_set.length - offset
    ] +
    offset * 2
  );
};

export const getRentValue = (player, property_set) => {
  return (
    getPropertySetValue(property_set) *
    Math.pow(2, getDoubleTheRentStatus(player.field.action_cards))
  );
};

export const getPropertyColorMatchesRentColor = (property_card, rent_card) => {
  return property_card.mainColor === rent_card.mainColor;
};

export const getDeckEmpty = () => {
  return 0 === window.deck.length;
};

export const getHasThreeFullPropertySets = player_id => {
  return 3 <= getNumberFullPropertySets(player_id);
};

export const getHasPlayedThreeCards = () => {
  return 3 > window.cards_played;
};

export const getHasSevenOrLessCards = player_id => {
  let player = window.players.filter(player => player.id === player_id);
  return 7 <= player[0].hand.length;
};

export const getHasTwoToFivePlayers = () => {
  return window.player_count >= 2 && window.player_count <= 5;
};

export const removePlayer = player => {
  window.players = window.players.filter(p => p.id !== player.id);
};

/*
 * Additionals Game Notes:
 * A player using the Dealbreaker card for a completed property set gets everything that
 * has been previously laid with that completed set. So if any houses or hotels have been
 * laid on top of the completed property set that you are asking for, you would get the
 * full property set including any houses/hotels when using the Deal Breaker card.
 * You can only steal a house or hotel on a completed set with a deal breaker.
 * If a house/hotel is on a completed set, it cannot be taken with a Force Deal or Sly Deal.
 * If a player has a house/hotel on the table that is not part of a full completed set,
 * then a force deal or sly deal can be used to steel it.
 *
 */
