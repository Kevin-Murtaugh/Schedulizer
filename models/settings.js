module.exports = function(sequelize, DataTypes) {
    var Settings = sequelize.define("Settings", {
      columnHeaderFormat: {
          type: DataTypes.STRING
      },
        slotDuration: { 
          type: DataTypes.STRING
      },
        firstDate: {
          type: DataTypes.STRING, 
      },
      minTime: {
          type: DataTypes.STRING
      },
      maxTime: {
          type: DataTypes.STRING
      },
      notificationEmail: {
          type: DataTypes.STRING
      },
      emailName: {
          type: DataTypes.STRING
      }
    });
    
    Settings.associate = function(models) {
        Settings.belongsTo(models.User, {
            foreignKey: {
                allowNull: false
            }
        });
    };

    return Settings;

  };