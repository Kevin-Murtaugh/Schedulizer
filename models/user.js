module.exports = function(sequelize, DataTypes) {
    var User = sequelize.define("User", {
        googleID:{
            type: DataTypes.STRING    
        },
        image: {
            type: DataTypes.STRING    
        },
        firstName: {
            type: DataTypes.STRING
        },
        lastName: {
            type: DataTypes.STRING
        },
        businessName: {
            type: DataTypes.STRING
        },
        address: {
            type: DataTypes.STRING
        },
        city: {
            type: DataTypes.STRING
        },
        state: {
            type: DataTypes.STRING
        },
        zip: {
            type: DataTypes.STRING
        },
        email: { 
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
            notEmpty: true
            }
        },
        phoneNumber: {
            type: DataTypes.STRING,
        //TODO Validate phone numbers correctly
        //   validate: {
        //     is: ["^(?=(?:\D*\d){10,15}\D*$)\+?[0-9]{1,3}[\s-]?(?:\(0?[0-9]{1,5}\)|[0-9]{1,5})[-\s]?[0-9][\d\s-]{5,7}\s?(?:x[\d-]{0,4})?$"]
        //   }
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
            type: DataTypes.DECIMAL(10,2),
            defaultValue: 7.25
        },
        department: {
            type: DataTypes.ENUM,
            values: ["FOH", "BOH"],
            defaultValue: "BOH"
        }
        });
    
    User.associate = function(models) {
        
        User.hasMany(models.Settings, {
            onDelete: "cascade"
        });
    };

    return User;

  };


