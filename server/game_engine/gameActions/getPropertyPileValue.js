module.exports = ({propertyField}) => {
  let sum = 0;
  propertyField.map(set => set.map(card => (sum += card.value)));
  return sum;
};
