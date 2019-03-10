const userActions = require('../userActions');

module.exports = (Game, player, question, callback) =>
  userActions.pick_option(Game, {
    player,
    options: ["Yes", "No"],
    message: question + "\n1. Yes\n2. No",
    callback: (error, playerInput) => {
      if (error) {
        callback(error);
      } else if ("Yes" === playerInput) {
        callback(null, true);
      } else {
        callback(null, false);
      }
    }
  });