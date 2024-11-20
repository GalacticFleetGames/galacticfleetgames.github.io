<script lang="ts">
	import '../app.css';
	import '@fontsource/aldrich';
	import '@fontsource/anonymous-pro';

	import Header from '$lib/components/header.svelte';
	import Footer from '$lib/components/footer.svelte';
	import { fly } from 'svelte/transition';

	//data that comes from +layout.server.ts
	export let data;
</script>

<svelte:head>
	<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
	<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
	<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
	<link rel="manifest" href="/site.webmanifest" />
</svelte:head>

<div class="text-white">
	<Header />
	{#key data.url}
		<main in:fly={{ duration: 400 }} out:fly={{ duration: 100 }}>
			<slot />
		</main>
	{/key}
	<Footer />
</div>
