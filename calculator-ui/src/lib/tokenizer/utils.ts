import Error, { ErrorMessages } from '$lib/error';
import type BasicToken from './tokens/BasicToken';
import TokenTypes from './TokenTypes';

export function validateNumber(num: string): [boolean, Error] {
	const validNumberRegex = /^\d+\.\d+|\d+$/;
	if (validNumberRegex.test(num)) return [true, null];

	return [false, new Error(ErrorMessages.INVALID_NUMBER)];
}

export function isOperator(token: BasicToken): boolean {
	switch (token.type) {
		case TokenTypes.Addition:
		case TokenTypes.Subtraction:
		case TokenTypes.Multiplication:
		case TokenTypes.Division:
			return true;
		default:
			return false;
	}
}
