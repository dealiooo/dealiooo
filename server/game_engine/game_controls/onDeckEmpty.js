const gameActions = require('./../game_actions');

module.exports = player =>
  gameActions
    .getDeckEmpty(player)
    .then(empty => {
      if (empty) {
        gameActions
          .moveDiscardToDeck(player)
          .then(deck => gameActions.shufflePile(deck));
      }
    })
    .then(_ => player);
