"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
var sequelize_1 = require("sequelize");
var config_1 = require("../config/config");
var config = (0, config_1.getDBConfig)();
var sequelize = new sequelize_1.Sequelize(config.database, config.username, config.password, config);
var User_1 = require("./User");
var Lang_1 = require("./Lang");
var Post_1 = require("./Post");
var Comment_1 = require("./Comment");
var Follow_1 = require("./Follow");
var Chat_1 = require("./Chat");
var Room_1 = require("./Room");
var ChatCount_1 = require("./ChatCount");
var Alarm_1 = require("./Alarm");
var PostLikes_1 = require("./PostLikes");
var LangPost_1 = require("./LangPost");
var LangComment_1 = require("./LangComment");
var LangPostLikes_1 = require("./LangPostLikes");
var PostImages_1 = require("./PostImages");
var CurrentNOPIM_1 = require("./CurrentNOPIM");
var User = (0, User_1.UserModel)(sequelize, sequelize_1.Sequelize);
var Lang = (0, Lang_1.LangModel)(sequelize, sequelize_1.Sequelize);
var Post = (0, Post_1.PostModel)(sequelize, sequelize_1.Sequelize);
var Comment = (0, Comment_1.CommentModel)(sequelize, sequelize_1.Sequelize);
var PostLike = (0, PostLikes_1.PostLikeModel)(sequelize, sequelize_1.Sequelize);
var LangPost = (0, LangPost_1.LangPostModel)(sequelize, sequelize_1.Sequelize);
var LangComment = (0, LangComment_1.LangCommentModel)(sequelize, sequelize_1.Sequelize);
var LangPostLike = (0, LangPostLikes_1.LangPostLikeModel)(sequelize, sequelize_1.Sequelize);
var Follow = (0, Follow_1.FollowModel)(sequelize, sequelize_1.Sequelize);
var Chat = (0, Chat_1.ChatModel)(sequelize, sequelize_1.Sequelize);
var Room = (0, Room_1.RoomModel)(sequelize, sequelize_1.Sequelize);
var ChatCount = (0, ChatCount_1.ChatCountModel)(sequelize, sequelize_1.Sequelize);
var Alarm = (0, Alarm_1.AlarmModel)(sequelize, sequelize_1.Sequelize);
var PostImages = (0, PostImages_1.PostImageModel)(sequelize, sequelize_1.Sequelize);
var CurrentNOPIM = (0, CurrentNOPIM_1.CurrentNOPIMModel)(sequelize, sequelize_1.Sequelize);
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
//User당 갖고있는 Alarm들(1:N)
User.hasMany(Alarm, {
    foreignKey: 'userid',
    sourceKey: 'userid',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
});
Alarm.belongsTo(User, {
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
// Post and Likes (1 : N)
// User and Likes (1 : N)
Post.hasMany(PostLike, {
    foreignKey: 'postId',
    sourceKey: 'postId',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
});
PostLike.belongsTo(Post, {
    foreignKey: 'postId',
    targetKey: 'postId',
});
User.hasMany(PostLike, {
    foreignKey: 'userid',
    sourceKey: 'userid',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
});
PostLike.belongsTo(User, {
    foreignKey: 'userid',
    targetKey: 'userid',
});
// post image
Post.hasMany(PostImages, {
    foreignKey: 'postId',
    sourceKey: 'postId',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
});
PostImages.belongsTo(Post, {
    foreignKey: 'postId',
    targetKey: 'postId',
});
User.hasMany(PostImages, {
    foreignKey: 'userid',
    sourceKey: 'userid',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
});
PostImages.belongsTo(User, {
    foreignKey: 'userid',
    targetKey: 'userid',
});
// Post and comments (1 : N)
// User and comments (1 : N)
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
User.hasMany(Comment, {
    foreignKey: 'userid',
    sourceKey: 'userid',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
});
Comment.belongsTo(User, {
    foreignKey: 'userid',
    targetKey: 'userid',
});
//
// User가 작성한 Lang 게시물들(1:N)
User.hasMany(LangPost, {
    foreignKey: 'userid',
    sourceKey: 'userid',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
});
LangPost.belongsTo(User, {
    foreignKey: 'userid',
    targetKey: 'userid',
});
// LangPost and LangLikes (1 : N)
// User and LangLikes (1 : N)
LangPost.hasMany(LangPostLike, {
    foreignKey: 'postId',
    sourceKey: 'postId',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
});
LangPostLike.belongsTo(LangPost, {
    foreignKey: 'postId',
    targetKey: 'postId',
});
User.hasMany(LangPostLike, {
    foreignKey: 'userid',
    sourceKey: 'userid',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
});
LangPostLike.belongsTo(User, {
    foreignKey: 'userid',
    targetKey: 'userid',
});
// LangPost and Langcomments (1 : N)
// User and Langcomments (1 : N)
LangPost.hasMany(LangComment, {
    foreignKey: 'postId',
    sourceKey: 'postId',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
});
LangComment.belongsTo(LangPost, {
    foreignKey: 'postId',
    targetKey: 'postId',
});
User.hasMany(LangComment, {
    foreignKey: 'userid',
    sourceKey: 'userid',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
});
LangComment.belongsTo(User, {
    foreignKey: 'userid',
    targetKey: 'userid',
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
//룸:chat = 1:N
Room.hasMany(Chat, {
    foreignKey: 'roomNum',
    sourceKey: 'roomNum',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
});
Chat.belongsTo(Room, {
    foreignKey: 'roomNum',
    targetKey: 'roomNum',
});
User.hasMany(Room, {
    foreignKey: 'userid',
    sourceKey: 'userid',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
});
Room.belongsTo(User, {
    foreignKey: 'userid',
    targetKey: 'userid',
});
User.hasMany(Room, {
    foreignKey: 'useridTo',
    sourceKey: 'userid',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
});
Room.belongsTo(User, {
    foreignKey: 'useridTo',
    targetKey: 'userid',
});
// User: chat = 1 : N
User.hasMany(Chat, {
    foreignKey: 'userid',
    sourceKey: 'userid',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
});
Chat.belongsTo(User, {
    foreignKey: 'userid',
    targetKey: 'userid',
});
Room.hasMany(ChatCount, {
    foreignKey: 'roomNum',
    sourceKey: 'roomNum',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
});
ChatCount.belongsTo(Room, {
    foreignKey: 'roomNum',
    targetKey: 'roomNum',
});
Chat.hasMany(ChatCount, {
    foreignKey: 'chatIndex',
    sourceKey: 'chatIndex',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
});
ChatCount.belongsTo(Chat, {
    foreignKey: 'chatIndex',
    targetKey: 'chatIndex',
});
User.hasMany(ChatCount, {
    foreignKey: 'userid',
    sourceKey: 'userid',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
});
ChatCount.belongsTo(User, {
    foreignKey: 'userid',
    targetKey: 'userid',
});
User.hasMany(ChatCount, {
    foreignKey: 'useridTo',
    sourceKey: 'userid',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
});
ChatCount.belongsTo(User, {
    foreignKey: 'useridTo',
    targetKey: 'userid',
});
Room.hasMany(CurrentNOPIM, {
    foreignKey: 'roomNum',
    sourceKey: 'roomNum',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
});
CurrentNOPIM.belongsTo(Room, {
    foreignKey: 'roomNum',
    targetKey: 'roomNum',
});
exports.db = {
    User: User,
    Lang: Lang,
    Post: Post,
    Comment: Comment,
    Follow: Follow,
    Alarm: Alarm,
    PostLike: PostLike,
    LangPost: LangPost,
    LangPostLike: LangPostLike,
    LangComment: LangComment,
    PostImages: PostImages,
    Chat: Chat,
    Room: Room,
    ChatCount: ChatCount,
    CurrentNOPIM: CurrentNOPIM,
    sequelize: sequelize,
    Sequelize: sequelize_1.Sequelize,
};
exports.db.Sequelize = sequelize_1.Sequelize;
exports.db.sequelize = sequelize;
