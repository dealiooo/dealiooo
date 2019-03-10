const gameActions = require('../../../gameActions');
const userControls = require('../../../userControls');

const processSlyDeal = (Game, player, pickedPlayer, card, source, callback) => {
  if ('property_cards' === source.pileName) {
    if (gameActions.getPropertySetStatus(Game, source.pile)) {
      playSlyDeal(player, card, callback);
    } else {
      player.field.property_cards.push([]);
      gameActions.moveCard(
        source.pile,
        player.field.property_cards[player.field.property_cards.length - 1],
        card
      );
      gameActions.removeEmptyPropertySets(pickedPlayer);
      callback(null, card);
    }
  } else {
    gameActions.moveCard(source.pile, player.field[source.pileName], card);
    callback(null, card);
  }
};

module.exports = (Game, player, _, callback) => {
  userControls.pickTargetPlayer(Game, player, (error, pickedPlayer) => {
    if (error) {
      callback(error);
    } else {
      gameActions.avoidAction(Game, targetPlayer, player, (_, avoid) => {
        if (avoid) {
          callback(null, _);
        } else {
          userControls.pickFieldCard(
            Game,
            pickedPlayer,
            ['property_cards', 'building_cards'],
            (error, card, source) => {
              if (error) {
                callback(error);
              } else {
                processSlyDeal(Game, player, pickedPlayer, card, source, callback);
              }
            }
          );
        }
      });
    }
  });
};
