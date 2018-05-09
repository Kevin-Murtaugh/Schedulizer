module.exports = function(sequelize, DataTypes) {
    var User = sequelize.define("users", {
      // Giving the Author model a name of type STRING
      firstName: {
          type: DataTypes.STRING
      },
      lastName: {
          type: DataTypes.STRING
      },
      userName: {
          type: DataTypes.STRING,
          allowNull: false
      },
      passWord: {
          type: DataTypes.STRING,
          allowNull: false
      },

      email: { 
          type: DataTypes.STRING
      },

      phoneNumber: {
          type: DataTypes.STRING,
          validate: {
            is: ["^(?=(?:\D*\d){10,15}\D*$)\+?[0-9]{1,3}[\s-]?(?:\(0?[0-9]{1,5}\)|[0-9]{1,5})[-\s]?[0-9][\d\s-]{5,7}\s?(?:x[\d-]{0,4})?$"]
          }
      },
      isManager: {
          type: DataTypes.BOOLEAN,
          defaultValue: false
      },
      isAdmin: {
          type: DataTypes.BOOLEAN,
          defaultValue: false
      },
      hourlyPay: {
          type: DataTypes.DECIMAL(10,2)
      },
      department: {
          type: DataTypes.ENUM,
          values: ["FOH", "BOH"]
      }
    });

    return User;
  };