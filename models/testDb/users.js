/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('users', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
			autoIncrement: true,
      primaryKey: true
    },
    passport_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0'
    },
    passport_service: {
      type: DataTypes.STRING,
      allowNull: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true
    }
  },
	{
	  // don't forget to enable timestamps!
	  timestamps: false,
	});
};
