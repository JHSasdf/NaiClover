export const FollowModel = (sequelize: any, DataTypes: any) => {
    const Follow = sequelize.define(
        'Follow',
        {
            userid: {
                type: DataTypes.STRING(30),
                allowNull: false,
            },
            followerId: {
                type: DataTypes.STRING(30),
                allowNull: false,
            },
        },
        {
            freezeTableName: true,
        }
    );
    return Follow;
};
