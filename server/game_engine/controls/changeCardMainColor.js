const gameActions = require('../actions');

module.exports = (card, color) => {
  gameActions.switchColor(card, color);
};
