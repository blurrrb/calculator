<script>
	import tokenStore from "$lib/stores/TokenStore";
</script>

{#each $tokenStore as token, idx (idx)}
	<span>{token.str}</span>
{/each}
