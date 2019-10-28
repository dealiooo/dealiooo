module.exports = ({ player }) => {
  player.field.propertyCards = player.field.propertyCards.filter(
    set => set.length
  );
};
