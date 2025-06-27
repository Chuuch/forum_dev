import Comment from "../../models/comment.model";
import { CommentAttributes } from "../../models/comment.model";
import Post from "../../models/post.model";

interface CreateCommentInput extends Omit<CommentAttributes, 'id' | 'createdAt' | 'updatedAt'> {
  userId: string;
  postId: string;
  content: string;
}

export const createComment = async (data: CreateCommentInput): Promise<Comment> => {
  if (!data.content) {
    throw new Error("Comment content is required");
  }

  if (data.content.length < 3) {
    throw new Error("Comment must be at least 3 characters long");
  }

  const post = await Post.findByPk(data.postId);
  if (!post) {
    throw new Error("Post not found");
  }

  return await Comment.create(data);
};

export const getCommentsByPostId = async (postId: string): Promise<Comment[]> => {
  const post = await Post.findByPk(postId);
  if (!post) {
    throw new Error("Post not found");
  }

  return await Comment.findAll({
    where: { postId },
    include: ['user'],
    order: [['createdAt', 'DESC']]
  });
};

export const editComment = async (id: string, content: string): Promise<Comment> => {
  const comment = await Comment.findByPk(id);
  if (!comment) {
    throw new Error("Comment not found");
  }

  if (!content) {
    throw new Error("Comment content is required");
  }

  if (content.length < 3) {
    throw new Error("Comment must be at least 3 characters long");
  }

  await Comment.update({ content }, { where: { id } });
  return Comment.findByPk(id, { include: ['user'] }) as Promise<Comment>;
};

export const deleteComment = async (id: string): Promise<void> => {
  const comment = await Comment.findByPk(id);
  if (!comment) {
    throw new Error("Comment not found");
  }

  await Comment.destroy({ where: { id } });
};
