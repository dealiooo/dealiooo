module.exports = (Game, card) => {
  Game.cards_played++;
  Game.cards_played_list.push(card);
};
