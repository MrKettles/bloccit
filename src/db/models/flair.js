'use strict';
module.exports = (sequelize, DataTypes) => {
  const Flair = sequelize.define('Flair', {
    name: {
    	type: DataTypes.STRING,
    	allowNull: false
    },
    color: {
    	type: DataTypes.STRING,
    	allowNull: true
    }
  }, {});
  Flair.associate = function(models) {
    // associations can be defined here
    Flair.hasMany(models.Post, {
    	foreignKey: 'flairId',
    	as: 'posts'
    })
  };
  return Flair;
};