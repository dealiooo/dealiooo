module.exports = player => {
  player.field.property_cards = player.field.property_cards.filter(
    set => set.length
  );
};
