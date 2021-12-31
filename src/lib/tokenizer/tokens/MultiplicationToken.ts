import BasicToken from './BasicToken';
import TokenTypes from '../TokenTypes';

export default class MultiplicationToken extends BasicToken {
	constructor() {
		super(TokenTypes.Multiplication, 'x');
	}
}
