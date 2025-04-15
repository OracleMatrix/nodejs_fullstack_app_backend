const jwt = require('jsonwebtoken');
require('dotenv').config();

function validateLang(req, res, next) {
    if (!req.body.name || req.body.name.length < 3) {
        return res.status(400).send('Name is required and should be at least 3 characters long');
    }
    next();
}
function auth(req, res, next) {
    const token = req.header('authorization');
    if (!token) {
        return res.status(401).send('Access denied. No token provided.');
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (ex) {
        return res.status(401).send('Invalid token.');
    }

}

module.exports = {
    validateLang,
    auth
};