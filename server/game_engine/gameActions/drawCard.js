const getDeckEmpty = require('./getDeckEmpty');
const getDiscardEmpty = require('./getDiscardEmpty');
const moveCard = require('./moveCard');
const movePile = require('./movePile');
const shufflePile = require('./shufflePile');

module.exports = ({ Game, player }) => {
  if (!getDeckEmpty({ Game })) {
    moveCard({
      source: Game.deck,
      destination: player.hand,
      card: Game.deck[Game.deck.length - 1]
    });
  } else if (!getDiscardEmpty({ Game })) {
    shufflePile({ Game, source: Game.discard });
    movePile({ source: Game.discard, destination: Game.deck });
    moveCard({
      source: Game.deck,
      destination: player.hand,
      card: Game.deck[Game.deck.length - 1]
    });
  }
};
