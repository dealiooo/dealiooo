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

const game_engine = {
  start: () => {
    let Game = gameControls.startGame();
    game_engine.apply_start_turn(Game);
    return Game;
  },
  input: (Game, user_input, player) => {
    Game.user_input = user_input;
    let return_value = '';
    let pending = Game.pending_for_user_input;
    console.log(pending);
    if (pending) {
      return_value = pending.function(Game, pending.arguments, player);
    } else if (null !== Game.winner) {
      return_value = game_engine.apply_player_won(Game);
    } else {
      return_value = '\ngame is not running :(';
    }
    return return_value;
  },
  get_prompt: Game => {
    return {
      general_info: game_engine.prompt_general_info(Game),
      player_info: game_engine.prompt_player_info(Game),
      options_info: game_engine.prompt_options_info(Game)
    };
  },
  prompt_general_info: Game => {
    let return_value =
      `\nturn count: ${Game.turn_count}` +
      `\ndeck count: ${Game.deck.length}` +
      `\ndiscard:  `;
    if (Game.discard.length) {
      return_value += Game.discard[Game.discard.length - 1].id;
    } else {
      return_value += '-';
    }
    return_value += `\ncards_played: ${Game.cards_played}`;
    return return_value;
  },
  prompt_options_info: Game => {
    let return_value = '';
    let pending = Game.pending_for_user_input;
    if (pending) {
      return_value += pending.message;
    }
    return return_value;
  },
  prompt_player_info: Game => {
    let turn_player = Game.turn_count % Game.player_count;
    let return_value = [];
    let size = Game.players.length;
    for (let i = 0; i < size; i++) {
      let str = '';
      if (Game.players[i].id === Game.players[turn_player].id) {
        str += `\nCurrent Turn: Player (id:${Game.players[i].id})`;
      } else {
        str += `\nPlayer (id:${Game.players[i].id})`;
      }
      str += `\n✌️ Hand:\n`;
      if (i === turn_player) {
        str += '\n' + pretty_print_cards(Game.players[i].hand) + '';
      } else {
        str += Game.players[i].hand.length;
      }
      str += `\n🏦 Bank: \n`;
      str += '[' + pretty_print_cards(Game.players[i].field.bank_cards) + ']';
      str += `\n🏠 Properties: \n`;
      if (Game.players[i].field.property_cards.length) {
        Game.players[i].field.property_cards.map(
          property_set => (str += `\n[${pretty_print_cards(property_set)}]`)
        );
      } else {
        str += '[]';
      }
      str += `\n🚴 Actions: \n`;
      str += '[' + pretty_print_cards(Game.players[i].field.action_cards) + ']';
      str += `\n🏢 Buildings: \n`;
      str +=
        '[' + pretty_print_cards(Game.players[i].field.building_cards) + ']';
      return_value.push(str);
    }
    return return_value;
  },
  prompt_basic_options: Game => {
    let apply_basic_options = {
      'Play Hand Card': game_engine.prompt_play_hand_card,
      'Move Card Around': game_engine.prompt_move_card_around,
      'End Turn': game_engine.apply_end_turn
    };
    let player = Game.players[Game.turn_count % Game.player_count];
    userActions.pick_basic_options(Game, player, (error, option) => {
      if (error) {
        console.log(error);
      } else {
        apply_basic_options[option](Game);
      }
    });
  },
  prompt_play_hand_card: Game => {
    let apply_play_hand_card = {
      'Pick Card Id': game_engine.prompt_hand_card_id,
      'Go Back': game_engine.prompt_basic_options
    };
    let player = Game.players[Game.turn_count % Game.player_count];
    userActions.play_hand_card(Game, player, (error, option) => {
      if (error) {
        console.log(error);
        game_engine.prompt_basic_options(Game);
      } else {
        apply_play_hand_card[option](Game);
      }
    });
  },
  prompt_move_card_around: Game => {
    let apply_move_card_around = {
      'Pick Source and Destination': game_engine.prompt_source_and_destination,
      'Go Back': game_engine.prompt_basic_options
    };
    let player = Game.players[Game.turn_count % Game.player_count];
    userActions.move_card_around(Game, player, (error, option) => {
      if (error) {
        console.log(error);
        game_engine.prompt_basic_options(Game);
      } else {
        apply_move_card_around[option](Game);
      }
    });

    if (gameControls.computeWinCondition(Game)) {
      return game_engine.apply_player_won(Game);
    }
  },
  prompt_hand_card_id: Game => {
    let player = Game.players[Game.turn_count % Game.player_count];
    userActions.pick_hand_card(Game, player, (error, card) => {
      if (error) {
        console.log(error);
        game_engine.prompt_basic_options(Game);
      } else {
        game_engine.apply_play_card(Game, card);
      }
    });
  },
  prompt_source_and_destination: Game => {
    let player = Game.players[Game.turn_count % Game.player_count];
    gameControls.moveCardAround(Game, player, error => {
      if (error) {
        console.log(error);
      }
      if (!gameControls.computeWinCondition(Game, player)) {
        game_engine.prompt_basic_options(Game);
      }
    });
  },
  apply_play_card: (Game, card) => {
    let player = Game.players[Game.turn_count % Game.player_count];
    gameControls.playCard(Game, player, card, (error, card) => {
      if (error) {
        console.log(error);
        game_engine.prompt_basic_options(Game);
      } else {
        gameControls.onCardPlayed(Game, card);
        if (gameControls.computeWinCondition(Game)) {
          return game_engine.apply_player_won(Game);
        } else {
          if (3 <= Game.cards_played) {
            game_engine.apply_end_turn(Game);
          } else {
            game_engine.prompt_basic_options(Game);
          }
        }
      }
    });
  },
  apply_start_turn: Game => {
    let player = Game.players[Game.turn_count % Game.player_count];
    gameControls.startTurn(Game, player);
    game_engine.prompt_basic_options(Game);
  },
  apply_player_won: Game => {
    return `\nPlayer (id:${
      Game.winner.id
    }) won! 🎉🎉🎉 Woohoo! 🎉🎉🎉 Congrats!`;
  },
  apply_end_turn: Game => {
    if (null === Game.pending_for_user_input) {
      gameControls.endTurn(Game, error => {
        if (error) {
          console.log(error);
        }
        Game.turn_count++;
        game_engine.apply_start_turn(Game);
      });
    }
    return ``;
  },
  apply_leave_game: Game => {
    let player = Game.players[Game.turn_count % Game.player_count];
    gameControls.forfeit(Game, player);
  },
  on_end_turn: Game => {
    let pending = Game.pending_for_user_input;
    if (null !== pending) {
      if (pending.arguments.options) {
        if (
          pending.arguments.options.filter(option => 'End Turn' === option)
            .length
        ) {
          Game.pending_for_user_input = null;
          game_engine.apply_end_turn(Game);
          return `\nEnding Turn...`;
        }
      }
    }
    return `\nEnd Turn is not available`;
  },
  on_leave_game: Game => {
    game_engine.apply_leave_game(Game);
    if (gameControls.computeWinCondition(Game)) {
      return game_engine.apply_player_won(Game);
    }
    return ``;
  }
};

export default game_engine;
