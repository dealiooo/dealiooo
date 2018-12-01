/*
  List of globals and their types:

  var player_count = Integer
  var turn_count = Integer
  var cards_played = Integer
  var deck = [Card]
  var discard = [Card]
  var players = {
    "player_id": {
      "hand": [Card]
      "field": [[Card]]
      "bank": [Card]
    },
    ...
  }
*/

const deck = require('./cards');
const players = require('./players');

/* globals vars */
var player_count;
var turn_count;
var cards_played;
var deck;
var discard;
var players; // also used as order of player turn

// Return a random number including min and max
const random = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

// Shuffle the elements in an array
const shuffle = a => {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

// Initialize the global variables
const initGlobalVars = player_count => {
  turn_count = 0;
  cards_played = 0;
  deck = deck;
  discard = [];
  player_count = player_count || random(2, 5);
  players = shuffle(players).splice(0, player_count);
};

module.exports = initGlobalVars;
