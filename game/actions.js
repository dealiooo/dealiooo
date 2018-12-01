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
 *  Move one card from source to destination
 * @param {Deck.Card | Discard.Card | Player.Hand.Card | Action_Card | Bank_Card | Money_Card} card_id
 * @param {Deck | Discard | Player.Hand | Player.Field.Action_Cards | Player.Field.Property_Cards | Player.Field.Bank } destination
 */
const moveCard = (card_id, destination) => {};

/**
 * Shuffle the pile
 * @param {Deck | Discard} source
 */
const shufflePile = source => {};

/**
 * Set mainColor of card to newColor
 * Add oldMainColor to card's subColors
 * @param {Integer} card_id
 * @param {String} color
 */
const switchColor = (card_id, newColor) => {};

/**
 *
 * @param {Property_Card | Bank_Card} source
 * @param {Bank} destination
 */
const pay = (source, destination) => {};

// Check if a color is allowed to be switched
const getCanSwitchColor = (card_id, color) => {};
// Returns 0 if did not find full property_set and 1 if found a full property_set
// property_set is a array inside player.field.property_cards
const getPropertySetStatus = property_set => {};
// Counts how many full set a player has
const getNumberFullPropertySets = player_id => {};
// Get value of card based on card id
const getCardValue = card_id => {};
// Get sum of values in a pile
// Can only be property or bank cards
const getPileValue = pile => {};
// Check if house card exists in set of property cards
// Chec if full stacks
// Cannot have hotel without house
// maxPropertySetSize is the max of the amount of cards you can stack in property-stack
// [property_card1, property_card2, house_card] === maxPropertySetSize + 1
// [property_card1, property_card2, house, hotel] === maxPropertySetSize + 2
const getHouseStatus = property_set => {
  return property_set.length >= rentValues[stack[0].color].maxSetSize + 1;
};

// add house to property_set
const addHouse = property_set => {};

// Rule :if a player charges you money and you decide to pay with some of the property from your completed set that includes a House and/or Hotel, the House or Hotel must be placed on the table next to your property section until you complete another set and it can be placed on top. You can also pay with your house or hotel card if you choose.
// Rule: House and hotel cards cannot be laid on railroads or utility cards cause that just doesn’t make any sense silly.
// check if a player can add a house to a property_set
// 0: cannot 1: can
const getCanAddHouseToPropertySet = property_set => {
  if (getHouseStatus(property_set)) {
    return 'already has house';
  } else if (getPropertyStackStatus(property_set)) {
    // can only add house if full stack
    addHouse(property_set);
  } else {
    return 'error: not full stack';
  }
};

const addHotel = property_set => {};

const getHotelStatus = property_set => {
  return property_set.length >= rentValues[property_set[0].color].maxSize + 2;
};

// House and hotel cards cannot be laid on railroads or utility cards cause that just doesn’t make any sense silly.
// 0: cannot 1: can
const getCanAddHouseToPropertySet = property_set => {};

// note: might be difficult to implement
// note: If a player plays a multicolor wild rent card, then they only collect rent against one player that they choose.
// If a player plays a normal rent card, then all players play
// note: you can only charge rent against the Multicolor Property Wild card if it is played with another property card.
// user can player up to 3 rent cards
// so we have to be extra careful when changing game state accordingly
// Only need the color of property card must match color of rent card to play
// Return 0 if cannot play
// Return 1 if can play
const getDoubleTheRentStatus = source => {};
const getPropertyColorMatchesRentColor = (property_card, rent_card) => {};
const getDeckEmpty = () => {};
const getHasThreeFullPropertySets = () => {};
const getHasPlayedThreeCards = () => {};
const getHasSevenOrLessCards = () => {};

/**
 *
 * Additional Game Notes:
 * A player using the Deal Breaker card for a completed property set gets everything that
 * has been previously laid with that completed set. So if any houses or hotels have been
 * laid on top of the completed property set that you are asking for, you would get the
 * full property set including any houses/hotels when using the Deal Breaker card.
 * You can only steal a house or hotel on a completed set with a deal breaker.
 * If a house/hotel is on a completed set, it cannot be taken with a Force Deal or Sly Deal.
 * If a player has a house/hotel on the table that is not part of a full completed set,
 * then a force deal or sly deal can be used to steel it.
 *
 */
