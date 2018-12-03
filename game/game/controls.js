import * as _ from './actions';

// ui: do you want to keep playing? surrender?
// triggered by: closing tab / clicking surrender button
export const onForfeit = player => {
  window.player_count--;

  if (!_.getHasTwoToFivePlayers()) {
    endGame();
  } else {
    // basically remove all cards that the player has to discard pile
    // and then remove the player from game

    // add all player hand cards to discard pile
    _.moveCards(player.hand, window.discard, player.hand);

    // add all players field cards to discard pile
    _.moveCards(
      player.field.action_cards,
      window.discard,
      player.field.action_cards
    );
    _.moveCards(
      player.field.action_cards,
      window.discard,
      player.field.bank_cards
    );
    for (let i = 0; i < player.field.property_cards.length; i++) {
      _.moveCards(
        player.field.property_cards[i],
        window.discard,
        player.field.property_cards[i]
      );
    }

    // remove player from game
    _.removePlayer(player);

    // not sure...
    // _.window.turn_count++;
  }
};

// called everytime card is drawn from deck
// if is then empty create new deck from discard
export const onEmptyDeck = () => {
  if (_.getDeckEmpty()) {
    window.deck.concat(window.discard);
    _.shufflePile(window.deck);
    window.discard = [];
  }
};
/**
 * Swap a property card with property card on the field
 * @param {Player.Field} source
 * @param {Player.Field} destination
 * @param {Player.Field.Propery_Cards.PropertyCard} card1
 * @param {Player.Field.Property_Cards.Property_Card} card2
 */
export const swapPropertyCards = (source, destination, card1, card2) => {
  let move = (card1, card2, place) => {
    let check = false;
    let move = (card1, card2, place) => {
      for (let set in place) {
        if (card1 in set) {
          set.filter(card => card != card1);
        }
        if (card2.color === set[0].color) {
          set.push(card2);
          check = true;
        }
      }
      if (!check) {
        place.concat([card2]);
      }
    };
    move(card1, card2, source);
    move(card2, card1, destination);
  };
};

/**
 * Everybody has to pay rent to person unless its a debt-collector action card (forces one player to pay you rent)
 * Can only use bank or property card as rent
 * Have until the amount of rent is fulfilled
 * If you have no property_card_value or bank_value than you do not have to pay
 * You can only charge rent against the Multicolor Property Wild card if it is played with another property card
 * @param {? Can be One Person or All Players Depending on Type of Card} source
 * @param {Player.Field.Bank} destination
 * @param {Integer} amount
 */
export const payRent = (source, destination, amount) => {};

/* should trigger endTurn whenever card_played > 3
 * move card to proper place in field
 * apply card effect logically
 * check if player has won
 * Note: when a hotel / house card is played
 *       it should NOT go to player.field.action_cards
 *       instead it should GO somewhere in player.field.property_cards
 * @return {Object}
 */
export const playCard = () => {
  const playMoneyCard = (player, card) => {
    _.moveCard(player.hand, player.field.bank_cards, card);
    window.cards_played++;
  };

  const playPropertyCard = (player, card, property_set_index) => {
    const num_property_sets = player.field.property_cards.length;
    if (
      num_property_sets === 0 ||
      property_set_index === num_property_sets + 1
    ) {
      _.moveCards(player.hand, player.field.action_cards[property_set_index], [
        card
      ]);
    } else {
      _.moveCard(
        player.hand,
        player.field.action_cards[property_set_index],
        card
      );
    }
    window.cards_played++;
  };

  // Note: this should be same implementation as playPropertyCard (might be wrong later)
  // property_set_index should be between 0 and player.field.property.cards.length + 1
  const playPropertyWildCard = (player, card, property_set_index) => {
    const num_property_sets = player.field.property_cards.length;
    if (
      num_property_sets === 0 ||
      property_set_index === num_property_sets + 1
    ) {
      _.moveCards(player.hand, player.field.action_cards[property_set_index], [
        card
      ]);
    } else {
      _.moveCard(
        player.hand,
        player.field.action_cards[property_set_index],
        card
      );
    }
  };

  // property_set_index can be null if not playing house or hotel card
  const playActionCard = (player, card, property_set_index) => {
    // TODO: Even though house and hotel are action-cards, should go to a property-set accordingly
    if (card.type === 'house') {
      // TODO: check if can be played
      if (_.getCanAddHouseToPropertySet()) {
        _.addHouse(player.field.property_cards[property_set_index], card);
      }
    } else if (card.type === 'hotel') {
      if (_.getCanAddHotelToPropertySet()) {
        _.addHotel(player.field.property_cards[property_set_index], card);
      }
    } else {
      _.move(player.hand, player.field.actions_cards, card);
    }
    window.cards_played++;
  };

  const playRentCard = (player, card) => {
    const playMulticolorRentCard = (player, card) => {
      // TODO: define have_user_pick_a_property_set
      // TODO: define have_user_pick_a_target_player
      have_user_pick_a_property_set(card.mainColor, property_set => {
        have_user_pick_a_target_player(target_player => {
          payRent(target_player, player, _.getRentValue(player, property_set));
        });
      });
    };

    const playDualcolorRentCard = (player, card) => {
      // TODO: define have_user_pick_a_property_set
      have_user_pick_a_property_set(card.mainColor, property_set => {
        window.players.splice(window.players.indexOf(player), 1).map(payee => {
          payRent(payee, player, _.getRentValue(player, property_set));
        });
      });
    };

    _.moveCard(player.hand, player.field.action_cards, card);
    if (86 === card.id || 87 === card.id || 88 === card.id) {
      playMulticolorRentCard(player, card);
    } else {
      playDualcolorRentCard(player, card);
    }
    window.cards_played++;
  };

  return {
    money: playMoneyCard,
    property: playPropertyCard,
    property_wildcard: playPropertyWildCard,
    action: playActionCard,
    rent: playRentCard
  };
};

/**
 * Add card to hand from deck (always at start of turn)
 * @param {Player.id} player_id
 */
export const drawCard = player => {
  const card = window.deck.pop();
  player.hand.push(card);
};

// might need more logic here...
export const endTurn = player => {
  let action_cards = player.field.action_cards;
  for (let i = 0; i < action_cards.length; i++) {
    _.moveCard(action_cards, window.discard, action_cards[i]);
  }
  window.turn_count++;
};

export const endGame = () => {};
