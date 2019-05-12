const gameActions = require('../../gameActions');
const userActions = require('../../userActions');

const playBuildingCard = ({ Game, player, card, callback }) => {
  userActions.pickOption({
    Game,
    requiredPlayerId: player.id,
    message: 'play as money or property?',
    options: ['bank', 'properties'],
    callback: ({ error, option, cancelled, forced }) => {
      if (error) {
        callback({ error });
      } else if (cancelled) {
        callback({ cancelled });
      } else {
        if ('bank' === option) {
          playAsMoney({ Game, player, card, forced, callback });
        } else {
          playAsProperty({ Game, player, card, forced, callback });
        }
      }
    }
  });
};

const playAsMoney = ({ Game, player, card, forced, callback }) => {
  gameActions.moveCard({
    source: player.hand,
    destination: player.field.bankCards,
    card
  });
  gameActions.onNonCounterCardPlayed({ Game, card });
  callback({ card, forced });
};

const playAsProperty = ({ Game, player, card, forced, callback }) => {
  let { destinations, destinationIndexes } = gameActions.getDestinations[
    card.type
  ]({ Game, player, card, source: player.hand });
  if (destinations.length) {
    userActions.pickOption({
      Game,
      requiredPlayerId: player.id,
      message: 'picking a destination',
      options: destinationIndexes,
      forced,
      callback: ({ error, option, cancelled, forced }) => {
        if (error) {
          callback({ error });
        } else if (cancelled) {
          playBuildingCard({ Game, player, card, callback });
        } else {
          gameActions.moveCard({
            source: player.hand,
            destination: destinations[parseInt(option)],
            card
          });
          gameActions.onNonCounterCardPlayed({ Game, card });
          callback({ card, forced });
        }
      }
    });
  } else {
    callback({ error: 'cannot play that building card: no destination' });
  }
};

module.exports = playBuildingCard;
