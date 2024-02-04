export const LangCommentModel = (sequelize: any, DataTypes: any) => {
    const LangComment = sequelize.define(
        'LangComment',
        {
            index: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
            },
            postId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            userid: {
                type: DataTypes.STRING(30),
                allowNull: false,
            },
            content: {
                type: DataTypes.STRING(2000),
                allowNull: false,
            },
            isrevised: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
            },
        },
        {
            freezeTableName: true,
        }
    );
    return LangComment;
};
