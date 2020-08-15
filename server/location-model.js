var config = require('./sequlize-config');
var { DataTypes } = require('sequelize');

var locationModal = config.sequelize.define("location", {
    id: { type: DataTypes.INTEGER, allowNull: false, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false },
    latitude: { type: DataTypes.FLOAT, allowNull: false },
    longitude: { type: DataTypes.FLOAT, allowNull: false }
}, {
    indexes: [],
    classMethods: {},
    timestamps: false
});

exports.locationModal = locationModal;
