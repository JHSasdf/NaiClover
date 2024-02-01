export const ChatCountModel = (sequelize: any, DataTypes: any) => {
    const ChatCount = sequelize.define(
        'ChatCount',
        {
            chatCountIndex: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
            },
            roomNum: {
                type: DataTypes.STRING(100),
                allowNull: false,
            },
            chatIndex: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            userid: {
                allowNull: false,
                type: DataTypes.STRING(30),
            },
            useridTo: {
                allowNull: false,
                type: DataTypes.STRING(30),
            },
        },
        {
            freezeTableName: true,
            timestamps: false,
        }
    );
    return ChatCount;
};
