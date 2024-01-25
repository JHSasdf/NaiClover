export const LangPostLikeModel = (sequelize: any, DataTypes: any) => {
    const LangPostLike = sequelize.define(
        'LangPostLike',
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
    return LangPostLike;
};
