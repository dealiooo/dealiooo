import * as gameControls from './controls';
import * as userActions from './userActions';

const pretty_print_cards = cards => {
  let str = '';
  for (let i = 0; i < cards.length; i++) {
    str += `* ( ${cards[i].id} - ${cards[i].name} 💰${cards[i].value} 🎨    ${
      cards[i].mainColor ? cards[i].mainColor : cards[i].colors.join(',')
    })`;
    if (cards.length > 1) {
      str += '\n';
    }
  }
  return str;
};

const game = {
  start: () => {
    gameControls.startGame();
    game.apply_start_turn();
  },
  input: user_input => {
    window.user_input = user_input;
    let return_value = '';
    let pending = window.pending_for_user_input;
    if (pending) {
      return_value = pending.function(pending.arguments);
    } else if (null !== window.winner) {
      return_value = game.apply_player_won();
    } else {
      return_value = '\ngame is not running :(';
    }
    return return_value;
  },
  get_prompt: () => {
    return {
      general_info: game.prompt_general_info(),
      player_info: game.prompt_player_info(),
      options_info: game.prompt_options_info()
    };
  },
  prompt_general_info: () => {
    let return_value =
      `\nturn count: ${window.turn_count}` +
      `\ndeck count: ${window.deck.length}` +
      `\ndiscard:  ${
        window.discard.length === 0
          ? '-'
          : window.discard[window.discard.length - 1].id
      }` +
      `\ncards_played: ${window.cards_played}`;
    return return_value;
  },
  prompt_options_info: () => {
    let return_value = '';
    let pending = window.pending_for_user_input;
    if (pending) {
      return_value += pending.message;
    }
    return return_value;
  },
  prompt_player_info: () => {
    let turn_player = window.turn_count % window.player_count;
    let return_value = [];
    let size = window.players.length;
    for (let i = 0; i < size; i++) {
      let str = '';
      if (window.players[i].id === window.players[turn_player].id) {
        str += `\nCurrent Turn: Player (id:${window.players[i].id})`;
      } else {
        str += `\nPlayer (id:${window.players[i].id})`;
      }
      str += `\n✌️ Hand:\n`;
      if (i === turn_player) {
        str += '\n' + pretty_print_cards(window.players[i].hand) + '';
      } else {
        str += window.players[i].hand.length;
      }
      str += `\n🏦 Bank: \n`;
      str += '[' + pretty_print_cards(window.players[i].field.bank_cards) + ']';
      str += `\n🏠 Properties: \n`;
      if (window.players[i].field.property_cards.length === 0) {
        str += '[]';
      } else {
        window.players[i].field.property_cards.map(
          property_set => (str += `\n[${pretty_print_cards(property_set)}]`)
        );
      }
      str += `\n🚴 Actions: \n`;
      str +=
        '[' + pretty_print_cards(window.players[i].field.action_cards) + ']';
      str += `\n🏢 Buildings: \n`;
      str +=
        '[' + pretty_print_cards(window.players[i].field.building_cards) + ']';
      return_value.push(str);
    }
    return return_value;
  },
  prompt_basic_options: () => {
    let apply_basic_options = {
      'Play Hand Card': game.prompt_play_hand_card,
      'Move Card Around': game.prompt_move_card_around,
      'End Turn': game.apply_end_turn
    };
    let player = window.players[window.turn_count % window.player_count];
    userActions.pick_basic_options(player, (error, option) => {
      if (error) {
        console.log(error);
      } else {
        apply_basic_options[option]();
      }
    });
  },
  prompt_play_hand_card: () => {
    let apply_play_hand_card = {
      'Pick Card Id': game.prompt_hand_card_id,
      'Go Back': game.prompt_basic_options
    };
    let player = window.players[window.turn_count % window.player_count];
    userActions.play_hand_card(player, (error, option) => {
      if (error) {
        console.log(error);
        game.prompt_basic_options();
      } else {
        apply_play_hand_card[option]();
      }
    });
  },
  prompt_move_card_around: () => {
    let apply_move_card_around = {
      'Pick Source and Destination': game.prompt_source_and_destination,
      'Go Back': game.prompt_basic_options
    };
    let player = window.players[window.turn_count % window.player_count];
    userActions.move_card_around(player, (error, option) => {
      if (error) {
        console.log(error);
        game.prompt_basic_options();
      } else {
        apply_move_card_around[option]();
      }
    });

    if (gameControls.computeWinCondition()) {
      return game.apply_player_won();
    }
  },
  prompt_hand_card_id: () => {
    let player = window.players[window.turn_count % window.player_count];
    userActions.pick_hand_card(player, (error, card) => {
      if (error) {
        console.log(error);
        game.prompt_basic_options();
      } else {
        game.apply_play_card(card);
      }
    });
  },
  prompt_source_and_destination: () => {
    let player = window.players[window.turn_count % window.player_count];
    gameControls.moveCardAround(player, error => {
      if (error) {
        console.log(error);
      }
      if (!gameControls.computeWinCondition(player)) {
        game.prompt_basic_options();
      }
    });
  },
  apply_play_card: card => {
    let player = window.players[window.turn_count % window.player_count];
    gameControls.playCard(player, card, (error, card) => {
      if (error) {
        console.log(error);
        game.prompt_basic_options();
      } else {
        gameControls.onCardPlayed(card);
        if (gameControls.computeWinCondition()) {
          return game.apply_player_won();
        } else {
          if (3 <= window.cards_played) {
            game.apply_end_turn();
          } else {
            game.prompt_basic_options();
          }
        }
      }
    });
  },
  apply_start_turn: () => {
    let player = window.players[window.turn_count % window.player_count];
    gameControls.startTurn(player);
    game.prompt_basic_options();
  },
  apply_player_won: () => {
    return `\nPlayer (id:${
      window.winner.id
    }) won! 🎉🎉🎉 Woohoo! 🎉🎉🎉 Congrats!`;
  },
  apply_end_turn: () => {
    if (null === window.pending_for_user_input) {
      gameControls.endTurn(error => {
        if (error) {
          console.log(error);
        }
        window.turn_count++;
        game.apply_start_turn();
      });
    }
    return ``;
  },
  apply_leave_game: () => {
    let player = window.players[window.turn_count % window.player_count];
    gameControls.forfeit(player);
  },
  on_end_turn: () => {
    let pending = window.pending_for_user_input;
    if (null !== pending) {
      if (pending.arguments.options) {
        if (
          pending.arguments.options.filter(option => 'End Turn' === option)
            .length
        ) {
          window.pending_for_user_input = null;
          game.apply_end_turn();
          return `\nEnding Turn...`;
        }
      }
    }
    return `\nEnd Turn is not available`;
  },
  on_leave_game: () => {
    game.apply_leave_game();
    if (gameControls.computeWinCondition()) {
      return game.apply_player_won();
    }
    return ``;
  }
};

export default game;
