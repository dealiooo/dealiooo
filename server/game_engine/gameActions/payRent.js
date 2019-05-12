const getHotelStatus = require('./getHotelStatus');
const getPropertyPileValue = require('./getPropertyPileValue');
const getPileValue = require('./getPileValue');
const getPropertySetStatus = require('./getPropertySetStatus');
const moveCard = require('./moveCard');
const removeEmptyPropertySets = require('./removeEmptyPropertySets');
const userControls = require('./../userControls');

const payRent = ({ Game, payee, player, amount, forced, callback }) => {
  let pile = [];
  if (getPropertyPileValue({ propertyField: payee.field.propertyCards })) {
    pile.push('propertyCards');
  }
  if (getPileValue({ pile: payee.field.bankCards })) {
    pile.push('bankCards');
  }
  if (getPileValue({ pile: payee.field.buildingCards })) {
    pile.push('buildingCards');
  }
  if (pile.length) {
    pickValuableFieldCard({
      Game,
      player: payee,
      pileNames: pile,
      forced,
      callback: ({ error, card, source, forced }) => {
        if (error) {
          payRent({ Game, payee, player, amount, forced, callback });
        } else {
          processCardPayment({
            Game,
            payee,
            player,
            amount,
            card,
            source,
            forced,
            callback
          });
        }
      }
    });
  } else {
    callback({});
  }
};

const pickValuableFieldCard = ({
  Game,
  player,
  pileNames,
  forced,
  callback
}) => {
  if (forced) {
    let card, source;
    if ('propertyCards' === pileNames[0]) {
      let size1 = player.field[pileNames[0]].length;
      for (let i = 0; i < size1; i++) {
        let size2 = player.field[pileNames[0]][i].length;
        for (let j = 0; j < size2; j++) {
          if (0 < player.field[pileNames[0]][i][j].value) {
            card = player.field[pileNames[0]][i][j];
            source = {
              pileName: pileNames[0],
              pile: player.field[pileNames[0]][i]
            };
            break;
          }
        }
      }
    } else {
      for (let i = 0; i < player.field[pileNames[0]].length; i++) {
        return {
          card: player.field[pileNames[0]][i],
          source: {
            pileName: pileNames[0],
            pile: player.field[pileNames[0]]
          }
        };
      }
    }
    callback({ card, source, forced });
  } else {
    userControls.pickFieldCard({
      Game,
      player,
      pileNames,
      forced,
      callback: ({ error, card, source, forced }) => {
        if (error || 0 === card.value) {
          pickValuableFieldCard({
            Game,
            player,
            pileNames,
            forced,
            forced,
            callback
          });
        } else {
          callback({ card, source, forced });
        }
      }
    });
  }
};

const processCardPayment = ({
  Game,
  payee,
  player,
  amount,
  card,
  source,
  forced,
  callback
}) => {
  if ('propertyCards' === source.pileName) {
    if (getPropertySetStatus({ Game, propertySet: source.pile })) {
      processCardPaymentOnFullSet({ Game, payee, player, card, source });
    } else {
      processCardPaymentOnNonFullSet({ payee, player, card, source });
    }
  } else {
    moveCard({
      source: source.pile,
      destination: player.field[source.pileName],
      card
    });
  }
  if (card.value < amount) {
    payRent({
      Game,
      payee,
      player,
      amount: amount - card.value,
      forced,
      callback
    });
  } else {
    callback({});
  }
};

const processCardPaymentOnFullSet = ({ Game, payee, player, card, source }) => {
  if ('building' === card.type) {
    if (
      'house' === card.name &&
      getHotelStatus({ Game, propertySet: source.pile })
    ) {
      moveCard({
        source: source.pile,
        destination: player.field.buildingCards,
        card: source.pile.filter(card => 'hotel' === card.name)[0]
      });
    }
    moveCard({
      source: source.pile,
      destination: player.field.buildingCards,
      card
    });
  } else {
    source.pile
      .filter(card => 'building' === card.type)
      .map(card =>
        moveCard({
          source: source.pile,
          destination: player.field.buildingCards,
          card
        })
      );
    player.field.propertyCards.push([]);
    moveCard({
      source: source.pile,
      destination:
        player.field.propertyCards[player.field.propertyCards.length - 1],
      card
    });
    removeEmptyPropertySets({ player: payee });
  }
};

const processCardPaymentOnNonFullSet = ({ payee, player, card, source }) => {
  player.field.propertyCards.push([]);
  moveCard({
    source: source.pile,
    destination:
      player.field.propertyCards[player.field.propertyCards.length - 1],
    card
  });
  removeEmptyPropertySets({ player: payee });
};

module.exports = payRent;
