export const RoomModel = (sequelize: any, DataTypes: any) => {
    const Room = sequelize.define(
        'Room',
        {
            roomNum: {
                type: DataTypes.STRING(100),
                allowNull: false,
                primaryKey: true,
            },
            roomName: {
                type: DataTypes.STRING(100),
                allowNull: false,
            },
            userid: {
                type: DataTypes.STRING(30),
                allowNull: false,
            },
            useridTo: {
                type: DataTypes.STRING(30),
                allowNull: false,
            },
            restrictedLang: {
                type: DataTypes.STRING(30),
                allowNull: true,
            },
        },
        {
            freezeTableName: true,
        }
    );
    return Room;
};
