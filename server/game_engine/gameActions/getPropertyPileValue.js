module.exports = property_field => {
  let sum = 0;
  property_field.map(set => set.map(card => (sum += card.value)));
  return sum;
};
