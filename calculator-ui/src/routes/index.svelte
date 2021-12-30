<script>
	import calculator from '$lib/tokens';

	const { expression, value, inputCharacter } = calculator();
</script>

<div class="w-screen h-screen bg-black normal-case">
	<div class="h-2/5">
		<div class="h-3/5 p-8 w-full flex items-center text-right text-4xl text-white">
			{$expression}
		</div>
		<div class="h-1/5 px-8 flex items-center justify-center">
			<span class="text-2xl font-extrabold text-green-800">=</span>
			<span class="grow" />
			<span class="text-2xl text-gray-500 float-right">{$value}</span>
		</div>
		<div class="h-1/5 px-8">
			<button class="h-full p-auto">
				<img class="w-8" src="/icons/history.svg" alt="" srcset="" />
			</button>
			<button class="h-full p-auto float-right">
				<img class="w-8" src="/icons/backspace.svg" alt="" srcset="" />
			</button>
		</div>
	</div>
	<div class="p-2 pt-0 h-3/5 grid grid-cols-4 gap-2">
		<button class="text-2xl h-auto btn btn-error">C</button>
		<button on:click={() => inputCharacter('(')} class="text-2xl h-auto btn btn-warning">(</button>
		<button on:click={() => inputCharacter(')')} class="text-2xl h-auto btn btn-warning">)</button>
		<button on:click={() => inputCharacter('/')} class="text-2xl h-auto btn btn-warning">/</button>
		<button on:click={() => inputCharacter('7')} class="text-2xl h-auto btn">7</button>
		<button on:click={() => inputCharacter('8')} class="text-2xl h-auto btn">8</button>
		<button on:click={() => inputCharacter('9')} class="text-2xl h-auto btn">9</button>
		<button on:click={() => inputCharacter('*')} class="text-2xl h-auto btn btn-warning normal-case"
			>x</button
		>
		<button on:click={() => inputCharacter('4')} class="text-2xl h-auto btn">4</button>
		<button on:click={() => inputCharacter('5')} class="text-2xl h-auto btn">5</button>
		<button on:click={() => inputCharacter('6')} class="text-2xl h-auto btn">6</button>
		<button on:click={() => inputCharacter('-')} class="text-2xl h-auto btn btn-warning">-</button>
		<button on:click={() => inputCharacter('1')} class="text-2xl h-auto btn">1</button>
		<button on:click={() => inputCharacter('2')} class="text-2xl h-auto btn">2</button>
		<button on:click={() => inputCharacter('3')} class="text-2xl h-auto btn">3</button>
		<button on:click={() => inputCharacter('+')} class="text-2xl h-auto btn btn-warning">+</button>
		<button on:click={() => inputCharacter('-')} class="text-2xl h-auto btn">+/-</button>
		<button on:click={() => inputCharacter('0')} class="text-2xl h-auto btn">0</button>
		<button on:click={() => inputCharacter('.')} class="text-2xl h-auto btn">.</button>
		<button class="text-2xl h-auto btn btn-success">=</button>
	</div>
</div>
