import { DataTypes, Model, Optional } from "sequelize";
import User from "./user.model";
import Post from "./post.model";
import db from "../config/db";

export enum VoteType {
  UPVOTE = "UPVOTE",
  DOWNVOTE = "DOWNVOTE",
}

export interface VoteAttributes {
  id: string;
  userId: string;
  postId?: string;
  commentId?: string;
  type: VoteType;
  createdAt?: Date;
}

interface VoteCreationAttributes extends Optional<VoteAttributes, "id"> {}

class Vote
  extends Model<VoteAttributes, VoteCreationAttributes>
  implements VoteAttributes
{
  public id!: string;
  public userId!: string;
  public postId?: string;
  public commentId?: string;
  public type!: VoteType;

  public readonly createdAt!: Date;
}

Vote.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: { model: User, key: "id" },
      onDelete: "CASCADE",
    },
    postId: {
      type: DataTypes.UUID,
      allowNull: true,
      references: { model: Post, key: "id" },
      onDelete: "CASCADE",
    },
    commentId: {
      type: DataTypes.UUID,
      allowNull: true,
      references: { model: "comments", key: "id" },
      onDelete: "CASCADE",
    },
    type: {
      type: DataTypes.ENUM(...Object.values(VoteType)),
      allowNull: false,
    },
  },
  {
    sequelize: db,
    tableName: "votes",
    modelName: "Vote",
    timestamps: true,
    underscored: true,
  }
);

export default Vote;
