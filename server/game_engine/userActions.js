const pick_card_id = (
  Game,
  { player: requiredPlayer, callback },
  player_id = null
) => {
  if ('' === Game.user_input) {
    let message = `Player id:${requiredPlayer.id}\nPick Card Id:`;
    Game.pending_for_user_input = {
      function: pick_card_id,
      arguments: { player: requiredPlayer, callback },
      message
    };
  } else {
    let card_id = parseInt(Game.user_input);
    Game.user_input = '';
    Game.pending_for_user_input = null;
    callback(null, card_id);
    return `\nYou picked card id:${card_id}`;
  }
};

const pick_option = (
  Game,
  { player: requiredPlayer, options, callback },
  player_id = null
) => {
  if (options.length) {
    if ('' === Game.user_input) {
      let message = [
        `Player id:${requiredPlayer.id}`,
        `pick an option:`,
        options.map((option, i) => `\n${i}: ${option}`).join('')
      ].join('\n');
      Game.pending_for_user_input = {
        function: pick_option,
        arguments: { player: requiredPlayer, options, callback },
        message
      };
    } else {
      let option = parseInt(Game.user_input);
      if (-1 < option && option < options.length) {
        Game.user_input = '';
        Game.pending_for_user_input = null;
        callback(null, options[option]);
        return `\nYou picked:  \n ◾ ${option}: ${options[option]}`;
      }
    }
  } else {
    console.log('empty options');
    callback(new Error().stack);
  }
};

const pick_hand_card = (Game, player, callback) => {
  pick_card_id(Game, {
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
          pick_hand_card(Game, player, callback);
        }
      }
    }
  });
};

const pick_card_color = (Game, player, card, callback) => {
  pick_option(Game, {
    player,
    options: card.colors,
    callback
  });
};

const pick_target_player = (Game, player, callback) =>
  pick_option(Game, {
    player,
    options: Game.players.reduce((filtered, e) => {
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
          Game.players.filter(player => player.id === player_id)[0]
        );
      }
    }
  });

const pick_field_card = (Game, player, pileNames, callback) => {
  const retrieve_from_pile = {
    property_cards: retrieve_from_property_pile,
    bank_cards: retrieve_from_non_property_pile,
    building_cards: retrieve_from_non_property_pile
  };
  pick_option(Game, {
    player,
    options: pileNames,
    callback: (error, pileName) => {
      if (error) {
        callback(error);
      } else if (player.field[pileName].length) {
        pick_card_id(Game, {
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
                pick_field_card(Game, player, pileNames, callback);
              }
            }
          }
        });
      } else {
        console.log('pile is empty');
        callback(new Error().stack);
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

const pick_valuable_field_card = (Game, player, pileNames, callback) => {
  pick_field_card(Game, player, pileNames, (error, card, source) => {
    if (error) {
      callback(error);
    } else if (card.value > 0) {
      callback(null, card, source);
    } else {
      pick_valuable_field_card(Game, player, pileNames, callback);
    }
  });
};

const pick_basic_options = (Game, player, callback) => {
  let options = [];
  if (player.hand.length) {
    options.push('Play Hand Card');
  }
  if (player.field.property_cards.length) {
    options.push('Move Card Around');
  }
  options.push('End Turn');
  pick_option(Game, {
    player,
    options,
    callback
  });
};

const play_hand_card = (Game, player, callback) => {
  let options = [];
  options.push('Pick Card Id');
  options.push('Go Back');
  pick_option(Game, {
    player,
    options,
    callback
  });
};

const move_card_around = (Game, player, callback) => {
  let options = [];
  options.push('Pick Source and Destination');
  options.push('Go Back');
  pick_option(Game, {
    player,
    options,
    callback
  });
};

module.exports = {
  pick_option,
  pick_hand_card,
  pick_card_color,
  pick_target_player,
  pick_field_card,
  pick_valuable_field_card,
  pick_basic_options,
  play_hand_card,
  move_card_around
};
