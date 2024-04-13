"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FollowModel = void 0;
var FollowModel = function (sequelize, DataTypes) {
    var Follow = sequelize.define('Follow', {
        index: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        userid: {
            type: DataTypes.STRING(30),
            allowNull: false,
        },
        followerId: {
            type: DataTypes.STRING(30),
            allowNull: false,
        },
    }, {
        freezeTableName: true,
    });
    return Follow;
};
exports.FollowModel = FollowModel;
