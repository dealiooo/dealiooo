const moveCard = require('./moveCard');
const removeEmptyPropertySets = require('./removeEmptyPropertySets');

module.exports = (source, destination) => {
  source.player.field.property_cards.push([]);
  destination.player.field.property_cards.push([]);
  moveCard(
    source.pile,
    destination.player.field.property_cards[
      destination.player.field.property_cards.length - 1
    ],
    source.card
  );
  moveCard(
    destination.pile,
    source.player.field.property_cards[
      source.player.field.property_cards.length - 1
    ],
    destination.card
  );
  removeEmptyPropertySets(source.player);
  removeEmptyPropertySets(destination.player);
};
