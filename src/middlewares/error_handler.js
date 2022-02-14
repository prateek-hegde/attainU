// eslint-disable-next-line
const errorHandler = (error, _req, res, _next) => {
	if (typeof error === 'string') {
		// custom application error
		return res.status(400).json({ message: error });
	}

	if (error.name === 'UnauthorizedError') {
		// jwt authentication error
		return res.status(401).json({ message: 'Invalid Token' });
	}

	if (error.statusCode) {
		return res.status(error.statusCode).send(error);
	}

	// default to 500 server error
	return res.status(500).json({ message: error.message });
};

module.exports = errorHandler;
