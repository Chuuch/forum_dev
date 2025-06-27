import { DataTypes, Model, Optional } from "sequelize";
import db from "../config/db";
import User from "./user.model";
import Comment from "./comment.model";
import Vote from "./vote.model";
import Category from "./category.model";

export type PostAttributes = {
  id: string;
  title: string;
  content: string;
  image?: string;
  userId: string;
  categoryId: string;
  createdAt?: Date;
  updatedAt?: Date;
};

interface PostCreationAttributes extends Optional<PostAttributes, "id"> {}

class Post
  extends Model<PostAttributes, PostCreationAttributes>
  implements PostAttributes
{
  public id!: string;
  public title!: string;
  public content!: string;
  public image?: string;
  public userId!: string;
  public categoryId!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  // Association properties
  public author?: User;
  public comments?: Comment[];
  public votes?: Vote[];
}

Post.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: User,
        key: "id",
      },
      onDelete: "CASCADE",
    },
    categoryId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: Category,
        key: "id",
      },
      onDelete: "CASCADE",
    },
  },
  {
    sequelize: db,
    tableName: "posts",
    modelName: "Post",
    timestamps: true,
    underscored: true,
  }
);

export default Post;
