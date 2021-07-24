const mongoose = require('mongoose');
const { database } = require('../config.json');

module.exports = async () => {
	try {
		const { username, password, host, dbname, authSource } = database;

		await mongoose.connect(`mongodb://${username}:${encodeURIComponent(password)}@${host}/${dbname}?authSource=${authSource}`, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useCreateIndex: true,
		});

		console.log('connected to database');

		return true;
	} catch (err) {
		console.log(err);

		return false;
	}
};
