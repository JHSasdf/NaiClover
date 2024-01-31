export const AlarmModel = (sequelize: any, DataTypes: any) => {
    const Alarm = sequelize.define(
        'Alarm',
        {
            index: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
            },
            userid: {
                type: DataTypes.STRING(100),
                allowNull: false,
            },
            otherUserId: {
                type: DataTypes.STRING(100),
                allowNull: false,
            },
            option1: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },
            option2: {
                type: DataTypes.STRING(100),
                allowNull: true,
            },
            alarmType: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            checked: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
            },
        },
        {
            freezeTableName: true,
        }
    );
    return Alarm;
};
