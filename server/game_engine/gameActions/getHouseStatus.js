module.exports = ({ Game, propertySet }) => {
  return (
    propertySet.length ===
    Game.rentValues[propertySet[0].mainColor].maxSetSize + 1
  );
};
