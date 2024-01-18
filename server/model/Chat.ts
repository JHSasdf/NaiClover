export const ChatModel = (sequelize: any, DataTypes: any) => {
    const Chat = sequelize.define(
        'Chat',
        {
            chatId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoincrement: true,
            },
            roomNum: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            userid: {
                allowNull: false,
                type: DataTypes.STRING(30),
            },
            content: {
                type: DataTypes.STRING(2000),
            },
        },
        {
            freezeTableName: true,
        }
    );
    return Chat;
};
