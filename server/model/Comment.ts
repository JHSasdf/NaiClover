export const CommentModel = (sequelize: any, DataTypes: any) => {
    const Comment = sequelize.define(
        'Comment',
        {
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
            },
            likes: {
                type: DataTypes.INTEGER,
            },
        },
        {
            freezeTableName: true,
        }
    );
    return Comment;
};

module.exports = CommentModel;
