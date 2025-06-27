import express from "express";
import * as voteController from "../controllers/vote.controller";
const voteRouter = express.Router();

voteRouter.post("/", voteController.vote);
voteRouter.get("/post/:postId", voteController.getVotes);

export default voteRouter;
