const gameActions = require('./../game_actions');
const userControls = require('./../user_controls');

const endTurn = (game, callback) =>
  game.update({ cards_played: 0 }).then(_ =>
    game.getPlayers({ where: { id: game.current_player } }).then(players =>
      gameActions
        .getHasSevenOrLessCards(players[0])
        .then(hasSevenOrLessCards => {
          if (hasSevenOrLessCards) {
            return gameActions
              .updateCurrentPlayer(player)
              .then(_ => discardActionPiles(game, callback));
          } else {
            return reduceHandCards(game, player, callback);
          }
        })
    )
  );

const discardActionPiles = (game, callback) =>
  game
    .getPlayers()
    .then(players =>
      Promise.all(
        players.map(player => gameActions.discardActionPile(player))
      ).then(_ => callback(null))
    );

const reduceHandCards = (game, player, callback) =>
  userControls.pick_hand_card(player, (error, card) => {
    if (error) {
      return callback(error);
    } else {
      return gameActions
        .discardCard(player, card)
        .then(_ => endTurn(game, callback));
    }
  });

module.exports = endTurn;
