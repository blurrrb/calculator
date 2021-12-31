<script>
	import '../tailwind.css';
	import { getAssetPath } from '$lib/utils';
</script>

<svelte:head>
	<title>Calculator</title>
	<link rel="icon" href={getAssetPath('/favicon.png')} />
</svelte:head>

<slot />
