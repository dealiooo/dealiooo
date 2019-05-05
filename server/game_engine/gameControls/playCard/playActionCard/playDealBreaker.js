const gameActions = require('../../../gameActions');
const userActions = require('../../../userActions');
const userControls = require('../../../userControls');

const playDealBreaker = ({ Game, player, card, callback }) => {
  userControls.pickTargetPlayer({
    Game,
    player,
    callback: ({ error, targetPlayer, cancelled, forced }) => {
      if (error || cancelled || forced) {
        callback({ error, cancelled, forced });
      } else {
        gameActions.moveCard({
          source: player.hand,
          destination: player.field.actionCards,
          card
        });
        gameActions.onNonCounterCardPlayed({ Game, card });
        gameActions.avoidAction({
          Game,
          player: targetPlayer,
          sourcePlayer: player,
          callback: ({ avoid, forced }) => {
            if (avoid || forced) {
              callback({ card });
            } else {
              let {
                destinations,
                destinationIndexes
              } = gameActions.getDestinations['all']({
                Game,
                player: targetPlayer,
                card,
                source: targetPlayer.field.propertyCards
              });
              selectPropertySet({
                Game,
                player,
                card,
                destinations,
                destinationIndexes,
                callback
              });
            }
          }
        });
      }
    }
  });
};

const selectPropertySet = ({
  Game,
  player,
  card,
  destinations,
  destinationIndexes,
  callback
}) => {
  userActions.pickOption({
    Game,
    requiredPlayerId: player.id,
    message: 'selecting a property set',
    options: destinationIndexes,
    callback: ({ error, option, cancelled }) => {
      if (error) {
        callback({ error });
      } else if (cancelled) {
        console.log('dealbreaker - cant cancel this one');
        selectPropertySet({
          Game,
          player,
          card,
          destinations,
          destinationIndexes,
          callback
        });
      } else {
        processPropertySet({
          Game,
          player,
          card,
          destinations,
          option,
          callback
        });
      }
    }
  });
};

const processPropertySet = ({
  Game,
  player,
  card,
  destinations,
  indexString,
  callback
}) => {
  if (
    gameActions.getPropertySetStatus({
      Game,
      propertySet: destinations[parseInt(indexString)]
    })
  ) {
    player.field.propertyCards.push([]);
    gameActions.movePile({
      source: destinations[parseInt(indexString)],
      destination:
        player.field.propertyCards[player.field.propertyCards.length - 1]
    });
    gameActions.removeEmptyPropertySets({ player: pickedPlayer });
    callback({ card });
  } else {
    playDealBreaker({ Game, player, card, callback });
  }
};

module.exports = playDealBreaker;
