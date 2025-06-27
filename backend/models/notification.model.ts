import { DataTypes, Model, Optional } from "sequelize";
import db from "../config/db";
import User from "./user.model";
import Post from "./post.model";
import Comment from "./comment.model";

export interface NotificationAttributes {
  id: string;
  userId: string;
  type: "comment" | "vote";
  message: string;
  isRead: boolean;
  postId?: string;
  commentId?: string;
  createdAt?: Date;
}

// This makes `id` and `isRead` optional when creating:
export interface NotificationCreationAttributes
  extends Optional<NotificationAttributes, "id" | "isRead"> {}

class Notification
  extends Model<NotificationAttributes, NotificationCreationAttributes>
  implements NotificationAttributes
{
  public id!: string;
  public userId!: string;
  public type!: "comment" | "vote";
  public message!: string;
  public isRead!: boolean;
  public postId?: string;
  public commentId?: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Notification.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: { model: User, key: "id" },
      onDelete: "CASCADE",
    },
    type: {
      type: DataTypes.ENUM("comment", "vote"),
      allowNull: false,
    },
    message: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isRead: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    postId: {
      type: DataTypes.UUID,
      allowNull: true,
      references: { model: Post, key: "id" },
    },
    commentId: {
      type: DataTypes.UUID,
      allowNull: true,
      references: { model: Comment, key: "id" },
    },
  },
  {
    sequelize: db,
    modelName: "Notification",
    tableName: "notifications",
    timestamps: true,
    underscored: true,
  }
);

// Remove duplicate associations since they're defined in associations.ts
export default Notification;
