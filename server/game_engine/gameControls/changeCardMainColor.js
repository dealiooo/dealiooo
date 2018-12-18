const gameActions = require('../gameActions');

module.exports = (card, color) => {
  gameActions.switchColor(card, color);
};
