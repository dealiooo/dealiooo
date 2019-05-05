const userActions = require('./../userActions');

const pickHandCard = ({ Game, player, forced, callback }) => {
  userActions.pickCardId({
    Game,
    requiredPlayerId: player.id,
    message: 'picking a hand card',
    forced,
    callback: ({ cardId, cancelled, forced }) => {
      if (cancelled) {
        callback({ cancelled });
      } else if (forced) {
        callback({ card: player.hand[player.hand.length - 1], forced });
      } else {
        let found = false;
        let index = null;
        for (let i = 0; i < player.hand.length; i++) {
          if (cardId === player.hand[i].id) {
            found = true;
            index = i;
          }
        }
        if (found) {
          callback({ card: player.hand[index] });
        } else {
          pickHandCard({ Game, player, callback });
        }
      }
    }
  });
};

module.exports = pickHandCard;
