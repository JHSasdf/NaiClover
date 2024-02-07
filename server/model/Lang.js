"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LangModel = void 0;
var LangModel = function (sequelize, DataTypes) {
    var Lang = sequelize.define('Lang', {
        index: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        learningLang: {
            type: DataTypes.STRING(30),
        },
        userid: {
            type: DataTypes.STRING(30),
            allowNull: false,
        },
    }, {
        freezeTableName: true,
    });
    return Lang;
};
exports.LangModel = LangModel;
