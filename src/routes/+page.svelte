<script lang="ts">
	import Logo from '$lib/components/logo.svelte';

	let showText = false;
</script>

<svelte:head>
	<title>Galactic Fleet</title>
</svelte:head>

<!-- <div
	class=" bg-[url('')] bg-black bg-contain bg-no-repeat md:bg-[url('/svgs/layout/home.svg')] md:bg-auto 4xl:bg-contain"
> -->
<div
	class="xbg-contain h-screen bg-black bg-[url('/svgs/layout/home-bg-mobile.svg')] bg-contain bg-right-top bg-no-repeat md:bg-[url('/svgs/layout/home-bg.svg')] xl:bg-cover"
>
	<section
		class="p-wrapper pt-headerHeight relative flex w-full flex-col items-start justify-between gap-36 overflow-x-hidden pb-4 text-white xl:h-full xl:gap-0"
	>
		<div class="inline-block w-fit text-justify after:content-['']">
			<Logo />
			<p
				class="-mt-1 font-anonymous text-sm font-semibold capitalize drop-shadow-md md:-mt-3 md:text-2xl xl:-mt-4 xl:text-4xl"
			>
				Mobile Game Development
			</p>
		</div>

		<div class="z-10 flex w-full flex-col items-start justify-between gap-10">
			<h1
				class="font-anonymous text-3xl font-semibold capitalize md:text-3xl xl:text-6xl"
			>
				Partnering<br />
				With Intent
			</h1>

			<button
				on:click={() => (showText = !showText)}
				class="inline-block rounded-full bg-pistachio px-6 pb-1 pt-2 font-aldrich font-medium uppercase text-white transition duration-150 ease-in-out hover:bg-pistachio/90 focus:bg-pistachio/90 active:bg-pistachio/80 md:text-xl xl:text-3xl"
			>
				Learn more
			</button>

			<p
				class="{showText
					? 'translate-y-0 opacity-100'
					: '-translate-y-4 opacity-0'} inline-flex w-full max-w-sm flex-col font-anonymous text-sm leading-none drop-shadow-md transition duration-300 md:max-w-lg md:text-xl"
			>
				<span class="">
					Our Quality Execution Focusing On Your KPIs <br />
					Our Experience Focused To Deliver On Your KPIs <br />
					Your KPIs, Our Experience: Quality Execution
				</span>
				<span class="mt-4 xl:mt-6">
					We can make your revenue enabling project a reality when your
					resources are tight
				</span>
			</p>
		</div>
	</section>
</div>

<style>
	section {
		height: 100svh;
	}
</style>
