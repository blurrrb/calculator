import BasicToken from './BasicToken';
import TokenTypes from '../TokenTypes';

export default class SubtractionToken extends BasicToken {
	constructor() {
		super(TokenTypes.Subtraction, '-');
	}
}
