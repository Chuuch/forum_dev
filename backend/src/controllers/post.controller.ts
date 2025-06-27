import { Request, Response } from "express";
import * as postService from "../services/post.service";

export const create = async (req: Request, res: Response): Promise<void> => {
  if (!req.user?.id) {
    res.status(401).json({ message: "User not authenticated" });
    return;
  }
  const post = await postService.createPost({ ...req.body, userId: req.user.id });
  res.status(201).json(post);
};

export const getAllPosts = async (_req: Request, res: Response): Promise<void> => {
  const posts = await postService.getAllPosts();
  res.json(posts);
};

export const getById = async (req: Request, res: Response): Promise<void> => {
  const post = await postService.getPostById(req.params.id);

  if (post) {
    res.json(post);
  } else {
    res.status(404).json({ message: "Post not found" });
  }
};

export const update = async (req: Request, res: Response): Promise<void> => {
  await postService.editPost(req.params.id, req.body);
  res.status(200).json({ message: "Post updated" });
};

export const remove = async (req: Request, res: Response): Promise<void> => {
  await postService.deletePost(req.params.id);
  res.status(204).send();
};
