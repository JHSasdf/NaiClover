import { Sequelize } from 'sequelize';

const config = require(__dirname + '/../config/config.json')['development'];

const sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
);

const User = require('./User')(sequelize, Sequelize);
const Lang = require('./Lang')(sequelize, Sequelize);
const Post = require('./Post')(sequelize, Sequelize);
const Comment = require('./Comment')(sequelize, Sequelize);
const Follow = require('./Follow')(sequelize, Sequelize);

// User가 배우고 있는 언어(1:N)
User.hasMany(Lang, {
    foreignKey: 'userid',
    sourceKey: 'userid',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
});
Lang.belongsTo(User, {
    foreignKey: 'userid',
    targetKey: 'userid',
});

// User가 작성한 게시물들(1:N)
User.hasMany(Post, {
    foreignKey: 'userid',
    sourceKey: 'userid',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
});
Post.belongsTo(User, {
    foreignKey: 'userid',
    targetKey: 'userid',
});

// Post에 달린 댓글들(1:N)
Post.hasMany(Comment, {
    foreignKey: 'postId',
    sourceKey: 'postId',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
});
Comment.belongsTo(Post, {
    foreignKey: 'postId',
    targetKey: 'postId',
});

// Follow (N:M)
Follow.belongsTo(User, {
    foreignKey: 'userid',
    targetKey: 'userid',
});
Follow.belongsTo(User, {
    foreignKey: 'followerId',
    targetKey: 'userid',
});

User.belongsToMany(User, {
    through: Follow,
    as: 'Following',
    foreignKey: 'userid', // 중간테이블 Follow의 외래키 userid
    sourceKey: 'userid', // User의 userid를 source로 참조한다.
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
});

User.belongsToMany(User, {
    through: Follow,
    as: 'Follower',
    foreignKey: 'followerId', // 중간테이블 Follow의 외래키 followerId
    sourceKey: 'userid', // User의 userid를 source로 참조한다.
});

export const db = { User, Lang, Post, Comment, Follow, sequelize, Sequelize };

db.Sequelize = Sequelize;
db.sequelize = sequelize;
