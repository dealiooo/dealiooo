export const cardNameToDisplayName = cardName =>
  cardName
    .replace(/-/g, ' ')
    .replace(/dollar/g, '')
    .replace(/_/g, ' ')
    .replace(
      /\w\S*/g,
      txt => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
    );

export const computerTotalCardValues = cards => {
  return []
    .concat(...cards)
    .reduce((accumlator, currentCard) => accumlator + currentCard.value, 0);
};
