const { Game } = require('../../database/api');

const filterAsync = (array, filter) =>
  Promise.all(array.map(element => filter(element))).then(result =>
    array.filter(_ => result.shift())
  );

const peekPile = pile =>
  pile
    .getCards({
      limit: 1,
      order: [['order', 'DESC']]
    })
    .then(cards => {
      if (cards.length) {
        return cards[0];
      } else {
        return cards;
      }
    });

const getPileValue = pile => pile.getCards().then(cards => cards.sum('value'));

const getPileRentValue = pile =>
  pile.getCards().then(cards =>
    Game.getRentByMainColor(cards[0].main_color).then(rent => {
      let offset = getHouseStatus(cards, rent) + getHotelStatus(cards, rent);
      return rent.values[cards.length - offset] + offset * 2;
    })
  );

const getRentValue = (player, pile) =>
  getDoubleTheRentStatus(player).then(status =>
    getPileRentValue(pile).then(rentValue => rentValue * Math.pow(2, status))
  );

const removeEmptyPropertySets = player =>
  Game.getPilesByTypes(player.id, [Game.PROPERTY_SET]).then(piles =>
    filterAsync(piles, Game.removeSetIfEmptySet)
  );

const getPropertySetValid = set =>
  Game.getRentByMainColor(set[0].main_color).then(
    rent =>
      set.filter(card => Game.PROPERTY_WILDCARD === card.type).length !==
        rent.max_size && set.length >= rent.max_size
  );

const getPropertySetStatus = (set, rent) => set.length >= rent.max_size;

const getHouseStatus = (set, rent) => set.length >= rent.max_size + 1;

const getHotelStatus = (set, rent) => set.length >= rent.max_size + 2;

const getCanAddPropertyToPropertySet = card => set =>
  Game.getRentByMainColor(card.main_color).then(rent => {
    if (!set.length) {
      return 1;
    }
    return card.main_color === set[0].main_color && set.length < rent.max_size;
  });

const getCanAddHouseToPropertySet = pile =>
  pile
    .getCards()
    .then(set =>
      Game.getRentByMainColor(set[0].main_color).then(
        rent =>
          !getHouseStatus(set, rent) &&
          getPropertySetStatus(set, rent) &&
          (Game.RAILROAD === set[0].main_color ||
            Game.UTILITY === set[0].main_color)
      )
    );

const getCanAddHotelToPropertySet = pile =>
  pile
    .getCards()
    .then(set =>
      Game.getRentByMainColor(set[0].main_color).then(
        rent => !getHotelStatus(set, rent) && getHouseStatus(set)
      )
    );

const getAllDestinations = ({ player }) =>
  Game.getPilesByTypes(player.id, [Game.PROPERTY_SET]);

const getBuildingDestinations = ({ player, card }) =>
  card.getPile().then(pile => {
    if (Game.BUILDING !== pile.type) {
      return [];
    } else if (HOUSE === card.name) {
      return Game.getPilesByTypes(player.id, [Game.PROPERTY_SET]).then(piles =>
        filterAsync(piles, getCanAddHouseToPropertySet)
      );
    } else {
      return Game.getPilesByTypes(player.id, [Game.PROPERTY_SET]).then(piles =>
        filterAsync(piles, getCanAddHotelToPropertySet)
      );
    }
  });

const getPropertyDestinations = ({ player, card }) =>
  Game.getPilesByTypes(player.id, [Game.PROPERTY_SET]).then(piles =>
    filterAsync(piles, getCanAddPropertyToPropertySet(card))
  );

const getRentDestinations = ({ player, card }) =>
  Game.getPilesByTypes(player.id, [Game.PROPERTY_SET]).then(piles =>
    piles.filter(pile => pile[0].main_color === card.main_color)
  );

const drawCard = player =>
  Game.getPilesByTypes(player.id, [Game.HAND]).then(hand =>
    Game.getPilesByTypes(player, [Game.DECK]).then(deck =>
      peekPile(deck).then(card => {
        if (card.length) {
          return Game.moveCard(card, hand);
        }
        return card;
      })
    )
  );

// TODO: define userActions
export const payRent = (payee, player, amount, callback) => {
  Game.getPilesByTypes(payee.id, [Game.BANK, Game.BUILDING, Game.PROPERTY_SET])
    .then(piles => filterAsync(piles, getPileValue))
    .then(piles => {
      if (piles.length) {
        // userActions.pick_valuable_card
      } else {
        callback(null);
      }
    });
};

const getNumberFullPropertySets = player =>
  Game.getPilesByTypes(player.id, [Game.PROPERTY_SET]).then(piles =>
    filterAsync(piles, getPropertySetValid)
  );

const getDoubleTheRentStatus = player =>
  Game.getPilesByTypes(player.id, [Game.ACTION])
    .then(piles => piles[0].getCards())
    .then(
      cards => cards.filter(card => Game.DOUBLE_THE_RENT === card.name).length
    );

const getDeckEmpty = player =>
  Game.getPilesByTypes(player, [Game.DECK])
    .then(piles => piles[0].getCards())
    .then(cards => !cards.length);

const getHasThreeFullPropertySets = player =>
  getNumberFullPropertySets(player).then(count => 3 <= count);

const getHasPlayedThreeCards = player =>
  player.getGame().then(game => 3 <= game.card_played);

const getHasSevenOrLessCards = player =>
  Game.getPilesByTypes(player.id, [Game.HAND]).then(piles =>
    piles[0].getCards().then(cards => 7 >= cards.length)
  );

const getHasTwoToFivePlayers = player =>
  player.getGame().then(game.getPlayers().then(players => players.length - 1));

const getDestinations = {
  all: getAllDestinations,
  building: getBuildingDestinations,
  property: getPropertyDestinations,
  property_wildcard: getPropertyDestinations,
  rent: getRentDestinations
};

module.exports = {
  removeEmptyPropertySets,
  getRentValue,
  getDestinations,
  drawCard,
  moveCard: Game.moveCard,
  movePile: Game.movePile,
  swapPropertyCard: Game.swapPropertyCard,
  shufflePile: Game.shufflePile,
  switchColor: Game.switchColor,
  removePlayer: Game.removePlayer,
  getDeckEmpty,
  getHasThreeFullPropertySets,
  getHasPlayedThreeCards,
  getHasSevenOrLessCards,
  getHasTwoToFivePlayers
};
