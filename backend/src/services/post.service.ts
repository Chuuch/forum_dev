import Post, { PostAttributes } from "../../models/post.model";
import { VoteType } from "../../models/vote.model";

interface CreatePostInput extends Omit<PostAttributes, 'id' | 'createdAt' | 'updatedAt'> {
  userId: string;
  title: string;
  content: string;
  category?: string;  // Allow category as an alternative to categoryId
}

interface UpdatePostInput extends Partial<Omit<PostAttributes, 'id' | 'createdAt' | 'updatedAt'>> {
  title?: string;
  content?: string;
}

interface PostResponse extends PostAttributes {
  author: string;
  avatar?: string;
  commentsCount: number;
  upvotes: number;
  downvotes: number;
}

export const createPost = async (data: CreatePostInput): Promise<Post> => {
  // Ensure categoryId is set from the category field
  const postData = {
    ...data,
    categoryId: data.categoryId || data.category
  } as PostAttributes;
  
  if (!postData.categoryId) {
    throw new Error("Category is required");
  }

  return await Post.create(postData);
};

export const getAllPosts = async (): Promise<PostResponse[]> => {
  const posts = await Post.findAll({
    order: [['createdAt', 'DESC']],
    include: ['author', 'comments', 'votes', 'category']
  });

  return posts.map(post => ({
    ...post.toJSON(),
    author: post.author?.username || 'Anonymous',
    avatar: post.author?.photo,
    commentsCount: post.comments?.length || 0,
    upvotes: post.votes?.filter(vote => vote.type === VoteType.UPVOTE).length || 0,
    downvotes: post.votes?.filter(vote => vote.type === VoteType.DOWNVOTE).length || 0
  }));
};

export const getPostById = async (id: string): Promise<PostResponse> => {
  const post = await Post.findByPk(id, {
    include: ['author', 'comments', 'votes', 'category']
  });

  if (!post) {
    throw new Error("Post not found");
  }

  return {
    ...post.toJSON(),
    author: post.author?.username || 'Anonymous',
    avatar: post.author?.photo,
    commentsCount: post.comments?.length || 0,
    upvotes: post.votes?.filter(vote => vote.type === VoteType.UPVOTE).length || 0,
    downvotes: post.votes?.filter(vote => vote.type === VoteType.DOWNVOTE).length || 0
  };
};

export const editPost = async (id: string, data: UpdatePostInput): Promise<PostResponse> => {
  const post = await Post.findByPk(id);

  if (!post) {
    throw new Error("Post not found");
  }

  if (data.title && data.title.length < 3) {
    throw new Error("Title must be at least 3 characters long");
  }

  if (data.content && data.content.length < 10) {
    throw new Error("Content must be at least 10 characters long");
  }

  await Post.update(data, { where: { id } });
  return getPostById(id);
};

export const deletePost = async (id: string): Promise<void> => {
  const post = await Post.findByPk(id);

  if (!post) {
    throw new Error("Post not found");
  }

  await Post.destroy({ where: { id } });
};
