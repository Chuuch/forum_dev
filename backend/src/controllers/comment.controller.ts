import { Request, Response } from "express";
import * as commentService from "../services/comment.service";
import * as postService from "../services/post.service";
import * as notificationService from "../services/notification.service";

export const addComment = async (req: Request, res: Response) => {
  try {
    const comment = await commentService.createComment(req.body);

    const post = await postService.getPostById(comment.postId);

    if (post && post.userId !== comment.userId) {
      await notificationService.createNotification({
        userId: post.userId,
        type: "comment",
        message: `New comment on your post by user ${comment.userId}`,
        postId: comment.postId,
        commentId: comment.id,
      });
    }

    res.status(201).json(comment);
  } catch (error) {
    console.error("Error adding comment:", error);
    res.status(500).json({ error: "Failed to add comment" });
  }
};

export const getComments = async (req: Request, res: Response) => {
  try {
    const comments = await commentService.getCommentsByPostId(
      req.params.postId
    );
    res.json(comments);
  } catch (error) {
    console.error("Error fetching comments:", error);
    res.status(500).json({ error: "Failed to get comments" });
  }
};

export const updateComment = async (req: Request, res: Response) => {
  try {
    await commentService.editComment(req.params.id, req.body.content);
    res.status(200).json({ message: "Comment updated" });
  } catch (error) {
    console.error("Error updating comment:", error);
    res.status(500).json({ error: "Failed to update comment" });
  }
};

export const deleteComment = async (req: Request, res: Response) => {
  try {
    await commentService.deleteComment(req.params.id);
    res.status(200).json({ message: "Comment deleted" });
  } catch (error) {
    console.error("Error deleting comment:", error);
    res.status(500).json({ error: "Failed to delete comment" });
  }
};
