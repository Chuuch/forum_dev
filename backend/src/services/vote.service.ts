import Vote, { VoteType } from "../../models/vote.model";
import { VoteAttributes } from "../../models/vote.model";
import Post from "../../models/post.model";
import { Op } from "sequelize";

interface CreateVoteInput extends Omit<VoteAttributes, 'id' | 'createdAt' | 'updatedAt'> {
  userId: string;
  postId: string;
  type: VoteType;
}

export const castVote = async (data: CreateVoteInput): Promise<Vote> => {
  const post = await Post.findByPk(data.postId);
  if (!post) {
    throw new Error("Post not found");
  }

  // Check if user already voted
  const existingVote = await Vote.findOne({
    where: {
      userId: data.userId,
      postId: data.postId
    }
  });

  if (existingVote) {
    // Update existing vote
    await Vote.update(
      { type: data.type },
      { where: { id: existingVote.id } }
    );
    return Vote.findByPk(existingVote.id) as Promise<Vote>;
  }

  // Create new vote
  return await Vote.create(data);
};

export const getVotesByPostId = async (postId: string): Promise<{ upvotes: number; downvotes: number }> => {
  const post = await Post.findByPk(postId);
  if (!post) {
    throw new Error("Post not found");
  }

  const votes = await Vote.findAll({
    where: { postId }
  });

  const upvotes = votes.filter(vote => vote.type === VoteType.UPVOTE).length;
  const downvotes = votes.filter(vote => vote.type === VoteType.DOWNVOTE).length;

  return { upvotes, downvotes };
};
