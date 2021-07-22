const express = require('express');

const auth = require('./middlewares/auth');
const router = require('./routes');
const connectToDB = require('./inc/connect-db');

const PORT = process.env?.PORT || 3000;

connectToDB();

const server = express();

server.use(express.json());

server.use(auth(['/login']));

server.use(router);

server.listen(PORT, () => console.log(`Listening to requests on PORT: ${PORT}`));
