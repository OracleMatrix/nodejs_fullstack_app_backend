const helmet = require('helmet');
const morgan = require('morgan');
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(morgan('dev'));
app.use(cors());

const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger');

const usersRoute = require('./routes/users-route');
const postsRoute = require('./routes/posts-route');
const commentsRoute = require('./routes/comments-route');

app.use('/api/comments', commentsRoute);
app.use('/api/users', usersRoute);
app.use('/api/posts', postsRoute);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

const port = process.env.APP_PORT || 3000;
app.listen(port, () => console.log(`Server is running on port ${port}`));