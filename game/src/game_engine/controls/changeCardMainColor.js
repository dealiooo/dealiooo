const gameActions = require('../actions');

const changeCardMainColor = (card, color) => {
  gameActions.switchColor(card, color);
};

module.exports = changeCardMainColor;
