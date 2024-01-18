const UserModel = (sequelize: any, DataTypes: any) => {
    const User = sequelize.define(
        'User',
        {
            user_id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                allowNull: false,
                autoIncrement: true,
            },
            name: {
                type: DataTypes.STRING(30),
                allowNull: false,
            },
            id: {
                type: DataTypes.STRING(30),
                allowNull: false,
            },
            password: {
                type: DataTypes.STRING(30),
                allowNull: false,
            },
            gender: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
            },
            nation: {
                type: DataTypes.STRING(30),
                allowNull: false,
            },
            native_lang: {
                type: DataTypes.STRING(30),
                allowNull: false,
            },
        },
        {
            freezeTableName: true,
        }
    );
    return User;
};

module.exports = UserModel;
