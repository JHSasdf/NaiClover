export const PostModel = (sequelize: any, DataTypes: any) => {
    const Post = sequelize.define(
        'Post',
        {
            postId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoincrement: true,
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
    return Post;
};

module.exports = PostModel;
