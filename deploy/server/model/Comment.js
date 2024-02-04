"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentModel = void 0;
var CommentModel = function (sequelize, DataTypes) {
    var Comment = sequelize.define('Comment', {
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
            type: DataTypes.STRING(30),
            allowNull: false,
        },
        content: {
            type: DataTypes.STRING(2000),
            allowNull: false,
        },
        isrevised: {
            type: DataTypes.BOOLEAN,
        },
    }, {
        freezeTableName: true,
    });
    return Comment;
};
exports.CommentModel = CommentModel;
