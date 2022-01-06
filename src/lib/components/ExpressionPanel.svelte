<script lang="ts">
	import tokenStore from '$lib/stores/TokenStore';
	import TokenTypes from '$lib/tokenizer/TokenTypes';

	let formatedNumberCache = {};

	const getFormattedNumber = (num: string): string => {
		if (num in formatedNumberCache) return formatedNumberCache[num];
		console.log('formatting ', num);
		const dotLocation = num.indexOf('.');
		let integerPart: string, decimalPart: string;
		if (dotLocation == -1) {
			integerPart = num;
			console.log('dot not found', integerPart);
		} else {
			integerPart = num.slice(0, dotLocation);
			decimalPart = num.slice(dotLocation + 1, num.length);
			console.log('dot found', integerPart, decimalPart);
		}

		let formattedIntegerPart = '';
		if (integerPart.length <= 3) formattedIntegerPart = integerPart;
		else {
			let idx = integerPart.length - 3;
			formattedIntegerPart = integerPart.slice(idx, integerPart.length);

			for (idx = idx - 2; idx >= 0; idx -= 2) {
				formattedIntegerPart = integerPart.slice(idx, idx + 2) + ',' + formattedIntegerPart;
			}

			if (idx == -1) formattedIntegerPart = integerPart[0] + ',' + formattedIntegerPart;
		}
		if (dotLocation != -1) formatedNumberCache[num] = formattedIntegerPart + '.' + decimalPart;
		else formatedNumberCache[num] = formattedIntegerPart;
		console.log(num, 'formatted ', formatedNumberCache[num]);
		return formatedNumberCache[num];
	};
</script>

{#each $tokenStore as token, idx (idx + token.str)}
	{#if token.type === TokenTypes.Number}
		<span> {getFormattedNumber(token.str)} </span>
	{:else}
		<span> {token.str} </span>
	{/if}
{/each}
