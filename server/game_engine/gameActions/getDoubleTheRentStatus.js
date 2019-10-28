const countered = ({ Game, targetPlayer, sourcePlayer, card }) => {
  let returnValue = false;
  let targetCounterCards = targetPlayer.field.actionCards.filter(
    card => 'just-say-no' === card.name
  );
  if (!targetCounterCards) {
    return returnValue;
  }
  let sourceCounterCards = sourcePlayer.field.actionCards.filter(
    card => 'just-say-no' === card.name
  );
  for (let i = 0; i < Game.cardsPlayedList.length; i++) {
    if (Game.cardsPlayedList[i] === card) {
      for (let j = i + 1; j < Game.cardsPlayedList.length; j++) {
        if (
          !returnValue &&
          targetCounterCards.filter(card => card === Game.cardsPlayedList[j])
            .length
        ) {
          returnValue = true;
          continue;
        }
        if (
          returnValue &&
          sourceCounterCards.filter(card => card === Game.cardsPlayedList[j])
            .length
        ) {
          returnValue = false;
          continue;
        }
        return returnValue;
      }
    }
  }
};

module.exports = ({ Game, targetPlayer, sourcePlayer }) => {
  let doubleTheRentCards = sourcePlayer.field.actionCards.filter(
    card => 'double-the-rent' === card.name
  );
  let count = doubleTheRentCards.length;
  let negated = 0;
  doubleTheRentCards.map(card => {
    if (countered({ Game, targetPlayer, sourcePlayer, card })) {
      negated++;
    }
  });
  return count - negated;
};
