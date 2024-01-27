export const RoomModel = (sequelize: any, DataTypes: any) => {
    const Room = sequelize.define(
        'Room',
        {
            roomNum: {
                type: DataTypes.STRING(100),
                allowNull: false,
                primaryKey: true,
            },
            userid: {
                type: DataTypes.STRING(30),
                allowNull: false,
            },
        },
        {
            freezeTableName: true,
        }
    );
    return Room;
};
