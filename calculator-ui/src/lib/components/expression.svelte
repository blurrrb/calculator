<script>
	export let tokenStore;
</script>

{#each $tokenStore as token, idx (idx)}
	<span>{token.str}</span>
{/each}
