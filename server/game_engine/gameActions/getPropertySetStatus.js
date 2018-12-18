module.exports = (Game, property_set) => {
  let color = property_set[0].mainColor;
  let wildcard_count = property_set.filter(
    card => 'property-wildcard' === card.type
  ).length;
  if (wildcard_count === Game.rent_values[color].maxSize) {
    return false;
  }
  return property_set.length >= Game.rent_values[color].maxSize;
};
