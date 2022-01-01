<script>
	import '../tailwind.css';
	import '../global.css';
	import { getResourcePath } from '$lib/utils';
</script>

<svelte:head>
	<title>Calculator</title>
	<link rel="icon" href={getResourcePath('/favicon.png')} />
</svelte:head>

<slot />
