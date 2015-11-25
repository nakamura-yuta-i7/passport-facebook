var Sequelize = require("sequelize");
var sequelize = new Sequelize('test', 'test', 'test', {
  host: 'localhost',
  dialect: 'mysql',

  pool: {
    max: 5,
    min: 0,
    idle: 10000
  },
});

module.exports = {
	sequelize: sequelize,
	Sequelize: Sequelize,
	users: sequelize.import("users"),
}
