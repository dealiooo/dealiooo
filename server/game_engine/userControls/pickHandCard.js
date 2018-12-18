const userActions = require('./../userActions');

const pickHandCard = (Game, player, callback) => {
  userActions.pickCardId(Game, {
    player,
    callback: (error, id) => {
      if (error) {
        callback(error);
      } else {
        let found = false;
        let index = null;
        for (let i = 0; i < player.hand.length; i++) {
          if (id === player.hand[i].id) {
            found = true;
            index = i;
          }
        }
        if (found) {
          callback(null, player.hand[index]);
        } else {
          pickHandCard(Game, player, callback);
        }
      }
    }
  });
};

module.exports = pickHandCard;
