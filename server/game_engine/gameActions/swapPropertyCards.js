const gameActions = require('./');

module.exports = (source, destination) => {
  source.player.field.property_cards.push([]);
  destination.player.field.property_cards.push([]);
  gameActions.moveCard(
    source.pile,
    destination.player.field.property_cards[
      destination.player.field.property_cards.length - 1
    ],
    source.card
  );
  gameActions.moveCard(
    destination.pile,
    source.player.field.property_cards[
      source.player.field.property_cards.length - 1
    ],
    destination.card
  );
  gameActions.removeEmptyPropertySets(source.player);
  gameActions.removeEmptyPropertySets(destination.player);
};
