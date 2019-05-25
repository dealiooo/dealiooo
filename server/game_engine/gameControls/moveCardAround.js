const gameActions = require('../gameActions');
const userActions = require('../userActions');
const userControls = require('../userControls');

const moveCardAround = ({ Game, player, callback }) => {
  let pileNames = ['propertyCards', 'buildingCards'];
  userControls.pickFieldCard({
    Game,
    player,
    pileNames,
    callback: ({ error, cancelled, forced, card, source }) => {
      if (error) {
        callback({ error });
      } else if (cancelled || forced) {
        callback({ cancelled, forced });
      } else {
        if (card.colors.length) {
          pickCardColor({ Game, player, card, source, callback });
        } else {
          moveCard({ Game, player, card, source, callback });
        }
      }
    }
  });
};

const pickCardColor = ({ Game, player, card, source, callback }) => {
  userControls.pickCardColor({
    Game,
    player,
    card,
    callback: ({ error, cancelled, forced, color }) => {
      if (error) {
        callback({ error });
      } else if (cancelled) {
        moveCardAround({ Game, player, callback });
      } else if (forced) {
        callback({ forced });
      } else {
        gameActions.switchColor({ card, newColor: color });
        moveCard({ Game, player, card, source, callback });
      }
    }
  });
};

const moveCard = ({ Game, player, card, source, callback }) => {
  let { destinations, destinationIndexes } = gameActions.getDestinations[
    card.type
  ]({ Game, player, card, source: source.pile });
  if (destinations.length) {
    userActions.pickOption({
      Game,
      requiredPlayerId: player.id,
      message: 'picking a destination',
      options: destinationIndexes,
      callback: ({ error, cancelled, forced, option }) => {
        if (error) {
          callback({ error });
        } else if (cancelled) {
          if (card.colors.length) {
            pickCardColor({ Game, player, card, source, callback });
          } else {
            moveCardAround({ Game, player, callback });
          }
        } else if (forced) {
          callback({ forced });
        } else {
          gameActions.moveCard({
            source: source.pile,
            destination: destinations[parseInt(option)],
            card
          });
          gameActions.removeEmptyPropertySets({ player });
          callback({});
        }
      }
    });
  } else {
    callback({});
  }
};

module.exports = moveCardAround;
