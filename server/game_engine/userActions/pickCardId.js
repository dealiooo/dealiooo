const pickCardId = (
  Game,
  { player: requiredPlayer, callback },
  player_id = null
) => {
  if (player_id && requiredPlayer.id !== player_id) {
    return;
  }
  if ('' === Game.user_input) {
    let message = `Player id:${requiredPlayer.id}\nPick Card Id:`;
    Game.pending_for_user_input = {
      function: pickCardId,
      arguments: { player: requiredPlayer, callback },
      message
    };
  } else {
    let card_id = parseInt(Game.user_input);
    Game.user_input = '';
    Game.pending_for_user_input = null;
    callback(null, card_id);
    return `\nYou picked card id:${card_id}`;
  }
};

module.exports = pickCardId;
