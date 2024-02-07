"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CurrentNOPIMModel = void 0;
var CurrentNOPIMModel = function (sequelize, DataTypes) {
    var CurrentNOPIM = sequelize.define('CurrentNOPIM', {
        Index: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        roomNum: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        numberOfPeople: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    }, {
        freezeTableName: true,
        timestamps: false,
    });
    return CurrentNOPIM;
};
exports.CurrentNOPIMModel = CurrentNOPIMModel;
