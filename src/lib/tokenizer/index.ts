import Error, { ErrorMessages } from '$lib/error';
import {
	AdditionToken,
	ClosingParenthesisToken,
	DivisionToken,
	MultiplicationToken,
	NegationToken,
	NumberToken,
	OpeningParenthesisToken,
	SubtractionToken
} from './tokens';
import type BasicToken from './tokens/BasicToken';
import TokenTypes from './TokenTypes';
import { isOperator } from './utils';

export default class Tokenizer {
	tokens: BasicToken[];
	prevTokenIdx: number;
	openingParenthesisPositions: number[];
	parenthesisCount: number;

	constructor() {
		this.resetTokens();
	}

	resetTokens(): void {
		this.tokens = [];
		this.prevTokenIdx = this.tokens.length - 1;
		this.openingParenthesisPositions = [];
		this.parenthesisCount = 0;
	}

	getTokens(): BasicToken[] {
		return this.tokens;
	}

	insertBasicToken(token: BasicToken): void {
		this.tokens.push(token);
		this.prevTokenIdx++;
	}

	removeBasicToken(): BasicToken {
		if (this.tokens.length == 0) return null;
		const token = this.tokens.pop();
		this.prevTokenIdx--;
		return token;
	}

	insertAdditionToken(): Error {
		if (
			this.tokens.length == 0 ||
			this.tokens[this.prevTokenIdx].type == TokenTypes.OpeningParenthesis
		) {
			return new Error(ErrorMessages.INVALID_SYNTAX);
		}

		if (
			isOperator(this.tokens[this.prevTokenIdx]) &&
			this.tokens[this.prevTokenIdx].type != TokenTypes.Addition
		) {
			this.tokens[this.prevTokenIdx] = new AdditionToken();
		} else {
			this.insertBasicToken(new AdditionToken());
		}
		return null;
	}

	insertSubtractionToken(): Error {
		if (
			this.tokens.length == 0 ||
			this.tokens[this.prevTokenIdx].type == TokenTypes.OpeningParenthesis
		) {
			return new Error(ErrorMessages.INVALID_SYNTAX);
		}

		if (
			isOperator(this.tokens[this.prevTokenIdx]) &&
			this.tokens[this.prevTokenIdx].type != TokenTypes.Subtraction
		) {
			this.tokens[this.prevTokenIdx] = new SubtractionToken();
		} else {
			this.insertBasicToken(new SubtractionToken());
		}
		return null;
	}

	insertMultiplicationToken(): Error {
		if (
			this.tokens.length == 0 ||
			this.tokens[this.prevTokenIdx].type == TokenTypes.OpeningParenthesis
		) {
			return new Error(ErrorMessages.INVALID_SYNTAX);
		}

		if (
			isOperator(this.tokens[this.prevTokenIdx]) &&
			this.tokens[this.prevTokenIdx].type != TokenTypes.Multiplication
		) {
			this.tokens[this.prevTokenIdx] = new MultiplicationToken();
		} else {
			this.insertBasicToken(new MultiplicationToken());
		}
		return null;
	}

	insertDivisionToken(): Error {
		if (
			this.tokens.length == 0 ||
			this.tokens[this.prevTokenIdx].type == TokenTypes.OpeningParenthesis
		) {
			return new Error(ErrorMessages.INVALID_SYNTAX);
		}

		if (
			isOperator(this.tokens[this.prevTokenIdx]) &&
			this.tokens[this.prevTokenIdx].type != TokenTypes.Division
		) {
			this.tokens[this.prevTokenIdx] = new DivisionToken();
		} else {
			this.insertBasicToken(new DivisionToken());
		}
		return null;
	}

	insertOpeningParenthesis(): Error {
		this.insertBasicToken(new OpeningParenthesisToken());
		this.openingParenthesisPositions.push(this.prevTokenIdx);
		this.parenthesisCount++;
		return null;
	}

	insertClosingParenthesis(): Error {
		if (this.parenthesisCount == 0) return new Error(ErrorMessages.INVALID_SYNTAX);
		this.insertBasicToken(
			new ClosingParenthesisToken(
				this.openingParenthesisPositions[this.openingParenthesisPositions.length - 1]
			)
		);
		this.parenthesisCount--;
		return null;
	}

	removeOpeningParenthesis(): Error {
		if (
			this.tokens.length == 0 ||
			this.tokens[this.prevTokenIdx].type != TokenTypes.OpeningParenthesis
		) {
			return new Error(ErrorMessages.DELETION_ERROR);
		}

		this.removeBasicToken();
		this.openingParenthesisPositions.pop();
		this.parenthesisCount--;
		return null;
	}

	removeClosingParenthesis(): Error {
		if (
			this.tokens.length == 0 ||
			this.tokens[this.prevTokenIdx].type != TokenTypes.ClosingParenthesis
		) {
			return new Error(ErrorMessages.DELETION_ERROR);
		}

		this.removeBasicToken();
		this.parenthesisCount++;
		return null;
	}

	toggleOrInsertNegationToken(): Error {
		const isNumber = this.tokens[this.prevTokenIdx].type == TokenTypes.Number;
		let numberToken;
		if (isNumber) {
			numberToken = this.removeBasicToken();
		}

		if (this.tokens.length == 0 || this.tokens[this.prevTokenIdx].type != TokenTypes.Negation) {
			this.insertOpeningParenthesis();
			this.insertBasicToken(new NegationToken());
		} else {
			this.removeBasicToken();
			this.removeOpeningParenthesis();
		}

		if (isNumber) {
			this.insertBasicToken(numberToken);
		}

		return null;
	}

	removeOperator(): Error {
		if (this.tokens.length == 0 || !isOperator(this.tokens[this.prevTokenIdx])) {
			return new Error(ErrorMessages.DELETION_ERROR);
		}
		this.removeBasicToken();
	}

	insertDigit(digit: string): Error {
		// TODO: fix this method
		this.insertBasicToken(new NumberToken(digit));
		return null;
	}

	removeDigit(): Error {
		// TODO: fix this method
		if (this.tokens.length == 0 || this.tokens[this.prevTokenIdx].type != TokenTypes.Number) {
			return new Error(ErrorMessages.DELETION_ERROR);
		}

		this.removeBasicToken();
		return null;
	}
}
