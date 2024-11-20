<script lang="ts" context="module">
	export type Problem = {
		title: string;
		body: string;
		imgUrl: string;
	};
</script>

<script lang="ts">
	import { base } from '$app/paths';

	export let problem: Problem;
	export let index: number;
</script>

<article
	class="flex flex-col items-center md:items-start gap-x-4 {index % 2 === 0
		? 'md:flex-row'
		: 'md:flex-row-reverse'}"
>
	<figure class="shrink-0 w-40 md:w-auto">
		<img src={base + problem.imgUrl} alt={problem.title} />
	</figure>

	<div class="flex flex-col items-center md:items-start md:mt-8 {index % 2 === 0 ? 'md:items-start' : 'md:items-end'}">
		<h3
			class="mb-4 font-aldrich text-xl md:text-3xl xl:text-5xl"
		>
			{problem.title}
		</h3>
		<p
			class="w-4/5 md:w-auto font-anonymous text-center text-base md:text-2xl xl:text-3xl
      {index % 2 === 0 ? 'md:text-left' : 'md:text-right'}"
		>
			{problem.body}
		</p>
	</div>
</article>
