import { derived } from 'svelte/store';
import Parser from '$lib/parser';
import tokenStore from './TokenStore';

const parser = new Parser();
const evalStore = derived(tokenStore, (tokens) => {
	console.log('evaluating tokens:', tokens);
	return parser.evaluate(tokens);
});

export default evalStore;
