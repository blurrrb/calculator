import BasicToken from './BasicToken';
import TokenTypes from '../TokenTypes';

export default class AdditionToken extends BasicToken {
	constructor() {
		super(TokenTypes.Addition, '+');
	}
}
