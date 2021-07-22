const jwt = require('jsonwebtoken');
const { promisify } = require('util');

const verify = promisify(jwt.verify);

const auth = (exclude = []) => {
	return async (req, res, next) => {
		const authHeader = req.header('authorization'),
			baseUrl = req.originalUrl.split('?')[0];

		const isExcluded = exclude.includes(baseUrl);

		if (isExcluded) {
			return next();
		}

		if (!authHeader) {
			res.status(401);
			return res.json({
				status: false,
				error_code: 'AUTH401',
				error_desc: 'missing authorization header',
			});
		}

		try {
			const payload = await verify(authHeader, '0b1010010');
			req.user = payload;
			next();
		} catch (err) {
			console.log(err);
			res.status(401);
			res.json({
				status: false,
				error_code: 'AUTH401',
				error_desc: 'invalid auth token',
			});
		}
	};
};

module.exports = auth;
