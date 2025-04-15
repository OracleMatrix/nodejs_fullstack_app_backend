const pool = require('../utilities/mysql_database');

class PostsModel {
    static getAllPosts = async () => {
        try {
            const [rows] = await pool.query(`
                SELECT 
                posts.*,
                users.name,
                users.email,
                JSON_ARRAYAGG(
                    JSON_OBJECT(
                        'id', comments.id,
                        'user_id', comments.user_id,
                        'content', comments.content,
                        'created_at', comments.created_at
                    )
                ) AS comments
            FROM posts
            JOIN users ON posts.user_id = users.id
            LEFT JOIN comments ON comments.post_id = posts.id
            GROUP BY posts.id
            ORDER BY posts.created_at DESC
            `);
            return rows;
        } catch (error) {
            console.error('Error fetching posts:', error);
            throw error;
        }
    }

    static getPostById = async (id) => {
        try {
            const [rows] = await pool.query(`
                SELECT posts.*, users.email, users.name 
                FROM posts 
                JOIN users ON posts.user_id = users.id
                WHERE posts.id = ?
            `, [id]);
            return rows[0];
        } catch (error) {
            console.error('Error fetching post by ID:', error);
            throw error;
        }
    }

    static getAllUserPosts = async (userId) => {
        try {
            const [rows] = await pool.query(`
                SELECT posts.*, users.email, users.name 
                FROM posts 
                JOIN users ON posts.user_id = users.id
                WHERE posts.user_id = ?
                ORDER BY posts.created_at DESC
            `, [userId]);
            return rows;
        }
        catch (error) {
            console.error('Error fetching user posts:', error);
            throw error;
        }
    }

    static createPost = async (title, content, userId) => {
        try {
            const [checkUserExists] = await pool.query('SELECT * FROM users WHERE id = ?', [userId]);
            if (!checkUserExists[0]) {
                throw 'User not found';
            }
            const [result] = await pool.query(
                'INSERT INTO posts (title, content, user_id) VALUES (?, ?, ?)',
                [title, content, userId]
            );
            return PostsModel.getPostById(result.insertId);
        } catch (error) {
            console.error('Error creating post:', error);
            throw error;
        }
    }

    static updatePost = async (id, title, content) => {
        try {
            await pool.query('UPDATE posts SET title = ?, content = ? WHERE id = ?', [title, content, id]);
            return PostsModel.getPostById(id);
        } catch (error) {
            console.error('Error updating post:', error);
            throw error;
        }
    }
    static deletePost = async (id) => {
        try {
            const [result] = await pool.query('DELETE FROM posts WHERE id = ?', [id]);
            return PostsModel.getAllPosts();
        } catch (error) {
            console.error('Error deleting post:', error);
            throw error;
        }
    }
}
module.exports = PostsModel;