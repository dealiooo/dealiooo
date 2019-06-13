const gameActions = require('../gameActions');

const forcePlayerPendings = ({ Game, player }) => {
  let pending = Game.pendingForUserInput;
  if (pending) {
    while (pending.arguments.requiredPlayerId === player.id) {
      pending.arguments.playerId = player.id;
      pending.arguments.forced = true;
      pending.function(pending.arguments);
      pending = Game.pendingForUserInput;
    }
  }
};

const discardPlayerCards = ({ Game, player }) => {
  [player.hand, player.field.actionCards, player.field.bankCards].forEach(
    pile => {
      if (gameActions.isPileNotEmpty({ pile })) {
        gameActions.movePile({ source: pile, destination: Game.discard });
      }
    }
  );
  for (let i = 0; i < player.field.propertyCards.length; i++) {
    if (gameActions.isPileNotEmpty({ pile: player.field.propertyCards[i] })) {
      gameActions.movePile({
        source: player.field.propertyCards[i],
        destination: Game.discard
      });
    }
  }
};

const reducePlayerCount = ({ Game }) => {
  Game.playerCount--;
};

const removePlayer = ({ Game, player }) =>
  gameActions.removePlayer({ Game, player });

module.exports = ({ Game, player }) => {
  forcePlayerPendings({ Game, player });
  discardPlayerCards({ Game, player });
  reducePlayerCount({ Game });
  removePlayer({ Game, player });
};
