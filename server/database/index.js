const db = require('./models');
const th_cards_model = require('./models/th_cards');
const th_users_model = require('./models/th_users');
const th_games_model = require('./models/th_games');
const th_game_users_model = require('./models/th_game_users');
const th_game_user_cards_model = require('./models/th_game_user_cards');

const Cards = th_cards_model(db.sequelize, db.Sequelize);
const Users = th_users_model(db.sequelize, db.Sequelize);
const Games = th_games_model(db.sequelize, db.Sequelize);
const GameUsers = th_game_users_model(db.sequelize, db.Sequelize);
const GameUserCards = th_game_user_cards_model(db.sequelize, db.Sequelize);

module.exports = {
  Cards,
  Users,
  Games,
  GameUsers,
  GameUserCards
};
