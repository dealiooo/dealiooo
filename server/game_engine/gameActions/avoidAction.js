const { pickYesOrNo } = require('./../userControls');
const moveCard = require('./moveCard');

const sourcePlayerAvoid = ({ Game, player, targetPlayer, callback }) => {
  pickYesOrNo({
    Game,
    player,
    question: 'do you want to play just say no?',
    callback: ({ error, play, forced }) => {
      if (error) {
        callback({ avoid: true });
      } else if (forced) {
        callback({ avoid: true, forced });
      } else if (play) {
        let found = false;
        for (let i = 0; i < player.hand.length; i++) {
          if ('just-say-no' === player.hand[i].name) {
            Game.cardsPlayedList.push(player.hand[i]);
            moveCard({
              source: player.hand,
              destination: player.field.actionCards,
              card: player.hand[i]
            });
            found = true;
            break;
          }
        }
        if (!found) {
          callback({ avoid: true });
        } else {
          targetPlayerAvoid({
            Game,
            player: targetPlayer,
            sourcePlayer: player,
            callback
          });
        }
      } else {
        callback({ avoid: true });
      }
    }
  });
};

const targetPlayerAvoid = ({
  Game,
  player,
  sourcePlayer,
  forced,
  callback
}) => {
  if (forced) {
    callback({ avoid: true, forced });
  } else {
    pickYesOrNo({
      Game,
      player,
      question: 'do you want to play just say no?',
      callback: ({ error, play, forced }) => {
        if (error) {
          callback({ avoid: false });
        } else if (forced) {
          callback({ avoid: false });
        } else if (play) {
          let found = false;
          for (let i = 0; i < player.hand.length; i++) {
            if ('just-say-no' === player.hand[i].name) {
              Game.cardsPlayedList.push(player.hand[i]);
              moveCard({
                source: player.hand,
                destination: player.field.actionCards,
                card: player.hand[i]
              });
              found = true;
              break;
            }
          }
          if (!found) {
            callback({ avoid: false });
          } else {
            sourcePlayerAvoid({
              Game,
              player: sourcePlayer,
              targetPlayer: player,
              callback
            });
          }
        } else {
          callback({ avoid: false });
        }
      }
    });
  }
};

module.exports = targetPlayerAvoid;
