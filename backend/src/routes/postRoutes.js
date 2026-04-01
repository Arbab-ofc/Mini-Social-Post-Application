const express = require('express');
const { getPosts, getPostById, createPost, likePost, commentOnPost } = require('../controllers/postController');
const authMiddleware = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

const router = express.Router();

router.get('/', getPosts);
router.get('/:id', getPostById);
router.post('/', authMiddleware, upload.single('image'), createPost);
router.post('/:id/like', authMiddleware, likePost);
router.post('/:id/comment', authMiddleware, commentOnPost);

module.exports = router;
