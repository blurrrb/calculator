import type { NumberToken } from '$lib/tokenizer/tokens';
import type BasicToken from '$lib/tokenizer/tokens/BasicToken';
import TokenTypes from '$lib/tokenizer/TokenTypes';

export default class Parser {
	tokens: BasicToken[];
	idx: number;

	nextToken(): BasicToken {
		if (this.idx < this.tokens.length) return this.tokens[this.idx];
		else return null;
	}

	scanToken(): BasicToken {
		const token = this.nextToken();
		this.idx++;
		return token;
	}

	parseE(): number {
		let a = 0;
		let operation: TokenTypes = TokenTypes.Addition;
		while (this.nextToken()) {
			const b = this.parseT();
			if (b == null) return null;
			switch (operation) {
				case TokenTypes.Addition:
					a = a + b;
					break;
				case TokenTypes.Subtraction:
					a = a - b;
					break;
			}
			if (
				this.nextToken() &&
				(this.nextToken().type == TokenTypes.Addition ||
					this.nextToken().type == TokenTypes.Subtraction)
			) {
				operation = this.scanToken().type;
			} else {
				return a;
			}
		}
		return a;
	}

	parseT(): number {
		let a = 1;
		let operation = TokenTypes.Multiplication;
		while (this.nextToken()) {
			const b = this.parseF();
			if (b == null) return null;
			switch (operation) {
				case TokenTypes.Multiplication:
					a = a * b;
					break;
				case TokenTypes.Division:
					a = a / b;
					break;
			}
			if (
				this.nextToken() &&
				(this.nextToken().type == TokenTypes.Multiplication ||
					this.nextToken().type == TokenTypes.Division)
			) {
				operation = this.scanToken().type;
			} else {
				return a;
			}
		}
		return a;
	}

	parseF(): number {
		if (this.nextToken().type == TokenTypes.Number) {
			const token = <NumberToken>this.scanToken();
			return token.value;
		} else if (this.nextToken().type == TokenTypes.OpeningParenthesis) {
			this.scanToken();
			const val = this.parseE();
			this.scanToken();
			return val;
		} else if (this.nextToken().type == TokenTypes.Negation) {
			this.scanToken();
			if (!this.nextToken()) return null;
			const val = this.parseF();
			return -1 * val;
		}
	}

	evaluate(tokens: BasicToken[]): number {
		if (tokens.length == 0) return 0;
		this.tokens = tokens;
		this.idx = 0;
		return this.parseE();
	}
}
