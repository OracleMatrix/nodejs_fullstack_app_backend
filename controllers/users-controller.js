const UsersModel = require('../models/users-model');
const Joi = require('joi');
const _ = require('lodash');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const register = async (req, res) => {
    const schema = Joi.object({
        name: Joi.string().min(3).max(45).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(6).max(20).required(),
    });

    const { error } = schema.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    try {
        const user = await UsersModel.getUserByEmail(req.body.email);
        if (user) return res.status(400).send('User already exists');

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        const newUser = await UsersModel.insertUser(req.body.name, req.body.email, hashedPassword);
        const token = jwt.sign({ id: newUser.id }, process.env.JWT_SECRET);
        res.header('Authorization', token).status(201).send(_.pick(newUser, ['id', 'name', 'email']));
    } catch (err) {
        console.error('Register error:', err);
        res.status(500).send('Internal server error');
    }
}

const login = async (req, res) => {
    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(6).max(20).required(),
    });

    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    try {
        const user = await UsersModel.getUserByEmail(req.body.email);
        if (!user) {
            return res.status(400).send('Invalid email or password');
        }

        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if (!validPassword) {
            return res.status(400).send('Invalid email or password');
        }

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
        res.header('authorization', token);
        res.status(200).send(_.pick(user, ['id', 'name', 'email']));
    } catch (err) {
        console.error('Error checking user:', err);
        res.status(500).send('Internal server error');
    }
}

const getAllUsers = async (req, res) => {
    try {
        const users = await UsersModel.getAllUsers();
        if (!users) {
            return res.status(404).send('No users found');
        }
        res.status(200).send(users.map(user => _.pick(user, ['id', 'name', 'email'])));
    } catch (err) {
        console.error('Error fetching users:', err);
        res.status(500).send('Internal server error');
    }
}

const getUserById = async (req, res) => {
    try {
        const id = req.params.id;
        const user = await UsersModel.getUserById(id);
        if (!user) {
            return res.status(404).send('User not found');
        }
        res.status(200).send(_.pick(user, ['id', 'name', 'email']));
    } catch (err) {
        console.error('Error fetching user:', err);
        res.status(500).send('Internal server error');
    }
}

const updateUser = async (req, res) => {
    const schema = Joi.object({
        name: Joi.string().min(3).max(45).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(6).max(20).required(),
    });

    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    try {
        const id = req.params.id;
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        const user = await UsersModel.updateUser(id, req.body.name, req.body.email, hashedPassword);
        if (!user) {
            return res.status(404).send('User not found');
        }
        res.status(200).send(_.pick(user, ['id', 'name', 'email']));
    } catch (err) {
        console.error('Error updating user:', err);
        res.status(500).send('Internal server error');
    }
}

const deleteUser = async (req, res) => {
    try {
        const id = req.params.id;
        const user = await UsersModel.deleteUser(id);
        if (!user) {
            return res.status(404).send('User not found');
        }
        res.status(200).send(_.pick(user, ['id', 'name', 'email']));
    } catch (err) {
        console.error('Error deleting user:', err);
        res.status(500).send('Internal server error');
    }
}

module.exports = {
    login,
    register,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser
}
