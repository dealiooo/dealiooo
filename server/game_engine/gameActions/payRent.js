const getHotelStatus = require('./getHotelStatus');
const getPropertyPileValue = require('./getPropertyPileValue');
const getPileValue = require('./getPileValue');
const getPropertySetStatus = require('./getPropertySetStatus');
const moveCard = require('./moveCard');
const removeEmptyPropertySets = require('./removeEmptyPropertySets');
const userControls = require('./../userControls');

const payRent = (Game, payee, player, amount, callback) => {
  let pile = [];
  if (getPropertyPileValue(payee.field.property_cards)) {
    pile.push('property_cards');
  }
  if (getPileValue(payee.field.bank_cards)) {
    pile.push('bank_cards');
  }
  if (getPileValue(payee.field.building_cards)) {
    pile.push('building_cards');
  }
  if (pile.length) {
    pickValuableFieldCard(Game, payee, pile, (error, card, source) => {
      if (error) {
        payRent(Game, payee, player, amount, callback);
      } else {
        processCardPayment(Game, payee, player, amount, card, source, callback);
      }
    });
  } else {
    callback(null);
  }
};

const pickValuableFieldCard = (Game, player, pileNames, callback) => {
  userControls.pickFieldCard(Game, player, pileNames, (error, card, source) => {
    if (!error & card.value > 0) {
      callback(null, card, source);
    } else {
      pickValuableFieldCard(Game, player, pileNames, callback);
    }
  });
};

const processCardPayment = (
  Game,
  payee,
  player,
  amount,
  card,
  source,
  callback
) => {
  if ('property_cards' === source.pileName) {
    if (getPropertySetStatus(Game, source.pile)) {
      processCardPaymentOnFullSet(payee, player, card, source);
    } else {
      processCardPaymentOnNonFullSet();
    }
  } else {
    moveCard(source.pile, player.field[source.pileName], card);
  }
  if (card.value < amount) {
    payRent(Game, payee, player, amount - card.value, callback);
  } else {
    callback(null);
  }
};

const processCardPaymentOnFullSet = (payee, player, card, source) => {
  if ('building' === card.type) {
    if ('house' === card.name && getHotelStatus(source.pile)) {
      moveCard(
        source.pile,
        player.field.building_cards,
        source.pile.filter(card => 'hotel' === card.name)[0]
      );
    }
    moveCard(source.pile, player.field.building_cards, card);
  } else {
    source.pile
      .filter(card => 'building' === card.type)
      .map(card =>
        moveCard(source.pile, player.field.building_cards, card)
      );
    player.field.property_cards.push([]);
    moveCard(
      source.pile,
      player.field.property_cards[player.field.property_cards.length - 1],
      card
    );
    removeEmptyPropertySets(payee);
  }
};

const processCardPaymentOnNonFullSet = () => {
  player.field.property_cards.push([]);
  moveCard(
    source.pile,
    player.field.property_cards[player.field.property_cards.length - 1],
    card
  );
  removeEmptyPropertySets(payee);
};

module.exports = payRent;
