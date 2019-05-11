const gameActions = require('../../gameActions');
const userActions = require('../../userActions');
const userControls = require('../../userControls');

const playRentWildCard = ({ Game, player, card, callback }) => {
  userActions.pickOption({
    Game,
    requiredPlayerId: player.id,
    message: 'play as money or action?',
    options: ['bank', 'action'],
    callback: ({ error, option, cancelled, forced }) => {
      if (error) {
        callback({ error });
      } else if (cancelled || forced) {
        callback({ cancelled, forced });
      } else if (option === 'bank') {
        playAsMoney({ player, card, callback });
      } else {
        playAsAction({ Game, player, card, callback });
      }
    }
  });
};

const playAsMoney = ({ player, card, callback }) => {
  gameActions.moveCard({
    source: player.hand,
    destination: player.field.bankCards,
    card
  });
  gameActions.onNonCounterCardPlayed({ Game, card });
  callback({ card });
};

const playAsAction = ({ Game, player, card, callback }) => {
  userControls.pickCardColor({
    Game,
    player,
    card,
    callback: ({ error, option: newColor, cancelled, forced }) => {
      if (error) {
        callback({ error });
      } else if (cancelled) {
        playRentWildCard({ Game, player, card, callback });
      } else if (forced) {
        callback({ forced });
      } else {
        gameActions.switchColor({ card, newColor });
        let { destinations, destinationIndexes } = gameActions.getDestinations[
          card.type
        ](Game, player, card, player.hand);
        if (destinations.length) {
          pickPropertySetToRent({
            Game,
            player,
            card,
            destinations,
            destinationIndexes,
            callback
          });
        } else {
          callback({
            error: 'cannot play rent card: no property set with matching color'
          });
        }
      }
    }
  });
};

const pickPropertySetToRent = ({
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
    message: 'picking a property set to rent',
    options: destinationIndexes,
    callback: ({ error, option: index, cancelled, forced }) => {
      if (error) {
        callback({ error });
      } else if (cancelled) {
        playAsAction({ Game, player, card, callback });
      } else if (forced) {
        callback({ forced });
      } else {
        collectRent({
          Game,
          player,
          card,
          destinations,
          destinationIndexes,
          index,
          callback
        });
      }
    }
  });
};

const collectRent = ({
  Game,
  player,
  card,
  destinations,
  destinationIndexes,
  index,
  callback
}) => {
  userControls.pickTargetPlayer({
    Game,
    player,
    callback: ({ error, targetPlayer, cancelled, forced }) => {
      if (error) {
        callback({ error });
      } else if (cancelled) {
        pickPropertySetToRent({
          Game,
          player,
          card,
          destinations,
          destinationIndexes,
          callback
        });
      } else if (forced) {
        callback({ forced });
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
            if (avoid) {
              callback({ forced });
            } else {
              gameActions.payRent({
                Game,
                payee: targetPlayer,
                player,
                amount: gameActions.getRentValue({
                  Game,
                  targetPlayer,
                  sourcePlayer: player,
                  propertySet: destinations[parseInt(index)]
                }),
                callback: ({ error }) => {
                  if (error) {
                    callback({ error });
                  } else {
                    callback({ card, forced });
                  }
                }
              });
            }
          }
        });
      }
    }
  });
};

module.exports = playRentWildCard;
