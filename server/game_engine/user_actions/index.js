const pick_card_id = (
  { player: requiredPlayer, callback },
  player = null,
  player_input = ''
) => {
  const pending_message = `Player id:${requiredPlayer.id}\nPick Card Id:`;
  const pending = message => ({
    function: pick_card_id,
    arguments: { player: requiredPlayer, callback },
    message
  });
  if ('' !== player_input && requiredPlayer.id === player.id) {
    let card_id = parseInt(player_input);
    if (card_id) {
      return callback(null, card_id);
    } else {
      return pending(pending_message);
    }
  }
  return pending(pending_message);
};

const pick_option = (
  { player: requiredPlayer, options, callback },
  player = null,
  player_input = ''
) => {
  if (options.length) {
    const pending_message = [
      `Player id:${player.id}`,
      `pick an option:`,
      options.map((option, i) => `\n${i}: ${option}`).join('')
    ].join('\n');
    const pending = message => ({
      function: pick_option,
      arguments: { player, options, callback },
      message
    });
    if ('' !== player_input && requiredPlayer.id === player.id) {
      if (options.includes(player_input)) {
        return callback(null, player_input);
      } else {
        return pending(pending_message);
      }
    }
    return pending(pending_message);
  } else {
    callback('empty options');
  }
};

module.exports = {
  pick_card_id,
  pick_option
};
