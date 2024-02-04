export const ChatModel = (sequelize: any, DataTypes: any) => {
    const Chat = sequelize.define(
        'Chat',
        {
            chatIndex: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
            },
            roomNum: {
                type: DataTypes.STRING(100),
                allowNull: false,
            },
            userid: {
                allowNull: false,
                type: DataTypes.STRING(30),
            },
            toWhom: {
                allowNull: true,
                type: DataTypes.STRING(30),
            },
            content: {
                type: DataTypes.STRING(2000),
                allowNull: false,
            },
            isrevised: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: false,
            },
            isFirst: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: false,
            },
        },
        {
            freezeTableName: true,
        }
    );
    return Chat;
};
