import { DataTypes, Model, Optional } from "sequelize";
import db from "../config/db";
import User from "./user.model";
import Post from "./post.model";

export type CommentAttributes = {
  id: string;
  content: string;
  userId: string;
  postId: string;
  parentCommentId?: string;
  createdAt?: Date;
  updatedAt?: Date;
};

interface CommentCreationAttributes extends Optional<CommentAttributes, "id"> {}

class Comment
  extends Model<CommentAttributes, CommentCreationAttributes>
  implements CommentAttributes
{
  public id!: string;
  public content!: string;
  public userId!: string;
  public postId!: string;
  public parentCommentId?: string;

  public readonly createdAt?: Date;
  public readonly updatedAt?: Date;
}

Comment.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: { model: User, key: "id" },
      onDelete: "CASCADE",
    },
    postId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: { model: Post, key: "id" },
      onDelete: "CASCADE",
    },
    parentCommentId: {
      type: DataTypes.UUID,
      allowNull: true,
      references: { model: "comments", key: "id" },
    },
  },
  {
    sequelize: db,
    tableName: "comments",
    modelName: "Comment",
    timestamps: true,
    underscored: true,
  }
);

export default Comment;
