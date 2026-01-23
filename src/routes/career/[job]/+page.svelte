<script lang="ts">
	import List from './List.svelte';

	export let data;
</script>

<section
	class="bg-babyBlue bg-top-right min-h-screen w-full bg-[url('/svgs/layout/blog-bg.svg')] bg-contain bg-no-repeat text-[#0365aa] md:bg-[url('/svgs/layout/job-bg.svg')]"
>
	{#if data.job}
		<div
			class="px-wrapper flex flex-col items-start justify-start gap-6 gap-y-12 py-[10rem]"
		>
			<div class="flex items-center justify-between gap-4 md:gap-12 xl:gap-20">
				<h1
					class="font-aldrich text-4xl text-evenDarkerNavy md:text-5xl xl:text-7xl"
				>
					{data.job.title}
				</h1>
				<!-- <a
					href="https://forms.gle/7C2D1XYY6kD3BrvYA" target="_blank"
					class="rounded-full border-2 border-evenDarkerNavy px-8 py-1 pb-1.5 text-xl text-evenDarkerNavy md:text-2xl xl:border-4 xl:px-16 xl:pb-5 xl:pt-3 xl:text-4xl"
				>
					Apply
				</a> -->
			</div>
		
			<p
				class="no-leading max-w-3xl font-anonymous text-base md:text-xl xl:text-3xl"
			>
				{data.job.description} 
			</p>
			<div class="flex flex-wrap items-center gap-3 md:gap-4 xl:gap-6">
				<a
					href="https://www.linkedin.com/company/galactic-fleet/about/"
					target="_blank"
					rel="noopener noreferrer"
					class="inline-flex items-center rounded-full border-2 border-evenDarkerNavy px-5 py-1.5 font-aldrich text-sm text-evenDarkerNavy transition-all duration-200 hover:-translate-y-2 hover:opacity-80 md:border-4 md:px-6 md:py-2 md:text-xl xl:px-10 xl:py-6 xl:text-4xl"
				>
					Contact&nbsp;us&nbsp;on&nbsp;LinkedIn
				</a>
			</div>

			<List title="Responsibilities" items={data.job.whatYouDo} />
			<List title="What are we looking for" items={data.job.whatWeLookFor} />
			
			{#if data.job.whatWeOffer}
				<List title="What we offer" items={data.job.whatWeOffer} />
			{/if}

			{#if data.job.howToApply}
			<h3
			class="font-aldrich text-2xl text-evenDarkerNavy md:text-4xl xl:text-6xl"
		>
				How to apply
			</h3>
			<p class="no-leading max-w-3xl font-anonymous text-base md:text-xl xl:text-3xl">
				{data.job.howToApply.text} <a
				class="text-darkNavy hover:opacity-90"
				href={`mailto:${data.job.howToApply.contact}`}>{data.job.howToApply.contact}</a>
			</p>
			{/if}

		</div>
	{/if}
</section>
