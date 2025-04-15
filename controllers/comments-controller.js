const CommentsModel = require('../models/comments-model');
const Joi = require('joi');

const createComment = async (req, res) => {
    const schema = {
        postId: Joi.number().integer().required(),
        userId: Joi.number().integer().required(),
        content: Joi.string().min(3).max(2000).required(),
    }

    const error = Joi.object(schema).validate(req.body);
    if (error.error) {
        return res.status(400).send(error.error.details[0].message);
    }

    const postId = req.body.postId;
    const userId = req.body.userId;

    if (!postId || !userId) {
        return res.status(400).send('Post ID and User ID are required');
    }

    try {
        const comment = await CommentsModel.createComment(postId, userId, req.body.content);
        res.status(201).send(comment);
    } catch (err) {
        console.error('Error creating comment:', err);
        res.status(500).send(err);
    }
}

const getCommentsByPostId = async (req, res) => {
    const postId = req.params.postId;

    if (!postId) {
        return res.status(400).send('Post ID is required');
    }

    try {
        const comments = await CommentsModel.getCommentsByPostId(postId);
        res.status(200).send(comments);
    } catch (err) {
        console.error('Error fetching comments:', err);
        res.status(500).send(err);
    }
}

const updateComment = async (req, res) => {
    const schema = {
        content: Joi.string().min(3).max(2000).required(),
    }

    const error = Joi.object(schema).validate(req.body);
    if (error.error) {
        return res.status(400).send(error.error.details[0].message);
    }

    const commentId = req.params.commentId;

    if (!commentId) {
        return res.status(400).send('Comment ID is required');
    }

    try {
        const comment = await CommentsModel.updateComment(commentId, req.body.content);
        res.status(200).send(comment);
    } catch (err) {
        console.error('Error updating comment:', err);
        res.status(500).send(err);
    }
}
const deleteComment = async (req, res) => {
    const commentId = req.params.commentId;

    if (!commentId) {
        return res.status(400).send('Comment ID is required');
    }

    try {
        const result = await CommentsModel.deleteComment(commentId);
        if (!result) {
            return res.status(400).send('Error deleting comment');
        }
        res.status(200).send('Comment deleted successfully');
    } catch (err) {
        console.error('Error deleting comment:', err);
        res.status(500).send(err);
    }
}
const getCommentById = async (req, res) => {
    const commentId = req.params.commentId;

    if (!commentId) {
        return res.status(400).send('Comment ID is required');
    }

    try {
        const comment = await CommentsModel.getCommentById(commentId);
        if (!comment) {
            return res.status(400).send('Comment not found');
        }
        res.status(200).send(comment);
    } catch (err) {
        console.error('Error fetching comment:', err);
        res.status(500).send(err);
    }
}

module.exports = {
    createComment,
    getCommentsByPostId,
    updateComment,
    deleteComment,
    getCommentById
}