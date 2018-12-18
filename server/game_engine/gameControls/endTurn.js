const gameActions = require('../gameActions');
const userControls = require('../userControls');

module.exports = (Game, callback) => {
  Game.cards_played = 0;
  Game.cards_played_list = [];

  const player = Game.players[Game.turn_count % Game.player_count];
  if (gameActions.getHasSevenOrLessCards(player)) {
    Game.players.map(player =>
      gameActions.movePile(
        player.field.action_cards,
        Game.discard,
        player.field.action_cards
      )
    );
    callback(null);
  } else {
    userControls.pickHandCard(Game, player, (error, card) => {
      if (error) {
        callback(error);
      } else {
        gameActions.moveCard(player.hand, Game.discard, card);
        endTurn(callback);
      }
    });
  }
};
