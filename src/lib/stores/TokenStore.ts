import Tokenizer from '$lib/tokenizer';
import { writable } from 'svelte/store';

const tokenizer = new Tokenizer();
const tokenStore = writable(tokenizer.getTokens());

const wrapTokenizerMethod = (tokenizerMethod) => {
	return (...args) => {
		return () => {
			navigator.vibrate(5);
			const err = tokenizerMethod(...args);
			if (err) {
				console.log('Error occurred while processing: ', err.errorMessage);
				return;
			}
			tokenStore.set(tokenizer.getTokens());
		};
	};
};

export default {
	subscribe: tokenStore.subscribe,
	insertAdditionToken: wrapTokenizerMethod(tokenizer.insertAdditionToken.bind(tokenizer)),
	insertSubtractionToken: wrapTokenizerMethod(tokenizer.insertSubtractionToken.bind(tokenizer)),
	insertMultiplicationToken: wrapTokenizerMethod(
		tokenizer.insertMultiplicationToken.bind(tokenizer)
	),
	insertDivisionToken: wrapTokenizerMethod(tokenizer.insertDivisionToken.bind(tokenizer)),
	toggleOrInsertNegationToken: wrapTokenizerMethod(
		tokenizer.toggleOrInsertNegationToken.bind(tokenizer)
	),
	insertDigit: wrapTokenizerMethod(tokenizer.insertDigit.bind(tokenizer)),
	insertOpeningParenthesis: wrapTokenizerMethod(tokenizer.insertOpeningParenthesis.bind(tokenizer)),
	insertClosingParenthesis: wrapTokenizerMethod(tokenizer.insertClosingParenthesis.bind(tokenizer)),
	resetTokens: wrapTokenizerMethod(tokenizer.resetTokens.bind(tokenizer)),
	removeCharacter: wrapTokenizerMethod(tokenizer.removeCharacter.bind(tokenizer))
};
