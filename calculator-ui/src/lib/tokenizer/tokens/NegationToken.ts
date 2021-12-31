import BasicToken from './BasicToken';
import TokenTypes from '../TokenTypes';

export default class NegationToken extends BasicToken {
	constructor() {
		super(TokenTypes.Negation, '-');
	}
}
