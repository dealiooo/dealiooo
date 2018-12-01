// ui: do you want to keep playing? surrender?
// triggered by: closing tab / clicking surrender button
const onForfeit = () => {};
// called everytime card is drawn from deck
// if is then empty create new deck from discard
const onEmptyDeck = () => {};
/**
 * Swap a property card with property card on the field
 * @param {Player.Field.Property_Cards.Property_Card} source
 * @param {Player.Field.Property_Cards.Property_Card} destination
 */
const swapPropertyCard = (source, destination) => {};
/**
 * Everybody has to pay rent to person
 * Can only use bank or property card as rent
 * Have until the amount of rent is fulfilled
 * If you have no property_card_value or bank_value than you do not have to pay
 * You can only charge rent against the Multicolor Property Wild card if it is played with another property card
 * @param {?} source
 * @param {Player.Field.Bank} destination
 * @param {Integer} amount
 */
const payRent = (source, destination, amount) => {};
/**
 * will trigger card as action or money
 * should trigger endTurn whenever card_played > 3
 * move card to proper place in field
 * apply card effect logically
 * check if player has won
 * @param {*} card
 */
const playCard = card => {};
/**
 * Add card to hand (always at start of turn)
 * @param {Player.hand} destination
 */
const drawCard = destination => {};
// move all action cards played in players.field.action_cards to discard
// increment turn_count
// more...?
const endTurn = () => {};
