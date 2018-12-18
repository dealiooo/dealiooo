import * as gameActions from '../../actions';

export const playMoneyCard = (Game, player, card, callback) => {
  gameActions.moveCard(player.hand, player.field.bank_cards, card);
  callback(null, card);
};
