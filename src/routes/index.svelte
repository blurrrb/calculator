<script>
	import tokenStore from '$lib/stores/TokenStore';
	import evalStore from '$lib/stores/Eval';
	import ExpressionPanel from '$lib/components/ExpressionPanel.svelte';
	import { tick, onMount } from 'svelte';
	import { getAssetPath } from '$lib/utils';

	let expressionDisplay;

	onMount(() => {
		tokenStore.subscribe(async () => {
			await tick();
			expressionDisplay.scrollTop = expressionDisplay.scrollHeight - expressionDisplay.clientHeight;
		});
	});
</script>

<div class="w-screen h-screen bg-black normal-case">
	<div class="h-2/5">
		<div
			bind:this={expressionDisplay}
			class="h-3/5 px-8 pt-10 w-full break-all text-4xl text-white overflow-auto"
		>
			<ExpressionPanel />
		</div>
		<div class="h-1/5 px-8 flex items-center justify-center">
			<span class="text-2xl font-extrabold text-green-800">=</span>
			<span class="grow" />
			<span class="text-2xl text-gray-500 float-right">{$evalStore}</span>
		</div>
		<div class="h-1/5 px-8">
			<button class="h-full p-auto">
				<!-- svelte-ignore a11y-missing-attribute -->
				<img class="w-8" src={getAssetPath('/icons/history.svg')} />
			</button>
			<button on:click={tokenStore.removeCharacter()} class="h-full p-auto float-right">
				<!-- svelte-ignore a11y-missing-attribute -->
				<img class="w-8" src={getAssetPath('/icons/backspace.svg')} />
			</button>
		</div>
	</div>
	<div class="p-2 pt-0 h-3/5 grid grid-cols-4 gap-2">
		<button on:click={tokenStore.resetTokens()} class="text-2xl h-auto btn btn-error">C</button>
		<button on:click={tokenStore.insertOpeningParenthesis()} class="text-2xl h-auto btn btn-warning"
			>(</button
		>
		<button on:click={tokenStore.insertClosingParenthesis()} class="text-2xl h-auto btn btn-warning"
			>)</button
		>
		<button on:click={tokenStore.insertDivisionToken()} class="text-2xl h-auto btn btn-warning"
			>/</button
		>
		<button on:click={tokenStore.insertDigit('7')} class="text-2xl h-auto btn">7</button>
		<button on:click={tokenStore.insertDigit('8')} class="text-2xl h-auto btn">8</button>
		<button on:click={tokenStore.insertDigit('9')} class="text-2xl h-auto btn">9</button>
		<button
			on:click={tokenStore.insertMultiplicationToken()}
			class="text-2xl h-auto btn btn-warning normal-case">x</button
		>
		<button on:click={tokenStore.insertDigit('4')} class="text-2xl h-auto btn">4</button>
		<button on:click={tokenStore.insertDigit('5')} class="text-2xl h-auto btn">5</button>
		<button on:click={tokenStore.insertDigit('6')} class="text-2xl h-auto btn">6</button>
		<button on:click={tokenStore.insertSubtractionToken()} class="text-2xl h-auto btn btn-warning"
			>-</button
		>
		<button on:click={tokenStore.insertDigit('1')} class="text-2xl h-auto btn">1</button>
		<button on:click={tokenStore.insertDigit('2')} class="text-2xl h-auto btn">2</button>
		<button on:click={tokenStore.insertDigit('3')} class="text-2xl h-auto btn">3</button>
		<button on:click={tokenStore.insertAdditionToken()} class="text-2xl h-auto btn btn-warning"
			>+</button
		>
		<button on:click={tokenStore.toggleOrInsertNegationToken()} class="text-2xl h-auto btn"
			>+/-</button
		>
		<button on:click={tokenStore.insertDigit('0')} class="text-2xl h-auto btn">0</button>
		<button on:click={tokenStore.insertDigit('.')} class="text-2xl h-auto btn">.</button>
		<button class="text-2xl h-auto btn btn-success">=</button>
	</div>
</div>
