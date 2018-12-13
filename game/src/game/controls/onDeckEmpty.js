import * as gameActions from '../actions';

// called everytime card is drawn from deck
// if is then empty create new deck from discard
export const onDeckEmpty = () => {
  if (gameActions.getDeckEmpty()) {
    window.deck = window.deck.concat(window.discard);
    window.discard = [];

    gameActions.shufflePile(window.deck);
  }
};
