const pool = require('../utilities/mysql_database');

class UsersModel {
    static insertUser = async (name, email, password) => {
        try {
            const [result] = await pool.query('INSERT INTO users (name, email, password) VALUES (?, ?, ?)', [name, email, password]);
            return UsersModel.getUserById(result.insertId);
        } catch (error) {
            console.error('Error creating user:', error);
            throw error;
        }
    }
    static getUserById = async (id) => {
        try {
            const [rows] = await pool.query('SELECT * FROM users WHERE id = ?', [id]);
            return rows[0];
        } catch (error) {
            console.error('Error fetching user by ID:', error);
            throw error;
        }
    }
    static getUserByEmail = async (email) => {
        try {
            const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
            return rows[0];
        } catch (error) {
            console.error('Error fetching user by email:', error);
            throw error;
        }
    }
    static getAllUsers = async () => {
        try {
            const [rows] = await pool.query('SELECT * FROM users');
            return rows;
        } catch (error) {
            console.error('Error fetching users:', error);
            throw error;
        }
    }
    static updateUser = async (id, name, email, password) => {
        try {
            await pool.query('UPDATE users SET name = ?, email = ?, password = ? WHERE id = ?', [name, email, password, id]);
            return UsersModel.getUserById(id);
        } catch (error) {
            console.error('Error updating user:', error);
            throw error;
        }
    }
    static deleteUser = async (id) => {
        const [user] = await pool.query('SELECT * FROM users WHERE id = ?', [id]);
        if (!user[0]) return null;
        await pool.query('DELETE FROM posts WHERE user_id = ?', [id]);
        await pool.query('DELETE FROM users WHERE id = ?', [id]);
        return user[0];
    }

}

module.exports = UsersModel;