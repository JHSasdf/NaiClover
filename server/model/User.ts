export const UserModel = (sequelize: any, DataTypes: any) => {
    const User = sequelize.define(
        'User',
        {
            userid: {
                primaryKey: true,
                type: DataTypes.STRING(30),
            },
            password: {
                type: DataTypes.STRING(1000),
                allowNull: false,
            },
            name: {
                type: DataTypes.STRING(30),
                allowNull: false,
            },
            gender: {
                type: DataTypes.STRING(1),
                allowNull: false,
            },
            nation: {
                type: DataTypes.STRING(30),
                allowNull: false,
            },
            firLang: {
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
