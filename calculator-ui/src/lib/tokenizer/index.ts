import { ErrorMessages } from '$lib/error';
import {
	AdditionToken,
	DivisionToken,
	MultiplicationToken,
	NegationToken,
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
			this.tokens.push(new AdditionToken());
			this.prevTokenIdx++;
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
			this.tokens.push(new SubtractionToken());
			this.prevTokenIdx++;
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
			this.tokens.push(new MultiplicationToken());
			this.prevTokenIdx++;
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
			this.tokens.push(new DivisionToken());
			this.prevTokenIdx++;
		}
		return null;
	}

	insertOpeningParenthesis(): Error {
		this.tokens.push(new OpeningParenthesisToken());
		this.prevTokenIdx++;
		this.openingParenthesisPositions.push(this.prevTokenIdx);
		this.parenthesisCount++;
		return null;
	}

	removeOpeningParenthesis(): Error {
		if (
			this.tokens.length == 0 ||
			this.tokens[this.prevTokenIdx].type != TokenTypes.OpeningParenthesis
		) {
			return Error(ErrorMessages.DELETION_ERROR);
		}

		this.tokens.pop();
		this.openingParenthesisPositions.pop();
		this.parenthesisCount--;
		this.prevTokenIdx--;
		return null;
	}

	insertNegationToken(): Error {
		if (this.tokens.length == 0 || this.tokens[this.prevTokenIdx].type != TokenTypes.Negation) {
			this.insertOpeningParenthesis();
			this.tokens.push(new NegationToken());
			this.prevTokenIdx++;
		} else if (this.tokens[this.prevTokenIdx].type == TokenTypes.Negation) {
			this.tokens.pop();
			this.prevTokenIdx--;
			this.removeOpeningParenthesis();
		}
		return null;
	}
}
