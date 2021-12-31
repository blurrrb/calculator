import { writable } from 'svelte/store';

export default function createTokenizer() {
    const defaultValue = [];
    const tokenStore = writable(defaultValue);

    const resetTokens = () => tokenStore.set(defaultValue);

    const insertNumber = num => tokenStore.update(tokens => {
        if(tokens.length == 0) {
            return [{
                type: 'number',
                str: num,
                val: parseFloat(num)
            }]
        } else if(tokens[tokens.length - 1].type == 'number') {
            const oldToken = tokens[tokens.length - 1];
            const newNum = oldToken.str + num;
            tokens[tokens.length - 1] = {
                type: 'number',
                str: newNum,
                val: parseFloat(newNum)
            }
            return tokens;
        } else {
            return [...tokens, {
                type: 'number',
                str: num,
                val: parseFloat(num)
            }];
        }
    });

    const insertOperator = op => tokenStore.update(tokens => [...tokens, {
        type: 'operator',
        str: op
    }]);

    const removeChar = () => tokenStore.update(tokens => {
        if(tokens.length == 0) return [];

        if(tokens[tokens.length - 1].type == 'operator') {
            tokens.pop();
            return tokens;
        }

        if(tokens[tokens.length - 1].type == 'number') {
            let oldToken = tokens[tokens.length - 1];

            if(oldToken.str.length == 1) {
                tokens.pop();
                return tokens;
            } else {
                const newNum = oldToken.str.slice(0, oldToken.str.length - 1);
                tokens[tokens.length - 1].str = newNum;
                tokens[tokens.length - 1].val = parseFloat(newNum);
                return tokens;
            }
        }
    });

    return {
        tokenStore,
        resetTokens,
        insertNumber,
        insertOperator,
        removeChar
    }
}