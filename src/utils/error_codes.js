module.exports.ErrorCodes = {
	INVALID_USER: {
		statusCode: 422,
		code: 'INVALID_USER',
		message: 'User not found',
	},
	INVALID_ADMIN_SECRETE: {
		statusCode: 401,
		code: 'NOT_AUTHORIZED',
		message: 'Cannot create admin user',
	},
	INTERNAL_SERVER_ERROR: {
		statusCode: 500,
		code: 'INTERNAL_SERVER_ERROR',
		message: 'Internal Server Error',
	},
	INVALID_PAGE_NUMBER: {
		statusCode: 422,
		code: 'INVALID_PAGE_NUMBER',
		message: 'Invalid page number, should be positive integer',
	},
};

module.exports.joiStringErrorMessage = (
	field,
	required = true,
	maxCharecter = undefined
  ) => {
	return {
	  "string.base": `'${field}' should be a type of 'text'`,
	  "string.empty": `'${field}' cannot be an empty field`,
	  ...(maxCharecter && {
		"string.max": `'${field}' should have a maximum length of ${maxCharecter} charecters`,
	  }),
	  ...(required && { "any.required": `'${field}' is a required field` }),
	};
  };
