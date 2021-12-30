import { writable, derived } from 'svelte/store';

export default function calculator() {
    const expression = writable('');
    const value  = derived(expression, (expr) => eval(expr))

    const inputCharacter = (character) => {
        expression.update(expr => expr + character);
    }
    return {
        expression,
        value,
        inputCharacter
    }
}