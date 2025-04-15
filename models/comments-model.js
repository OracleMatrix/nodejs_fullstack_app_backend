const pool = require('../utilities/mysql_database');

class CommentsModel {
    static createComment = async (postId, userId, content) => {
        try {
            const [checkPostExists] = await pool.query('SELECT * FROM posts WHERE id = ?', [postId]);
            if (!checkPostExists[0]) throw new Error('Post not found');

            const [checkUserExists] = await pool.query('SELECT * FROM users WHERE id = ?', [userId]);
            if (!checkUserExists[0]) throw new Error('User not found');

            const [result] = await pool.query(
                'INSERT INTO comments (post_id, user_id, content) VALUES (?, ?, ?)',
                [postId, userId, content]
            );

            return await CommentsModel.getCommentById(result.insertId);
        } catch (error) {
            console.error('Error creating comment:', error);
            throw error;
        }
    }

    static getCommentById = async (id) => {
        try {
            const [rows] = await pool.query(`
                SELECT comments.*, users.name, users.email
                FROM comments
                JOIN users ON comments.user_id = users.id
                WHERE comments.id = ?
            `, [id]);
            return rows[0];
        } catch (error) {
            console.error('Error fetching comment by ID:', error);
            throw error;
        }
    }

    static getCommentsByPostId = async (postId) => {
        try {
            const [rows] = await pool.query(`
                SELECT comments.*, users.name, users.email
                FROM comments
                JOIN users ON comments.user_id = users.id
                WHERE comments.post_id = ?
                ORDER BY comments.created_at DESC
            `, [postId]);
            return rows;
        } catch (error) {
            console.error('Error fetching comments by post ID:', error);
            throw error;
        }
    }

    static updateComment = async (id, content) => {
        try {
            await pool.query('UPDATE comments SET content = ? WHERE id = ?', [content, id]);
            return await CommentsModel.getCommentById(id);
        } catch (error) {
            console.error('Error updating comment:', error);
            throw error;
        }
    }

    static deleteComment = async (id) => {
        try {
            await pool.query('DELETE FROM comments WHERE id = ?', [id]);
            return { message: 'Comment deleted successfully' };
        } catch (error) {
            console.error('Error deleting comment:', error);
            throw error;
        }
    }
}

module.exports = CommentsModel;
