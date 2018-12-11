const pick_card_id = ({ player, callback }) => {
  if ('' === window.user_input) {
    let message = `Player id:${player.id}\nPick Card Id:`;
    window.pending_for_user_input = {
      function: pick_card_id,
      arguments: { player, callback },
      message
    };
  } else {
    let card_id = parseInt(window.user_input);
    window.user_input = '';
    window.pending_for_user_input = null;
    callback(null, card_id);
    return `\nYou picked card id:${card_id}`;
  }
};

// REFACTOR: this should return a callback with options[option] not option
// options should be an array of message like ["1. red", "2. blue", "3. green", ... ]
export const pick_option = ({ player, options, callback }) => {
  if (options.length) {
    if ('' === window.user_input) {
      let message = [
        `Player id:${player.id}`,
        `pick an option:`,
        options.map((option, i) => `\n${i}: ${option}`).join('')
      ].join('\n');
      window.pending_for_user_input = {
        function: pick_option,
        arguments: { player, options, callback },
        message
      };
    } else {
      let option = parseInt(window.user_input);
      if (-1 < option && option < options.length) {
        window.user_input = '';
        window.pending_for_user_input = null;
        callback(null, options[option]);
        return `\nYou picked:  \n ◾ ${option}: ${options[option]}`;
      }
    }
  } else {
    console.log('empty options');
    callback(new Error().stack);
  }
};

export const pick_hand_card = (player, callback) => {
  pick_card_id({
    player,
    callback: (error, id) => {
      if (error) {
        callback(error);
      } else {
        let found = false;
        let index = null;
        for (let i = 0; i < player.hand.length; i++) {
          if (id === player.hand[i].id) {
            found = true;
            index = i;
          }
        }
        if (found) {
          callback(null, player.hand[index]);
        } else {
          console.log(`thats not player #${player.id}'s hand card.`);
          pick_hand_card(player, callback);
        }
      }
    }
  });
};

// user picks a color to switch to from colors
export const pick_card_color = (player, card, callback) => {
  pick_option({
    player,
    options: card.colors,
    callback
  });
};

// user picks a player to target
export const pick_target_player = (player, callback) =>
  pick_option({
    player,
    options: window.players.reduce((filtered, e) => {
      if (e.id !== player.id) {
        filtered.push(e.id);
      }
      return filtered;
    }, []),
    callback: (error, player_id) => {
      if (error) {
        callback(error);
      } else {
        callback(
          null,
          window.players.filter(player => player.id === player_id)[0]
        );
      }
    }
  });

export const pick_field_card = (player, pileNames, callback) => {
  const retrieve_from_pile = {
    property_cards: retrieve_from_property_pile,
    bank_cards: retrieve_from_non_property_pile,
    building_cards: retrieve_from_non_property_pile
  };
  pick_option({
    player,
    options: pileNames,
    callback: (error, pileName) => {
      if (error) {
        callback(error);
      } else {
        pick_card_id({
          player,
          callback: (error, id) => {
            if (error) {
              callback(error);
            } else {
              let card_exist = retrieve_from_pile[pileName](
                player,
                pileName,
                id
              );
              if (card_exist) {
                callback(null, card_exist.card, card_exist.source);
              } else {
                pick_field_card(player, pileNames, callback);
              }
            }
          }
        });
      }
    }
  });
};

const retrieve_from_property_pile = (player, pileName, id) => {
  let card = null;
  let index = null;
  let size1 = player.field[pileName].length;
  for (let i = 0; i < size1; i++) {
    let size2 = player.field[pileName][i].length;
    for (let j = 0; j < size2; j++) {
      if (player.field[pileName][i][j].id === id) {
        card = player.field[pileName][i][j];
        index = i;
        break;
      }
    }
    if (index) {
      break;
    }
  }
  if (null !== card) {
    return {
      card,
      source: {
        pileName,
        pile: player.field[pileName][index]
      }
    };
  }
  return false;
};

const retrieve_from_non_property_pile = (player, pileName, id) => {
  let card = null;
  for (let i = 0; i < player.field[pileName].length; i++) {
    if (player.field[pileName][i].id === id) {
      card = player.field[pileName][i];
      break;
    }
  }
  if (null !== card) {
    return {
      card,
      source: {
        pileName,
        pile: player.field[pileName]
      }
    };
  }
  return false;
};

// pileNames is a array with values that can be "property_set", "bank", "building"]
// bank and building are handled defaultly since that are always 1D array
export const pick_valuable_field_card = (player, pileNames, callback) => {
  pick_field_card(player, pileNames, (error, card, source) => {
    if (error) {
      callback(error);
    } else if (card.value > 0) {
      callback(null, card, source);
    } else {
      pick_valuable_field_card(player, pileNames, callback);
    }
  });
};

export const pick_basic_options = (player, callback) => {
  let options = [];
  if (player.hand.length) {
    options.push('Play Hand Card');
  }
  if (player.field.property_cards.length) {
    options.push('Move Card Around');
  }
  options.push('End Turn');
  pick_option({
    player,
    options,
    callback
  });
};

export const play_hand_card = (player, callback) => {
  let options = [];
  options.push('Pick Card Id');
  options.push('Go Back');
  pick_option({
    player,
    options,
    callback
  });
};

export const move_card_around = (player, callback) => {
  let options = [];
  options.push('Pick Source and Destination');
  options.push('Go Back');
  pick_option({
    player,
    options,
    callback
  });
};

// user chooses what card to negate from card_played_stack
// (implemented as stack - aka. card_played_stack which consists of { player, card })
export const play_just_say_no = (/*?*/) => {};
