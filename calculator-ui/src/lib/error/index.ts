export default class Error {
	errorMessage: string;

	constructor(errorMessage = '') {
		this.errorMessage = errorMessage;
	}
}

export enum ErrorMessages {
	INVALID_NUMBER = 'Invalid number',
	MISSING_CLOSING_BRACKET = 'Missing closing bracket',
	INVALID_SYNTAX = 'Invalid format used',
	DELETION_ERROR = 'Failed to delete'
}
