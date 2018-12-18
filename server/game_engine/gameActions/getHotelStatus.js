module.exports = (Game, property_set) => {
  return (
    property_set.length ===
    Game.rent_values[property_set[0].mainColor].maxSize + 2
  );
};
