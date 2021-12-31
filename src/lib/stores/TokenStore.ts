import Tokenizer from '$lib/tokenizer';
import { writable } from 'svelte/store';
import type Error from '$lib/error';

const tokenizer = new Tokenizer();
const tokenStore = writable(tokenizer.getTokens());

const wrapTokenizerMethod = (tokenizerMethod: () => Error) => {
	return () => {
		const err = tokenizerMethod();
		if (err) {
			console.log('Error occurred while processing: ', err.errorMessage);
			return;
		}
		console.log(tokenizer.getTokens());
		tokenStore.set(tokenizer.getTokens());
	};
};

const insertAdditionToken = wrapTokenizerMethod(tokenizer.insertAdditionToken.bind(tokenizer));
const insertSubtractionToken = wrapTokenizerMethod(tokenizer.insertSubtractionToken.bind(tokenizer));
const insertMultiplicationToken = wrapTokenizerMethod(tokenizer.insertMultiplicationToken.bind(tokenizer));
const insertDivisionToken = wrapTokenizerMethod(tokenizer.insertDivisionToken.bind(tokenizer));
const toggleOrInsertNegationToken = wrapTokenizerMethod(tokenizer.toggleOrInsertNegationToken.bind(tokenizer));
const insertOpeningParenthesis = wrapTokenizerMethod(tokenizer.insertOpeningParenthesis.bind(tokenizer));
const insertClosingParenthesis = wrapTokenizerMethod(tokenizer.insertClosingParenthesis.bind(tokenizer));

const resetTokens = () => {
	return () => {
		tokenizer.resetTokens();
		tokenStore.set(tokenizer.getTokens());
	};
};

const insertDigit = (digit: string) => {
	return () => {
		console.log('insert digit called');
		const err = tokenizer.insertDigit(digit);
		if (err) {
			console.log('Error occurred while processing: ', err.errorMessage);
			return;
		}
		console.log(tokenizer.getTokens());
		tokenStore.set(tokenizer.getTokens());
	};
};

export default {
	subscribe: tokenStore.subscribe,
	insertAdditionToken,
	insertSubtractionToken,
	insertMultiplicationToken,
	insertDivisionToken,
	toggleOrInsertNegationToken,
	insertDigit,
	insertOpeningParenthesis,
	insertClosingParenthesis,
	resetTokens
};
