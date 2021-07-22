const mongoose = require('mongoose');
const { database } = require('../config.json');

module.exports = () => {
	const { username, password, host, dbname, authSource } = database;
	mongoose
		.connect(`mongodb://${username}:${encodeURIComponent(password)}@${host}/${dbname}?authSource=${authSource}`, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		})
		.then(() => console.log('connected to database'))
		.catch((err) => console.log('database connection failed\n', err));
};
