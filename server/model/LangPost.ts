export const LangPostModel = (sequelize: any, DataTypes: any) => {
    const LangPost = sequelize.define(
        'LangPost',
        {
            postId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
            },
            userid: {
                type: DataTypes.STRING(30),
                allowNull: false,
            },
            content: {
                type: DataTypes.STRING(2000),
            },
        },
        {
            freezeTableName: true,
        }
    );
    return LangPost;
};
