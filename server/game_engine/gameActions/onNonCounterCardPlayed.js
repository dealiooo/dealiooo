module.exports = ({Game, card}) => {
  Game.cardsPlayed++;
  Game.cardsPlayedList.push(card);
};
