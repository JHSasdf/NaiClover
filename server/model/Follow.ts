export const FollowModel = (sequelize: any, DataTypes: any) => {
    const Follow = sequelize.define(
        'Follow',
        {
            index: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
            },
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
