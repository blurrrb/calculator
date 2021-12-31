import BasicToken from './BasicToken';
import TokenTypes from '../TokenTypes';

export default class ClosingParenthesisToken extends BasicToken {
	openingBracketLocation: number;

	constructor(openingBracketLocation: number) {
		super(TokenTypes.ClosingParenthesis, ')');
		this.openingBracketLocation = openingBracketLocation;
	}
}
