import express from "express";
import * as postController from "../controllers/post.controller";
import { authMiddleware } from "../middlewares/authMiddleware";

const postRouter = express.Router();
postRouter.post("/", authMiddleware, postController.create);
postRouter.get("/", postController.getAllPosts);
postRouter.get("/:id", postController.getById);
postRouter.patch("/:id", postController.update);
postRouter.delete("/:id", postController.remove);

export default postRouter;
