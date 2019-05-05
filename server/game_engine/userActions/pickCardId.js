const pickCardId = ({
  Game,
  requiredPlayerId,
  playerId,
  message,
  cancelled,
  forced,
  callback
}) => {
  if (playerId && requiredPlayerId !== playerId) {
    return;
  }
  if (cancelled) {
    callback({ cancelled });
  } else if (forced) {
    callback({ forced });
  } else if ('' === Game.userInput) {
    if (!message) {
      message = `Player id:${requiredPlayerId}\nPick Card Id:`;
    }
    Game.pendingForUserInput = {
      function: pickCardId,
      arguments: { Game, requiredPlayerId, callback },
      message
    };
  } else {
    let cardId = parseInt(Game.userInput);
    Game.userInput = '';
    Game.pendingForUserInput = null;
    callback({ cardId });
    return `\nYou picked card id:${cardId}`;
  }
};

module.exports = pickCardId;
