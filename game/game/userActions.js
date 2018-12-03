export const pick_card_id = callback => {
  if ('' === window.user_input) {
    console.log('waiting for window.user_input...');
    window.setTimeout(pick_hand_card, 1000);
  } else {
    let card_id = parseInt(window.user_input);
    window.user_input = '';
    callback(card_id);
  }
};

export const pick_hand_card = (player, callback) => {
  pick_card_id(id => {});
};
