"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatCountModel = void 0;
var ChatCountModel = function (sequelize, DataTypes) {
    var ChatCount = sequelize.define('ChatCount', {
        chatCountIndex: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        roomNum: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        chatIndex: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        userid: {
            allowNull: false,
            type: DataTypes.STRING(30),
        },
        useridTo: {
            allowNull: false,
            type: DataTypes.STRING(30),
        },
    }, {
        freezeTableName: true,
        timestamps: false,
    });
    return ChatCount;
};
exports.ChatCountModel = ChatCountModel;
