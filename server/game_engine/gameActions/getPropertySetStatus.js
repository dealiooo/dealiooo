module.exports = ({Game, propertySet}) => {
  let color = propertySet[0].mainColor;
  let wildcardCount = propertySet.filter(
    card => 'property-wildcard' === card.type
  ).length;
  if (wildcardCount === Game.rentValues[color].maxSize) {
    return false;
  }
  return propertySet.length >= Game.rentValues[color].maxSize;
};
