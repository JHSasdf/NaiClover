"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LangPostModel = void 0;
var LangPostModel = function (sequelize, DataTypes) {
    var LangPost = sequelize.define('LangPost', {
        postId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        userid: {
            type: DataTypes.STRING(30),
            allowNull: false,
        },
        postType: {
            type: DataTypes.STRING(1),
            defaultValue: 'l',
        },
        content: {
            type: DataTypes.STRING(2000),
        },
    }, {
        freezeTableName: true,
    });
    return LangPost;
};
exports.LangPostModel = LangPostModel;
