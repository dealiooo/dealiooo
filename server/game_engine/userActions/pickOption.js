const setPending = ({ Game, requiredPlayer, options, message, callback }) => {
  if (!message) {
    message = [
      `Player id:${requiredPlayer.id}`,
      `pick an option:` /*,
      options.map((option, i) => `\n${i}: ${option}`).join('')*/
    ].join('\n');
  }
  Game.pendingForUserInput = {
    function: pickOption,
    arguments: { Game, player: requiredPlayer, options, message, callback },
    message
  };
};

const pickOption = ({
  Game,
  player: requiredPlayer,
  playerId,
  options,
  message,
  cancelled,
  forced,
  callback
}) => {
  if (playerId && requiredPlayer.id !== playerId) {
    return;
  }
  if (options.length) {
    if (cancelled) {
      callback({ cancelled });
    } else if (forced) {
      callback({ option: options[0], forced });
    } else if ('' === Game.userInput) {
      setPending({ Game, requiredPlayer, options, message, callback });
    } else {
      let option = parseInt(Game.userInput);
      if (-1 < option && option < options.length) {
        Game.userInput = '';
        Game.pendingForUserInput = null;
        callback({ option: options[option] });
        return `\nYou picked:  \n ◾ ${option}: ${options[option]}`;
      }
    }
  } else {
    callback({ error: 'empty options' });
  }
};

module.exports = pickOption;
