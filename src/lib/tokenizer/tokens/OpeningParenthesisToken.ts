import BasicToken from './BasicToken';
import TokenTypes from '../TokenTypes';

export default class OpeningParenthesisToken extends BasicToken {
	colorString: string;

	constructor(colorString = '#ff0000') {
		super(TokenTypes.OpeningParenthesis, '(');
		this.colorString = colorString;
	}
}
