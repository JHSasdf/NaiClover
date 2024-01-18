export const LangModel = (sequelize: any, DataTypes: any) => {
    const Lang = sequelize.define(
        'Lang',
        {
            index: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
            },
            learningLang: {
                type: DataTypes.STRING(30),
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
    return Lang;
};
