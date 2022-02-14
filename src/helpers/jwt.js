const jwt = require('jsonwebtoken');
const { config } = require('../utils');

module.exports.generateAccessToken = async ({ _id, role }) => {
	const token = jwt.sign(
		{
			sub: _id,
			role,
		},
		process.env.JWT_SECRETE_KEY,
		{
			expiresIn: config.jwtExpiry,
		},
	);

	return token;
};

// module.exports.generatePasswordResetToken = ({ email, _id, dateOfBirth }) => {
//   const token = jwt.sign(
//     {
//       _id,
//       dateOfBirth,
//       email,
//     },
//     process.env.JWT_PASSWORD_RESET_KEY,
//     {
//       expiresIn: config.JWT_PASSWORD_RESET_EXPIRY,
//     }
//   );

//   return token;
// };

// const generateEmailVerificationToken = ({ email, _id }) => {
//   const token = jwt.sign(
//     {
//       _id,
//       email,
//     },
//     process.env.JWT_EMAIL_VERIFICATION_KEY,
//     {
//       expiresIn: config.JWT_EMAIL_VERIFICATION_EXPIRY,
//     }
//   );

//   return token;
// };
