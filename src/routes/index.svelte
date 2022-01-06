<script>
	import tokenStore from '$lib/stores/TokenStore';
	import evalStore from '$lib/stores/Eval';
	import ExpressionPanel from '$lib/components/ExpressionPanel.svelte';
	import { tick, onMount } from 'svelte';

	let expressionDisplay;
	let val;
	$: val = $evalStore;

	onMount(() => {
		tokenStore.subscribe(async () => {
			await tick();
			expressionDisplay.scrollTop = expressionDisplay.scrollHeight - expressionDisplay.clientHeight;
		});
	});

	const equalToHandler = () => {
		// TODO: refactor tokenStore API
		tokenStore.resetTokens()();
		tokenStore.insertDigit(String(val))();
	};
</script>

<div class="w-screen h-screen bg-black normal-case select-none">
	<div class="h-2/5">
		<div
			bind:this={expressionDisplay}
			class="h-3/5 px-8 pt-10 w-full break-all text-4xl text-white overflow-auto select-auto"
		>
			<ExpressionPanel />
		</div>
		<div class="h-1/5 px-8 flex items-center justify-center">
			<span class="text-2xl font-extrabold text-green-800">=</span>
			<span class="grow" />
			<span class="text-2xl text-gray-500 float-right">{val}</span>
		</div>
		<div class="h-1/5 px-2">
			<button
				on:touchend|preventDefault={tokenStore.removeCharacter()}
				class="h-full p-auto float-right px-8"
			>
				<!-- svelte-ignore a11y-missing-attribute -->
				<img class="w-8" src="/icons/backspace.svg" />
			</button>
		</div>
	</div>
	<div class="p-2 pt-0 h-3/5 grid grid-cols-4 gap-2">
		<button
			on:touchend|preventDefault={tokenStore.resetTokens()}
			class="text-2xl h-auto btn btn-active btn-active btn-error">C</button
		>
		<button
			on:touchend|preventDefault={tokenStore.insertOpeningParenthesis()}
			class="text-2xl h-auto btn btn-active btn-warning">(</button
		>
		<button
			on:touchend|preventDefault={tokenStore.insertClosingParenthesis()}
			class="text-2xl h-auto btn btn-active btn-warning">)</button
		>
		<button
			on:touchend|preventDefault={tokenStore.insertDivisionToken()}
			class="text-2xl h-auto btn btn-active btn-warning">/</button
		>
		<button
			on:touchend|preventDefault={tokenStore.insertDigit('7')}
			class="text-2xl h-auto btn btn-active">7</button
		>
		<button
			on:touchend|preventDefault={tokenStore.insertDigit('8')}
			class="text-2xl h-auto btn btn-active">8</button
		>
		<button
			on:touchend|preventDefault={tokenStore.insertDigit('9')}
			class="text-2xl h-auto btn btn-active">9</button
		>
		<button
			on:touchend|preventDefault={tokenStore.insertMultiplicationToken()}
			class="text-2xl h-auto btn btn-active btn-warning normal-case">x</button
		>
		<button
			on:touchend|preventDefault={tokenStore.insertDigit('4')}
			class="text-2xl h-auto btn btn-active">4</button
		>
		<button
			on:touchend|preventDefault={tokenStore.insertDigit('5')}
			class="text-2xl h-auto btn btn-active">5</button
		>
		<button
			on:touchend|preventDefault={tokenStore.insertDigit('6')}
			class="text-2xl h-auto btn btn-active">6</button
		>
		<button
			on:touchend|preventDefault={tokenStore.insertSubtractionToken()}
			class="text-2xl h-auto btn btn-active btn-warning">-</button
		>
		<button
			on:touchend|preventDefault={tokenStore.insertDigit('1')}
			class="text-2xl h-auto btn btn-active">1</button
		>
		<button
			on:touchend|preventDefault={tokenStore.insertDigit('2')}
			class="text-2xl h-auto btn btn-active">2</button
		>
		<button
			on:touchend|preventDefault={tokenStore.insertDigit('3')}
			class="text-2xl h-auto btn btn-active">3</button
		>
		<button
			on:touchend|preventDefault={tokenStore.insertAdditionToken()}
			class="text-2xl h-auto btn btn-active btn-warning">+</button
		>
		<button
			on:touchend|preventDefault={tokenStore.toggleOrInsertNegationToken()}
			class="text-2xl h-auto btn btn-active">+/-</button
		>
		<button
			on:touchend|preventDefault={tokenStore.insertDigit('0')}
			class="text-2xl h-auto btn btn-active">0</button
		>
		<button
			on:touchend|preventDefault={tokenStore.insertDigit('.')}
			class="text-2xl h-auto btn btn-active">.</button
		>
		<button
			on:touchend|preventDefault={() => equalToHandler()}
			class="text-2xl h-auto btn btn-active btn-success">=</button
		>
	</div>
</div>
