module.exports = db => {
  db.th_games.hasMany(db.th_players, {
    as: 'Players',
    foreignKey: 'th_game_id'
  });

  db.th_players.hasMany(db.th_piles, {
    as: 'Piles',
    foreignKey: 'th_player_id'
  });

  db.th_piles.hasMany(db.th_pile_cards, {
    as: 'Cards',
    foreignKey: 'th_pile_id'
  });

  db.th_users.hasMany(db.th_players, {
    as: 'Players',
    foreignKey: 'th_user_id'
  });

  db.th_players.belongsTo(db.th_games, {
    as: 'Game',
    foreignKey: 'th_game_id'
  });

  db.th_players.belongsTo(db.th_users, {
    as: 'User',
    foreignKey: 'th_user_id'
  });

  db.th_piles.belongsTo(db.th_players, {
    as: 'Player',
    foreignKey: 'th_player_id'
  });

  db.th_pile_cards.belongsTo(db.th_piles, {
    as: 'Pile',
    foreignKey: 'th_pile_id'
  });

  db.th_games.belongsToMany(db.th_users, {
    as: 'Users',
    through: db.th_players,
    foreignKey: 'th_game_id'
  });

  db.th_users.belongsToMany(db.th_games, {
    as: 'Games',
    through: db.th_players,
    foreignKey: 'th_user_id'
  });
  return db;
};
