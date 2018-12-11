import * as gameActions from '../actions';
import * as userActions from '../userActions';

export const endTurn = callback => {
  window.cards_played = 0;
  window.cards_played_list = [];

  const player = window.players[window.turn_count % window.player_count];
  if (gameActions.getHasSevenOrLessCards(player)) {
    window.players.map(player =>
      gameActions.movePile(
        player.field.action_cards,
        window.discard,
        player.field.action_cards
      )
    );
    callback(null);
  } else {
    userActions.pick_hand_card(player, (error, card) => {
      if (error) {
        callback(error);
      } else {
        gameActions.moveCard(player.hand, window.discard, card);
        endTurn(callback);
      }
    });
  }
};
