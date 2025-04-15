const PostsModel = require('../models/posts-model');
const Joi = require('joi');

const getAllPosts = async (req, res) => {
    try {
        const posts = await PostsModel.getAllPosts();
        if (!posts || posts.length === 0) {
            return res.status(400).send('There are no posts!');
        }
        res.send(posts);
    } catch (err) {
        console.error('Error fetching posts:', err);
        res.status(500).send('Internal server error');
    }
}

const getPostById = async (req, res) => {
    try {
        const id = req.params.id;
        const post = await PostsModel.getPostById(id);
        if (!post) {
            return res.status(400).send('Post not found');
        }
        const formattedPost = {
            id: post.id,
            title: post.title,
            content: post.content,
            created_at: post.created_at,
            updated_at: post.updated_at,
            user: {
                id: post.user_id,
                email: post.email,
                name: post.name
            }
        };
        res.status(200).send(formattedPost);
    } catch (err) {
        console.error('Error fetching post by ID:', err);
        res.status(500).send('Internal server error');
    }
}

const getAllUserPosts = async (req, res) => {
    const userId = req.params.id;
    if (!userId) {
        return res.status(400).send('User ID is required');
    }

    try {
        const posts = await PostsModel.getAllUserPosts(userId);
        if (!posts || posts.length === 0) {
            return res.status(400).send('There are no posts for this user!');
        }
        res.send(posts);
    } catch (err) {
        console.error('Error fetching user posts:', err);
        res.status(500).send('Internal server error');
    }
}

const createPost = async (req, res) => {
    const schema = {
        title: Joi.string().min(3).max(100).required(),
        content: Joi.string().min(3).max(2000).required(),
    }

    const error = Joi.object(schema).validate(req.body);
    if (error.error) {
        return res.status(400).send(error.error.details[0].message);
    }

    const userId = req.params.id;
    if (!userId) {
        return res.status(400).send('User ID is required');
    }

    try {
        const post = await PostsModel.createPost(req.body.title, req.body.content, userId);
        if (!post) {
            return res.status(400).send('Error on creating post');
        }
        const formattedPost = {
            id: post.id,
            title: post.title,
            content: post.content,
            created_at: post.created_at,
            updated_at: post.updated_at,
            user: {
                id: post.user_id,
                email: post.email,
                name: post.name
            }
        };
        res.status(201).send(formattedPost);
    } catch (err) {
        console.error('Error creating post:', err);
        res.status(500).send(err);
    }
}

const updatePost = async (req, res) => {
    const schema = {
        title: Joi.string().min(3).max(45).required(),
        content: Joi.string().min(3).max(2000).required(),
    }

    const error = Joi.object(schema).validate(req.body);
    if (error.error) {
        return res.status(400).send(error.error.details[0].message);
    }

    try {
        const id = req.params.id;
        const post = await PostsModel.updatePost(id, req.body.title, req.body.content);
        if (!post) {
            return res.status(404).send('Post not found');
        }
        res.send(post);
    } catch (err) {
        console.error('Error updating post:', err);
        res.status(500).send('Internal server error');
    }
}

const deletePost = async (req, res) => {
    try {
        const id = req.params.id;
        const posts = await PostsModel.deletePost(id);
        if (!posts) {
            return res.status(404).send('Post not found');
        }
        res.send(posts);
    } catch (err) {
        console.error('Error deleting post:', err);
        res.status(500).send('Internal server error');
    }
}

module.exports = {
    getAllPosts,
    getPostById,
    getAllUserPosts,
    createPost,
    updatePost,
    deletePost
}
