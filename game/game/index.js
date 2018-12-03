import globalVars from './globalVars';
const gameControls = require('./controls');

const game = {
  start: () => {
    globalVars(2);
    //for ( let i = 0; i < 10; i++ ) {
    //  gameControls.drawCard(window.players[i % 2].id);
    //}
  },
  input: user_input => {
    let return_value = '';

    return_value =
      game.prompt_general_info() +
      game.prompt_option_list(['1: do nothing', '2: still do nothing']);
    return return_value;
  },
  init_prompt: () => {
    return (
      `Welcome to monopoly deal` +
      game.prompt_general_info() +
      game.prompt_card_id('hand')
    );
  },
  prompt_general_info: () => {
    let turn_player = window.turn_count % window.player_count;
    let return_value =
      `\n-----------------------------` +
      `\nturn count: ${window.turn_count}` +
      `\nturn_player: player #${turn_player}` +
      `\ndeck count: ${window.deck.length}` +
      `\ndiscard: ${window.discard.toString()}` +
      `\ncards_played: ${window.cards_played}` +
      `\n------------------------------`;
    let size = window.players.length;
    for (let i = 0; i < size; i++) {
      return_value += `\nPlayer #${i} - Hand:`;
      if (i === turn_player) {
        window.players[i].hand.map(card => (return_value += `( ${card.id} )`));
      } else {
        return_value += window.players[i].hand.length;
      }
      return_value += `\nPlayer #${i} - Field: Banks: `;
      window.players[i].field.bank_cards.map(
        card => (return_value += `( ${card.id} )`)
      );
      return_value += `\nPlayer #${i} - Field: Properties: `;
      window.players[i].field.property_cards.map(set => {
        return_value += `[ `;
        set.map(card => (return_value += `( ${card.id} )`));
        return_value += ` ]`;
        return return_value;
      });
      return_value += `\nPlayer #${i} - Field: Actions: `;
      window.players[i].field.action_cards.map(
        card => (return_value += `( ${card.id} )`)
      );
      return_value += `\n------------------------------`;
    }
    return return_value;
  },
  prompt_card_id: source => {
    return `\nPlease enter a card id from ${source}: `;
  },
  prompt_option_list: list => {
    let return_value = '';
    list.map(e => (return_value += '\n' + e));
    return return_value + '\nPlease choose an option: ';
  }
};

export default game;
