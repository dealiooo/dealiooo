const gameActions = require('../gameActions');

const discardPlayerCards = (Game, player) => {
  if (gameActions.isPileNotEmpty(player.hand)) {
    gameActions.movePile(player.hand, Game.discard, player.hand);
  }
  if (gameActions.isPileNotEmpty(player.field.action_cards)) {
    gameActions.movePile(player.field.action_cards, Game.discard);
  }
  if (gameActions.isPileNotEmpty(player.field.bank_cards)) {
    gameActions.movePile(player.field.bank_cards, Game.discard);
  }
  for (let i = 0; i < player.field.property_cards.length; i++) {
    if (gameActions.isPileNotEmpty(player.field.property_cards[i])) {
      gameActions.movePile(player.field.property_cards[i], Game.discard);
    }
  }
};

module.exports = (Game, player) => {
  Game.player_count--;
  discardPlayerCards(Game, player);
  gameActions.removePlayer(Game, player);
  const turn_player = Game.turn_count % Game.player_count;
  for (let i = 0; i < Game.players.length; i++) {
    if (Game.players[i].id === player.id) {
      if (turn_player === i) {
        Game.turn_count++;
      }
    }
  }
};
