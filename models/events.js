module.exports = function(sequelize, DataTypes) {
    var Event = sequelize.define("Event", {
        
            title: {
              type: DataTypes.STRING
            },
            userId:{
                type: DataTypes.INTEGER
            },
            shiftDate: {
                type: DataTypes.DATEONLY
            },
            start: {
              type: DataTypes.STRING
            },
            end: { 
              type: DataTypes.STRING
            },
            department: {
                type: DataTypes.STRING
            },
            url: {
              type: DataTypes.STRING
            },
            className: {
              type: DataTypes.STRING
            },
            overlap: {
              type: DataTypes.BOOLEAN,
              defaultValue: true
            },
            color: {
              type: DataTypes.STRING
            }
        },{timestamps: false}
    );



    return Event;

  };