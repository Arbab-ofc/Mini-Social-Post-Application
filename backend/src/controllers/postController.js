const mongoose = require('mongoose');
const Post = require('../models/Post');

const shapePost = (post, currentUserId = null) => {
  const plain = post.toObject();
  const isLiked = currentUserId
    ? plain.likes.some((like) => String(like.userId) === String(currentUserId))
    : false;

  return {
    ...plain,
    likesCount: plain.likes.length,
    commentsCount: plain.comments.length,
    isLikedByCurrentUser: isLiked
  };
};

const getPosts = async (req, res, next) => {
  try {
    const page = Math.max(Number(req.query.page) || 1, 1);
    const limit = Math.min(Math.max(Number(req.query.limit) || 20, 1), 50);

    const total = await Post.countDocuments();
    const posts = await Post.find()
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    const currentUserId = req.user?._id || null;

    return res.status(200).json({
      posts: posts.map((post) => shapePost(post, currentUserId)),
      page,
      limit,
      total,
      hasMore: page * limit < total
    });
  } catch (error) {
    return next(error);
  }
};

const getPostById = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ message: 'Invalid post id' });
    }

    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    const currentUserId = req.user?._id || null;

    return res.status(200).json({ post: shapePost(post, currentUserId) });
  } catch (error) {
    return next(error);
  }
};

const createPost = async (req, res, next) => {
  try {
    const text = String(req.body.text || '').trim();
    const image = req.file ? `/uploads/${req.file.filename}` : '';

    if (!text && !image) {
      return res.status(400).json({ message: 'Post must contain text or image' });
    }

    const post = await Post.create({
      user: req.user._id,
      username: req.user.username,
      text,
      image
    });

    return res.status(201).json({ post: shapePost(post, req.user._id) });
  } catch (error) {
    return next(error);
  }
};

const likePost = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ message: 'Invalid post id' });
    }

    const post = await Post.findById(id);

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    const likedIndex = post.likes.findIndex((like) => String(like.userId) === String(req.user._id));

    if (likedIndex >= 0) {
      post.likes.splice(likedIndex, 1);
    } else {
      post.likes.push({
        userId: req.user._id,
        username: req.user.username
      });
    }

    await post.save();

    return res.status(200).json({ post: shapePost(post, req.user._id) });
  } catch (error) {
    return next(error);
  }
};

const commentOnPost = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ message: 'Invalid post id' });
    }

    const text = String(req.body.text || '').trim();

    if (!text) {
      return res.status(400).json({ message: 'Comment text is required' });
    }

    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    post.comments.push({
      userId: req.user._id,
      username: req.user.username,
      text,
      createdAt: new Date()
    });

    await post.save();

    return res.status(200).json({ post: shapePost(post, req.user._id) });
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  getPosts,
  getPostById,
  createPost,
  likePost,
  commentOnPost
};
