import { Sequelize } from 'sequelize';
import { getDBConfig } from '../config/config';
const config: any = getDBConfig();

const sequelize = new Sequelize(
    config.database!,
    config.username!,
    config.password!,
    config
);
import { UserModel } from './User';
import { LangModel } from './Lang';
import { PostModel } from './Post';
import { CommentModel } from './Comment';
import { FollowModel } from './Follow';
import { ChatModel } from './Chat';
import { RoomModel } from './Room';
import { ChatCountModel } from './ChatCount';
import { AlarmModel } from './Alarm';
import { PostLikeModel } from './PostLikes';
import { LangPostModel } from './LangPost';
import { LangCommentModel } from './LangComment';
import { LangPostLikeModel } from './LangPostLikes';
import { PostImageModel } from './PostImages';
import { CurrentNOPIMModel } from './CurrentNOPIM';

const User = UserModel(sequelize, Sequelize);
const Lang = LangModel(sequelize, Sequelize);
const Post = PostModel(sequelize, Sequelize);
const Comment = CommentModel(sequelize, Sequelize);
const PostLike = PostLikeModel(sequelize, Sequelize);
const LangPost = LangPostModel(sequelize, Sequelize);
const LangComment = LangCommentModel(sequelize, Sequelize);
const LangPostLike = LangPostLikeModel(sequelize, Sequelize);
const Follow = FollowModel(sequelize, Sequelize);
const Chat = ChatModel(sequelize, Sequelize);
const Room = RoomModel(sequelize, Sequelize);
const ChatCount = ChatCountModel(sequelize, Sequelize);
const Alarm = AlarmModel(sequelize, Sequelize);
const PostImages = PostImageModel(sequelize, Sequelize);
const CurrentNOPIM = CurrentNOPIMModel(sequelize, Sequelize);
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

export const db = {
    User,
    Lang,
    Post,
    Comment,
    Follow,
    Alarm,
    PostLike,
    LangPost,
    LangPostLike,
    LangComment,
    PostImages,
    Chat,
    Room,
    ChatCount,
    CurrentNOPIM,
    sequelize,
    Sequelize,
};

db.Sequelize = Sequelize;
db.sequelize = sequelize;
