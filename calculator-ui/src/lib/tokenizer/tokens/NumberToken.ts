import BasicToken from './BasicToken';
import TokenTypes from '../TokenTypes';

export default class NumberToken extends BasicToken {
	value: number;

	constructor(num: string) {
		super(TokenTypes.Number, num);
		this.value = parseFloat(num);
	}
}
