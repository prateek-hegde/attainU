/* eslint-disable radix */
const { ErrorCodes } = require('../utils/error_codes');

const createPagination = ({ page, limit }) => {
	const query = {};

	if (!page || !limit) {
		return {
			skip: 0,
			limit: 10,
		};
	}

	const pageNumber = parseInt(page) || 1;
    limit = parseInt(limit) || 10;

	query.skip = Math.ceil(limit * (pageNumber - 1));
	query.limit = limit

	return query;
};

const createPageMetaData = (totalRecords, { page, limit }) => {
	const totalPages = Math.ceil(totalRecords / (+limit || 10));

	const pageMetaData = {
		totalPages,
		totalRecords,
		limit: +limit || 10,
		page: +page || 1,
	};

	return pageMetaData;
};

module.exports = { createPagination, createPageMetaData };
