const setPending = (Game, requiredPlayer, options, callback) => {
  let message = [
    `Player id:${requiredPlayer.id}`,
    `pick an option:`,
    options.map((option, i) => `\n${i}: ${option}`).join('')
  ].join('\n');
  Game.pending_for_user_input = {
    function: pickOption,
    arguments: { player: requiredPlayer, options, callback },
    message
  };
};

const pickOption = (
  Game,
  { player: requiredPlayer, options, callback },
  player_id = null
) => {
  if (player_id && requiredPlayer.id !== player_id) {
    return;
  }
  if (options.length) {
    if ('' === Game.user_input) {
      setPending(Game, requiredPlayer, options, callback);
    } else {
      let option = parseInt(Game.user_input);
      if (-1 < option && option < options.length) {
        Game.user_input = '';
        Game.pending_for_user_input = null;
        callback(null, options[option]);
        return `\nYou picked:  \n ◾ ${option}: ${options[option]}`;
      }
    }
  } else {
    callback('empty options');
  }
};

module.exports = pickOption;
