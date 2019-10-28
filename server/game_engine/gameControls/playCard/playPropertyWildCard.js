const gameActions = require('../../gameActions');
const userControls = require('../../userControls');
const playPropertyCard = require('./playPropertyCard');

module.exports = playPropertyWildCard = ({ Game, player, card, callback }) => {
  userControls.pickCardColor({
    Game,
    player,
    card,
    callback: ({ error, option: newColor, cancelled, forced }) => {
      if (error) {
        callback({ error });
      } else if (cancelled || forced) {
        callback({ cancelled, forced });
      } else {
        gameActions.switchColor({ card, newColor });
        playPropertyCard({ Game, player, card, callback });
      }
    }
  });
};
