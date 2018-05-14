module.exports = function(sequelize, DataTypes) {
    var Schedule = sequelize.define("Schedule", {
        
            scheduleStart: {
              type: DataTypes.STRING
            },
            scheduleEnd: { 
              type: DataTypes.STRING
            },
            managerComments: {
                type: DataTypes.STRING
            },
            scheduleStatus: {
                type: DataTypes.ENUM,
                values: ["draft", "published"],
                defaultValue: "draft"
            }
        },{timestamps: false}
    );
    


    return Schedule;

  };