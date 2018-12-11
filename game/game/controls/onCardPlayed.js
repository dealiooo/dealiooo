export const onCardPlayed = card => {
  // increment cards_played except just-say-no

  // only skip increment if just-say-no is played as a counter card
  //if (card.name !== 'just-say-no') {
  window.cards_played++;
  //}

  window.cards_played_list.push(card);
};
