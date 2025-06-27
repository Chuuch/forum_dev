import { Request, Response } from "express";
import * as voteService from "../services/vote.service";

export const vote = async (req: Request, res: Response) => {
  const vote = await voteService.castVote(req.body);
  res.status(201).json(vote);
};

export const getVotes = async (req: Request, res: Response) => {
  const votes = await voteService.getVotesByPostId(req.params.postId);
  res.json(votes);
};
