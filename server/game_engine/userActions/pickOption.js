const setPending = ({ Game, requiredPlayerId, options, message, callback }) => {
  if (!message) {
    message = 'pick an option';
  }
  Game.pendingForUserInput = {
    function: pickOption,
    arguments: { Game, requiredPlayerId, options, message, callback },
    message
  };
};

const pickOption = ({
  Game,
  requiredPlayerId,
  playerId,
  options,
  message,
  cancelled,
  forced,
  callback
}) => {
  if (playerId && requiredPlayerId !== playerId) {
    return;
  }
  if (options.length) {
    if (cancelled) {
      callback({ cancelled });
    } else if (forced) {
      callback({ option: options[0], forced });
    } else if ('' === Game.userInput) {
      setPending({ Game, requiredPlayerId, options, message, callback });
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
