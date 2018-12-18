const gameActions = require('../actions');

// ui: do you want to keep playing? surrender?
// triggered by: closing tab / clicking surrender button
const forfeit = (Game, player) => {
  Game.player_count--;

  // basically remove all cards that the player has to discard pile
  // and then remove the player from game

  // add all player hand cards to discard pile
  if (gameActions.isPileNotEmpty(player.hand)) {
    gameActions.movePile(player.hand, Game.discard, player.hand);
  }

  // add all action_cards to discard_pile
  if (gameActions.isPileNotEmpty(player.field.action_cards)) {
    gameActions.movePile(player.field.action_cards, Game.discard);
  }

  // add all bank cards to discard pile
  if (gameActions.isPileNotEmpty(player.field.bank_cards)) {
    gameActions.movePile(player.field.bank_cards, Game.discard);
  }

  // add all players property field cards to discard pile
  for (let i = 0; i < player.field.property_cards.length; i++) {
    if (gameActions.isPileNotEmpty(player.field.property_cards[i])) {
      gameActions.movePile(player.field.property_cards[i], Game.discard);
    }
  }

  // remove player from game
  gameActions.removePlayer(Game, player);

  // go to next player turn if the current turn is the forfeiting player
  const turn_player = Game.turn_count % Game.player_count;
  for (let i = 0; i < Game.players.length; i++) {
    if (Game.players[i].id === player.id) {
      if (turn_player === i) {
        Game.turn_count++;
      }
    }
  }
};

module.exports = forfeit;
