const { User } = require('../models');
const {
	verifyPassword,
	generateAccessToken,
} = require('../helpers');
const { ErrorCodes, logger } = require('../utils');


module.exports.login = async (req, res, next) => {
	const { userName, password } = req.body;

	let user;
	try {
		user = await User.findOne({userName}).lean();
		if (!user) {
			return next(ErrorCodes.INVALID_USER);
		}
	} catch (error) {
		logger.error(
			`business_logic/authentication.js: login() | ${error} | ${JSON.stringify(
				error,
			)}`,
		);
		return next(error.message);
	}

	let token;

	try {
		const isValid = await verifyPassword(password, user.passwordHash);

		if (!isValid) {
			return next(ErrorCodes.INVALID_USER);
		}
	    token = await generateAccessToken(user);
	} catch (error) {
		logger.error(
			`business_logic/authentication.js: login() | ${error} | ${JSON.stringify(
				error,
			)}`,
		);
		return next(error.message);
	}

	delete user.passwordHash;
	return res.send({
		success: true,
		tokenData: {
			accessToken: token
		},
	});
};
