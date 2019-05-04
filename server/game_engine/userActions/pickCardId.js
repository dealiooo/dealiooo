const pickCardId = (
  { Game, player: requiredPlayer, playerId, cancelled, forced, callback }
) => {
  if (playerId && requiredPlayer.id !== playerId) {
    return;
  }
  if (cancelled) {
    callback({cancelled});
  } else if (forced) {
    callback({forced});
  } else if ('' === Game.userInput) {
    let message = `Player id:${requiredPlayer.id}\nPick Card Id:`;
    Game.pendingForUserInput = {
      function: pickCardId,
      arguments: { Game, player: requiredPlayer, callback },
      message
    };
  } else {
    let cardId = parseInt(Game.userInput);
    Game.userInput = '';
    Game.pendingForUserInput = null;
    callback({cardId});
    return `\nYou picked card id:${cardId}`;
  }
};

module.exports = pickCardId;
