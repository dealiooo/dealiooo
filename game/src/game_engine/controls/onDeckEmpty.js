import * as gameActions from '../actions';

// called everytime card is drawn from deck
// if is then empty create new deck from discard
export const onDeckEmpty = Game => {
  if (gameActions.getDeckEmpty(Game)) {
    Game.deck = Game.deck.concat(Game.discard);
    Game.discard = [];

    gameActions.shufflePile(Game, Game.deck);
  }
};
