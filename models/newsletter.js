module.exports = function(sequelize, DataTypes) {
    var newsLetter = sequelize.define("newsLetter", {
        email: { 
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        }
    });
    return newsLetter;

  };
