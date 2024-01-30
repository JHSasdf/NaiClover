export const PostModel = (sequelize: any, DataTypes: any) => {
    const Post = sequelize.define(
        'Post',
        {
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
                defaultValue: 'c',
            },
            content: {
                type: DataTypes.STRING(2000),
            },
        },
        {
            freezeTableName: true,
        }
    );
    return Post;
};
