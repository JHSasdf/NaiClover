export const CurrentNOPIMModel = (sequelize: any, DataTypes: any) => {
    const CurrentNOPIM = sequelize.define(
        'CurrentNOPIM',
        {
            Index: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
            },
            roomNum: {
                type: DataTypes.STRING(100),
                allowNull: false,
            },
            numberOfPeople: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
        },
        {
            freezeTableName: true,
            timestamps: false,
        }
    );
    return CurrentNOPIM;
};
