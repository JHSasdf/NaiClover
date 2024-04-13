"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LangCommentModel = void 0;
var LangCommentModel = function (sequelize, DataTypes) {
    var LangComment = sequelize.define('LangComment', {
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
            allowNull: false,
        },
    }, {
        freezeTableName: true,
    });
    return LangComment;
};
exports.LangCommentModel = LangCommentModel;
