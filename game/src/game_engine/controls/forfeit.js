import * as gameActions from '../actions';

// ui: do you want to keep playing? surrender?
// triggered by: closing tab / clicking surrender button
export const forfeit = player => {
  window.player_count--;

  // basically remove all cards that the player has to discard pile
  // and then remove the player from game

  // add all player hand cards to discard pile
  if (gameActions.isPileNotEmpty(player.hand)) {
    gameActions.movePile(player.hand, window.discard, player.hand);
  }

  // add all action_cards to discard_pile
  if (gameActions.isPileNotEmpty(player.field.action_cards)) {
    gameActions.movePile(player.field.action_cards, window.discard);
  }

  // add all bank cards to discard pile
  if (gameActions.isPileNotEmpty(player.field.bank_cards)) {
    gameActions.movePile(player.field.bank_cards, window.discard);
  }

  // add all players property field cards to discard pile
  for (let i = 0; i < player.field.property_cards.length; i++) {
    if (gameActions.isPileNotEmpty(player.field.property_cards[i])) {
      gameActions.movePile(player.field.property_cards[i], window.discard);
    }
  }

  // remove player from game
  gameActions.removePlayer(player);

  // go to next player turn if the current turn is the forfeiting player
  const turn_player = window.turn_count % window.player_count;
  for (let i = 0; i < window.players.length; i++) {
    if (window.players[i].id === player.id) {
      if (turn_player === i) {
        window.turn_count++;
      }
    }
  }
};
