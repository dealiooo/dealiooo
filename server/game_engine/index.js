const gameActions = require('./game_actions');

const start_game = () => {
  gameActions.getPlayer(player_id).then(player => {
    if (player) {
      return {};
      // gameControl . startGame()
      // return pending
    }
    return invalid_player_prompt(oldPending);
  });
};

const leave_game = player_id => {
  gameActions.getPlayer(player_id).then(player => {
    if (player) {
      return {}; // gameControl . playerLeave(player_id)
    }
    return invalid_player_prompt(oldPending);
  });
};

const click = (player_id, player_input, oldPending) =>
  gameActions.getPlayer(player_id).then(player => {
    if (player) {
      return oldPending.function(oldPending.arguments, player, player_input);
    }
    return invalid_player_prompt(oldPending);
  });

const end_turn = player_id => {
  gameActions.getPlayer(player_id).then(player => {
    if (player) {
      return {};
      // gameControl .endTurn(player_id)
      // return pending
    }
    return invalid_player_prompt(oldPending);
  });
};

const general_prompt = player_id => {
  return JSON.stringify({ error: 'todo' });
};

const players_prompt = player_id => {
  return JSON.stringify({ error: 'todo' });
};

const options_prompt = player_id => {
  return JSON.stringify({ error: 'todo' });
};

const invalid_player_prompt = pending => ({
  message: `invalid player`,
  pending
});

module.exports = {
  start_game,
  leave_game,
  click,
  end_turn,
  general_prompt,
  players_prompt,
  options_prompt
};
