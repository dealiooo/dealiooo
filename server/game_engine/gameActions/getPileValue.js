module.exports = ({ pile }) => {
  let sum = 0;
  pile.map(card => (sum += card.value));
  return sum;
};
