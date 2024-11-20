<script lang="ts">
	import { base } from '$app/paths';
	import type { Problem } from './problem-card.svelte';
	import Marquee from 'svelte-fast-marquee';
	import ProblemCard from './problem-card.svelte';

	const data: Array<Problem> = [
		{
			title: 'Product Development',
			body: 'You have a project, idea, initiative that has a significant impact on your business but don’t have the resources available to execute it.  You want someone to manage and deliver the project with a competent team, work with you as a partner, taking risks, offering proposals for solutions, shaping a shared understanding and the opportunity definition with you.',
			imgUrl: '/svgs/problems/problem-1.svg'
		},
		{
			title: 'Remote development',
			body: 'You have high turnover and rising development costs, with investors, sponsors asking you what your plan is to create a sustainable development team that can deliver on the plan they all believe you should make happen soon.  You need a ready-made high performing team that can jump in and deliver results.',
			imgUrl: '/svgs/problems/problem-2.svg'
		},
		{
			title: 'Talent Planning',
			body: 'You are struggling to find talented engineers, you know they exist but they seem to be hard to find and have high expectations from compensation to work style. Even if you meet their demand they seem to be discontent.',
			imgUrl: '/svgs/problems/problem-3.svg'
		},
		{
			title: 'Development consulting',
			body: "Your systems are stuck in the 90's. You have a Flux Capacitor and need 1.21 gWe to get back to the future. It was state of the art when it started, and you have grown your business tremendously, now it’s showing its age. It’s hard to find talent that can deliver sustainable relevant features for your business on your existing platform.",
			imgUrl: '/svgs/problems/problem-4.svg'
		},
		{
			title: 'SRE',
			body: 'You are finding that your system stability is impacting your business. Your developers are spending more time keeping things running and the lights on than they are on key development features.',
			imgUrl: '/svgs/problems/problem-5.svg'
		},
		{
			title: 'Data Engineering',
			body: 'You have a data lake, a data pipeline, a tsunami of bits. Your costs are rising but no actionable information. You are eager and ready to be data driven but are stuck in 1st gear.',
			imgUrl: '/svgs/problems/problem-6.svg'
		},
		{
			title: 'Crypto',
			body: 'You want to create a web3 offering and you need someone who has launched NFTs and has some best practices in the complex and rapid changing world of Web3.',
			imgUrl: '/svgs/problems/problem-7.svg'
		}
	];
</script>

<svelte:head>
	<title>Portfolio | Galactic Fleet</title>
	<meta name="description" content="Portfolio description" />
</svelte:head>

<section
	class="flex h-[60vh] w-full flex-col items-center justify-end bg-cover bg-center md:h-screen"
	style="background-image: url('{base}/svgs/layout/portfolio-bg.svg');"
>
	<div class="pb-12">
		<h1
			class="inline-flex flex-col items-center justify-end gap-2 font-aldrich md:gap-4 xl:gap-10"
		>
			<span class="text-4xl md:text-5xl xl:text-7xl">Talk to us...</span>
			<span class="text-center text-base md:text-2xl xl:text-5xl"
				>Talk to us when one of these problems sounds familiar</span
			>
		</h1>
	</div>
</section>

<section class="px-wrapper bg-white text-black">
	<ul class="mx-auto w-full max-w-screen-2xl space-y-28 py-28">
		{#each data as d, i}
			<li>
				<ProblemCard problem={d} index={i} />
			</li>
		{/each}
	</ul>
</section>

<section class="flex items-center justify-center bg-white">
	<Marquee play={true} direction={'left'} speed={40}>
		<ul class="flex items-center justify-center gap-4 space-y-4 py-8">
			{#each { length: 5 } as _, i (i)}
				<li>
					<img
						class=" mr-4 h-16 md:mr-8 md:h-28 xl:mr-16"
						src="{base}/svgs/companies/comp-{i + 1}.svg"
						alt="title"
					/>
				</li>
			{/each}
		</ul>
	</Marquee>
</section>
