"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LangPostLikeModel = void 0;
var LangPostLikeModel = function (sequelize, DataTypes) {
    var LangPostLike = sequelize.define('LangPostLike', {
        index: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        postId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        userid: {
            type: DataTypes.STRING(20),
            allowNull: false,
        },
    }, {
        freezeTableName: true,
    });
    return LangPostLike;
};
exports.LangPostLikeModel = LangPostLikeModel;
