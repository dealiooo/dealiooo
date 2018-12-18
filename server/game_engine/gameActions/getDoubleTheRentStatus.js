module.exports = action_cards =>
  action_cards.filter(card => 'double-the-rent' === card.name).length;
