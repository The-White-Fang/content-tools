const mongoose = require('mongoose');
const argon2 = require('argon2');

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
	isGraphicsDesigner: {
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
		minLength: 8,
		maxLength: 64,
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

schema.pre('save', async function (next) {
	if (!this.isModified('password')) {
		return next();
	}

	try {
		const hashedPassword = await argon2.hash(this.password, {
			type: argon2.argon2i,
		});

		this.password = hashedPassword;
		next();
	} catch (err) {
		next(err);
	}
});

const User = mongoose.model('User', schema);

module.exports = User;
