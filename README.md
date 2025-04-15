# 🚀 Node.js API

Welcome to the **Node.js API**! 🎉 This project is a backend RESTful API built with Node.js and Express, designed to manage users, posts, and comments. It features secure user authentication, full CRUD operations for posts and comments, and comprehensive API documentation with Swagger. 🛠️✨

You can find the **FRONT-END** project in this repository : [flutter_fullstack_app](https://github.com/OracleMatrix/flutter_fullstack_app) 🔗

---

## 🌟 Features

- 👤 **User Management**
  - User registration and login with secure authentication 🔐
  - View, update, and delete user profiles

- 📝 **Posts**
  - Create, read, update, and delete posts 🆕✏️🗑️
  - Retrieve all posts or posts by a specific user

- 💬 **Comments**
  - Add comments to posts
  - View, update, and delete comments on posts

- 📚 **API Documentation**
  - Interactive API docs available via Swagger UI at `/api-docs` 📖🖥️

- 🔒 **Security**
  - Authentication middleware protecting routes
  - Helmet for securing HTTP headers
  - CORS enabled for cross-origin requests

- 🛠️ **Utilities**
  - Logging with Morgan for request monitoring
  - Environment configuration with dotenv

---

## 🚀 Getting Started

### Prerequisites

- Node.js (version 8 or higher)
- MySQL database (configured via environment variables)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/OracleMatrix/nodejs_fullstack_app_backend
   cd nodejs_fullstack_app_backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up your `.env` file with the necessary environment variables (e.g., database credentials, `APP_PORT`).

4. Start the server:
   ```bash
   npm start
   ```

5. Access the API at `http://localhost:3000` (or your configured port).

6. View API documentation at `http://localhost:3000/api-docs`.

---

## 📂 Project Structure

- `app.js` - Main application setup and middleware
- `routes/` - API route definitions for users, posts, and comments
- `controllers/` - Business logic for handling requests
- `models/` - Database models for users, posts, and comments
- `Middlewares/` - Authentication and other middleware
- `utilities/` - Database connection and utility functions
- `swagger.js` - Swagger API documentation setup

---

## 🤝 Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.

---

## 📄 License

This project is licensed under the MIT License.

---

Made with ❤️ and ☕ by Node.js enthusiasts!
