<script lang="ts">
	import type { JobDescription } from '$lib/types';
	import RoleCard from './role-card.svelte';

	export let data;

	const textStyle =
		'w-full font-anonymous  text-center no-leading max-w-xs sm:max-w-sm sm:text-md md:text-md  md:text-left md:max-w-screen-sm xl:max-w-screen-md w-1/2';
</script>

<svelte:head>
	<title>Career | Galactic Fleet</title>
</svelte:head>

<section class="bg-babyBlue">
	<div
		class="px-wrapper flex h-screen w-full flex-col items-center justify-start gap-y-8 bg-[url('/svgs/layout/career-bg-mobile.svg')] bg-cover bg-no-repeat pt-headerHeightXl text-[#0365aa] font-semibold md:items-start md:bg-[url('/svgs/layout/career-bg.svg')] md:bg-auto md:bg-right-top md:pt-headerHeightDouble "
	>
		<h1 class="font-aldrich text-3xl text-darkNavy md:text-5xl xl:text-6xl w-1/2">
			We&apos;re Hiring
		</h1>
		<p class={textStyle}>
			In an industry based on fun, your job should be fun! For us, fun is: solving hard problems, coloring outside the lines, building the impossible, and working collaboratively. Fun is seeing someone play your game on a bus or plane. It’s seeing a co-worker’s idea succeed, then they turn around and help you realize your idea. We value every idea, contribution, perspective; and will work tirelessly to put those ideas into something tangible in the hands of our players.</p>
		<p class={textStyle}>
			We’re looking for colleagues that share our passion and values.
		</p>
		<p class={textStyle}>
			Don’t find an open position that suits you right now? Reach out to us at <a href="mailto:info@galactic-fleet.com" class="underline">info@galactic-fleet.com</a>  and tell us about yourself, maybe we can find the common ground!
		</p>
		<a
			href="#roles"
			class="transitions-colors inline-flex items-center gap-4 rounded-full bg-darkNavy px-8 py-2 font-aldrich text-2xl text-white drop-shadow-md duration-200 hover:bg-darkNavy/90"
			>Open roles <svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				stroke-width="1.5"
				stroke="currentColor"
				class="h-6 w-6"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3"
				/>
			</svg>
		</a>
	</div>
	<div
		id="roles"
		class="px-wrapper mx-auto w-full max-w-sm py-12 md:max-w-screen-lg md:py-16 xl:max-w-[92rem] xl:py-20"
	>
		<h2
			class="mb-12 hidden font-aldrich text-3xl text-darkNavy md:mb-16 md:block md:text-5xl xl:mb-20 xl:text-7xl"
		>
			Open roles
		</h2>
		<ul
			class="flex w-full flex-col items-center justify-start gap-y-12 md:gap-y-16 xl:gap-y-20"
		>
		{#if data.jobs.length === 0}
		<p class="text-[#0365aa] text-2xl font-semibold">We currently don’t have any open positions.</p>
		{:else}
			{#each data.jobs as jd}
				<RoleCard {jd} />
			{/each}
		{/if}
		</ul>
	</div>
</section>
