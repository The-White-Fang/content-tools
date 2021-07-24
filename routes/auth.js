const { Router } = require('express');
const jwt = require('jsonwebtoken');
const argon2 = require('argon2');
const { promisify } = require('util');
const { Error } = require('mongoose');

const { User } = require('../models');
const {
	jwt: { secret },
} = require('../config.json');

const sign = promisify(jwt.sign);

const router = Router();

router.post('/login', async (req, res) => {
	const { username, password } = req.body;

	if (!username || !password) {
		res.status(400);
		return res.json({
			status: false,
			error_code: 'AUTH400',
			error_desc: 'missing params',
		});
	}

	try {
		const user = await User.findOne({ username });
		if (!user) {
			res.status(401);
			return res.json({
				status: false,
				error_code: 'AUTH404',
				error_desc: 'user not found',
			});
		}

		const isAuthorized = await argon2.verify(user.password, password);

		if (!isAuthorized) {
			res.status(401);
			return res.json({
				status: false,
				error_code: 'AUTH401',
				error_desc: 'invalid credentials',
			});
		}

		const token = await sign(user.toObject(), secret, { expiresIn: '7 days' });

		res.json({
			status: true,
			data: { token },
		});
	} catch (err) {
		console.log(err);

		res.status(500);
		res.json({
			status: false,
			error_code: 'PROC500',
			error_desc: 'authentication failed',
		});
	}
});

router.post('/register', async (req, res) => {
	const { username, password, firstName, lastName, isSuperUser, isAdmin, isGraphicsDesigner, isClient } = req.body;

	try {
		const userObj = { username, password, firstName, lastName, isSuperUser, isAdmin, isGraphicsDesigner, isClient };
		const user = new User(userObj);

		const resp = await user.save();
		resp.password = undefined;

		const token = await sign(resp.toObject(), secret, { expiresIn: '7 days' });

		res.json({
			status: true,
			data: {
				user: resp,
				token,
			},
		});
	} catch (err) {
		console.log(err);

		const isValidationError = err instanceof Error.ValidationError;

		res.status(isValidationError ? 400 : 500);
		res.json({
			status: false,
			error_code: isValidationError ? 'AUTH400' : 'PROC500',
			error_desc: err.message,
		});
	}
});

module.exports = router;
