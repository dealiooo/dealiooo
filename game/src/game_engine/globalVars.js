/*
  List of globals and their types:

  var player_count = Integer
  var turn_count = Integer
  var cards_played = Integer
  var deck = [Card]
  var discard = [Card]
  var players = [
    {
      "id": Integer
      "hand": [Card]
      "field": [[Card]]
      "bank": [Card]
    },
    ...
  ]
  var cards_played_list = [Card]
*/

import players from './players';
import cards from './cards';
import rentValues from './rentValues';

// Return a random number including min and max
const random = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

// Shuffle the elements in an array
// Should be free of side-effects, returns a brand new array with same elements
const shuffle = a => {
  const copyA = [].concat(a);
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copyA[i], copyA[j]] = [copyA[j], copyA[i]];
  }
  return copyA;
};

// Initialize the global variables
const initGlobalVars = player_count => {
  // Game
  window.turn_count = 0;
  window.cards_played = 0;
  window.cards_played_list = [];
  window.rent_values = rentValues;
  window.deck = shuffle(cards);
  window.discard = [];
  window.player_count = player_count || random(2, 5);
  window.players = shuffle(players).splice(0, player_count); // index also used as order of player turn

  // Util Functions
  window.random = random;
  window.shuffle = shuffle;
  window.user_input = '';
  window.pending_for_user_input = null;
  window.winner = null;
};

export default playerCount => initGlobalVars(playerCount);
