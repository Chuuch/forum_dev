import User from "./user.model";
import Post from "./post.model";
import Comment from "./comment.model";
import Vote from "./vote.model";
import Category from "./category.model";
import Notification from "./notification.model";

// User associations
User.hasMany(Post, {
  foreignKey: "userId",
  as: "posts",
});
User.hasMany(Comment, {
  foreignKey: "userId",
  as: "comments",
});
User.hasMany(Vote, {
  foreignKey: "userId",
  as: "votes",
});
User.hasMany(Notification, {
  foreignKey: "userId",
  as: "notifications",
});

// Post associations
Post.belongsTo(User, {
  foreignKey: "userId",
  as: "author",
});
Post.belongsTo(Category, {
  foreignKey: "categoryId",
  as: "category",
});
Post.hasMany(Comment, {
  foreignKey: "postId",
  as: "comments",
});
Post.hasMany(Vote, {
  foreignKey: "postId",
  as: "votes",
});

// Comment associations
Comment.belongsTo(User, {
  foreignKey: "userId",
  as: "author",
});
Comment.belongsTo(Post, {
  foreignKey: "postId",
  as: "post",
});
Comment.belongsTo(Comment, {
  foreignKey: "parentCommentId",
  as: "parentComment",
});
Comment.hasMany(Comment, {
  foreignKey: "parentCommentId",
  as: "replies",
});
Comment.hasMany(Vote, {
  foreignKey: "commentId",
  as: "votes",
});

// Category associations
Category.hasMany(Post, {
  foreignKey: "categoryId",
  as: "posts",
});

// Vote associations
Vote.belongsTo(User, {
  foreignKey: "userId",
  as: "user",
});
Vote.belongsTo(Post, {
  foreignKey: "postId",
  as: "post",
});
Vote.belongsTo(Comment, {
  foreignKey: "commentId",
  as: "comment",
});

// Notification associations
Notification.belongsTo(User, {
  foreignKey: "userId",
  as: "recipient",
});
Notification.belongsTo(Post, {
  foreignKey: "postId",
  as: "post",
});
Notification.belongsTo(Comment, {
  foreignKey: "commentId",
  as: "comment",
}); 