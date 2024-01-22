export const RoomModel = (sequelize: any, DataTypes: any) => {
    const Room = sequelize.define(
        'Room',
        {
            RoomId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoincrement: true,
            },
            roomNum: {
                type: DataTypes.INTEGER,
                allowNull: false,
                unique: true,
            },
        },
        {
            freezeTableName: true,
        }
    );
    return Room;
};
