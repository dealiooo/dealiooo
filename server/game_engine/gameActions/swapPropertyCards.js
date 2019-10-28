const addEmptyPropertySet = require('./addEmptyPropertySet');
const moveCard = require('./moveCard');
const removeEmptyPropertySets = require('./removeEmptyPropertySets');

module.exports = ({ source, destination }) => {
  addEmptyPropertySet({ player: source.player });
  addEmptyPropertySet({ player: destination.player });
  moveCard({
    source: source.pile,
    destination:
      destination.player.field.propertyCards[
        destination.player.field.propertyCards.length - 1
      ],
    card: source.card
  });
  moveCard({
    source: destination.pile,
    destination:
      source.player.field.propertyCards[
        source.player.field.propertyCards.length - 1
      ],
    card: destination.card
  });
  removeEmptyPropertySets({ player: source.player });
  removeEmptyPropertySets({ player: destination.player });
};
