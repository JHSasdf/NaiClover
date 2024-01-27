export const MypageImageModel = (sequelize: any, DataTypes: any) => {
    const MypageImages = sequelize.define(
        'MypageImages',
        {
            number: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
            },
            userid: {
                type: DataTypes.STRING(30),
                allowNull: false,
            },
            path: {
                type: DataTypes.STRING(100),
                allowNull: false,
            },
        },
        {
            freezeTableName: true,
            timestamps: false,
        }
    );
    return MypageImages;
};
