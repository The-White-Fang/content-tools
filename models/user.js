const mongoose = require('mongoose');

const schema = new mongoose.Schema({
	username: {
		type: String,
		required: true,
		unique: true,
		validate: {
			validator: (val) => {
				const regex = /^[a-z0-9.\-_]{4,30}$/;
				return regex.test(val);
			},
			message: "`username` must be 4 to 30 characters long. Allowed characters: 'a-z', '0-9', '.', '-', '_'",
		},
	},
	firstName: {
		type: String,
		required: true,
		minLength: 2,
		maxLength: 15,
	},
	lastName: {
		type: String,
		required: true,
		minLength: 2,
		maxLength: 15,
	},
	isSuperUser: {
		type: Boolean,
		required: true,
		default: false,
	},
	isAdmin: {
		type: Boolean,
		required: true,
		default: false,
	},
	isWriter: {
		type: Boolean,
		required: true,
		default: false,
	},
	isClient: {
		type: Boolean,
		required: true,
		default: true,
	},
	password: {
		type: String,
		required: true,
	},
	created: {
		type: Date,
		required: true,
		default: Date.now,
	},
	active: Boolean,
	approved: Date,
	approvedBy: mongoose.Schema.Types.ObjectId,
});

const User = mongoose.model('User', schema);

module.exports = User;
