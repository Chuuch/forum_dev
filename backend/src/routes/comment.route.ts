import express from "express";
import * as commentController from "../controllers/comment.controller";
const commentRouter = express.Router();

commentRouter.post("/", commentController.addComment);
commentRouter.get("/post/:postId", commentController.getComments);
commentRouter.patch("/:id", commentController.updateComment);
commentRouter.delete("/:id", commentController.deleteComment);

export default commentRouter;
