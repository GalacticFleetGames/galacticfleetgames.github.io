<script lang="ts">
	import Logo from '$lib/components/logo.svelte';
</script>

<section
	class="p-wrapper pt-headerHeight relative flex w-full flex-col items-start justify-between gap-36 overflow-x-hidden pb-2 xl:h-screen xl:gap-0"
>
	<div class="inline-block w-fit text-justify after:content-['']">
		<Logo />
		<p
			class="-mt-1 ml-1 font-anonymous text-sm font-semibold capitalize drop-shadow-md md:-mt-3 md:ml-2 md:text-2xl lg:ml-3 xl:-mt-4 xl:ml-4 xl:text-4xl"
		>
			Mobile Game Development
		</p>
	</div>

	<div class="z-10 flex w-full flex-col items-start justify-between gap-10">
		<h1
			class="font-anonymous text-2xl font-semibold capitalize md:text-3xl xl:text-6xl"
		>
			Partnering<br />
			With Intent
		</h1>

		<p
			class="self-center md:self-auto inline-flex w-full max-w-sm flex-col text-center font-anonymous text-sm leading-none drop-shadow-md md:max-w-lg md:text-left md:text-xl"
		>
			<span class="">
				Our Quality Execution Focusing On Your KPIs <br />
				Our Experience Focused To Deliver On Your KPIs <br />
				Your KPIs, Our Experience: Quality Execution
			</span>
			<span class="mt-4 xl:mt-6">
				We can make your revenue enabling project a reality when your resources
				are tight
			</span>
		</p>
	</div>
</section>
