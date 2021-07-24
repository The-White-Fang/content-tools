const express = require('express');

const auth = require('./middlewares/auth');
const router = require('./routes');
const connectToDB = require('./inc/connect-db');

// define cosntants
const PORT = process.env?.PORT || 3000;
const PUBLICROUTES = ['/login', '/register'];

const server = express();

// add middlewares
server.use(express.json());
server.use(auth(PUBLICROUTES));

// add root-router middleware
server.use(router);

// start server after database connection is established
console.log('starting server..');
connectToDB().then((success) => {
	if (!success) {
		return console.log('exiting');
	}
	server.listen(PORT, () => console.log(`Listening to requests on PORT: ${PORT}`));
});
