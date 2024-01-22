export const PostLikeModel = (sequelize: any, DataTypes: any) => {
    const PostLike = sequelize.define(
        'PostLike',
        {
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
        },
        {
            freezeTableName: true,
        }
    );
    return PostLike;
};
