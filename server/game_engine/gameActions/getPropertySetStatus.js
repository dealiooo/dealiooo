module.exports = ({ Game, propertySet }) => {
  let color = propertySet[0].mainColor;
  console.log(`color = ${color}`);
  let wildcardCount = propertySet.filter(
    card => 'property-wildcard' === card.type
  ).length;
  if (wildcardCount === Game.rentValues[color].maxSetSize) {
    return false;
  }
  return propertySet.length >= Game.rentValues[color].maxSetSize;
};
