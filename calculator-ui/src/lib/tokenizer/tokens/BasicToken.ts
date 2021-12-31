import type TokenTypes from '../TokenTypes';

export default class BasicToken {
	str: string;
	type: TokenTypes;

	constructor(type: TokenTypes, str = '') {
		this.type = type;
		this.str = str;
	}
}
