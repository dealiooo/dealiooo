const onCardPlayed = (Game, card) => {
  // increment cards_played except just-say-no
  // only skip increment if just-say-no is played as a counter card
  //if (card.name !== 'just-say-no') {
  Game.cards_played++;
  Game.cards_played_list.push(card);
};

module.exports = onCardPlayed;
