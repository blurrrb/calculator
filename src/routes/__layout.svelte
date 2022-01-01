<script>
	import '../tailwind.css';
	import '../global.css';
	import { getResourcePath } from '$lib/utils';
</script>

<svelte:head>
	<title>Calculator</title>
	<link rel="icon" href={getResourcePath('/favicon.png')} />
	<link rel="manifest" href={getResourcePath('/manifest.json')} />
</svelte:head>

<slot />
