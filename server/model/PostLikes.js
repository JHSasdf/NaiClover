"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostLikeModel = void 0;
var PostLikeModel = function (sequelize, DataTypes) {
    var PostLike = sequelize.define('PostLike', {
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
    return PostLike;
};
exports.PostLikeModel = PostLikeModel;
