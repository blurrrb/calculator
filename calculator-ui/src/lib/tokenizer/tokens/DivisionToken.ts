import BasicToken from './BasicToken';
import TokenTypes from '../TokenTypes';

export default class DivisionToken extends BasicToken {
	constructor() {
		super(TokenTypes.Division, '/');
	}
}
