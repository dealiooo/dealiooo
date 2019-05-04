const gameActions = require('../../gameActions');
const userActions = require('../../userActions');
const userControls = require('../../userControls');

const playDualColorRentCard = ({Game, player, card, callback}) => {
  userActions.pickOption({
    Game,
    player,
    options: ['bank', 'action'],
    callback: ({error, option, cancelled, forced}) => {
      if (error) {
        callback({error});
      } else if (cancelled) {
        callback({cancelled});
      } else if ('bank' === option) {
        playAsMoney({player, card, forced, callback});
      } else {
        playAsAction({Game, player, card, forced, callback});
      }
    }
  });
};

const playAsMoney = ({player, card, forced, callback}) => {
  gameActions.moveCard({
    source: player.hand, 
    destination: player.field.bankCards, 
    card
  });
  gameActions.onNonCounterCardPlayed({Game, card});
  callback({card, forced});
};

const playAsAction = ({Game, player, card, callback}) => {
  userControls.pickCardColor({
    Game, 
    player, 
    card, 
    callback: ({error, option: newColor, cancelled, forced}) => {
    if (error) {
      callback({error});
    } else if (cancelled) {
      playDualColorRentCard({Game, player, card, callback});
    } else {
      gameActions.switchColor({card, newColor});
      let { destinations, destinationIndexes } = gameActions.getDestinations[
        card.type
      ]({Game, player, card, source: player.hand});
      if (destinations.length) {
        pickPropertySetToRent({
          Game,
          player,
          card,
          destinations,
          destinationIndexes,
          forced,
          callback
        });
      } else {
        callback({error:'cannot play rent: no property set with matching color'});
      }
    }
  }});
};

const pickPropertySetToRent = ({
  Game,
  player,
  card,
  destinations,
  destinationIndexes,
  forced,
  callback
}) => {
  userActions.pickOption({
    Game,
    player,
    options: destinationIndexes,
    forced,
    callback: ({error, option: destinationIndex, cancelled, forced}) => {
      if (error) {
        callback({error});
      } else if (cancelled) {
        playAsAction({Game, player, card, callback});
      } else {
        gameActions.moveCard({
          source: player.hand, 
          destination: player.field.actionCards, 
          card
        });
        gameActions.onNonCounterCardPlayed({Game, card});
        collectRent({Game, player, card, destinations, destinationIndex, forced, callback});
      }
    }
  });
};

const collectRent = ({Game, player, card, destinations, destinationIndex, forced, callback}) => {
  let playerActionCounter = ({index, forced}) => {
    if (player.id !== Game.players[index].id) {
      gameActions.avoidAction({
        Game, 
        player: Game.players[index], 
        sourcePlayer: player,
        forced,
        callback: ({avoid, forced}) => {
          if (avoid) {
            done({index, forced});
          } else {
            gameActions.payRent({
              Game,
              payee: Game.players[index],
              player,
              amount: gameActions.getRentValue({
                Game, 
                targetPlayer: Game.players[index], 
                player, 
                propertySet: destinations[parseInt(destinationIndex)]
              }),
              callback: ({error, forced}) => {
                if (error) {
                  callback({error});
                } else {
                  done({index, forced});
                }
              }
            });
          }
        }
      });
    } else {
      done({index});
    }
  }
  var done = ({index, forced}) => {
    if (index == Game.players.length) {
      callback({card, forced});
    } else {
      playerActionCounter(({index:index + 1, forced}));
    }
  }
  playerActionCounter(({index:0, forced}));
};

module.exports = playDualColorRentCard;