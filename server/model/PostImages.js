"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostImageModel = void 0;
var PostImageModel = function (sequelize, DataTypes) {
    var PostImages = sequelize.define('PostImages', {
        number: {
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
            type: DataTypes.STRING(30),
            allowNull: false,
        },
        path: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
    }, {
        freezeTableName: true,
        timestamps: false,
    });
    return PostImages;
};
exports.PostImageModel = PostImageModel;
