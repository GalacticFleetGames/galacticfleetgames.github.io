<script lang="ts">
  import type {JobDescription} from "$lib/types"
  export let jd: JobDescription
</script>

<li class="w-full">
	<div
		class="mx-auto flex flex-col items-start justify-between gap-8 rounded-4xl border-4 border-black bg-darkNavy p-4 md:flex-row md:items-center md:gap-x-16 xl:border-8 xl:p-12"
	>
		<div class="space-y-2 md:space-y-4 xl:space-y-6">
			<h3 class="font-aldrich text-lg md:text-3xl xl:text-5xl">{jd.title}</h3>
			<p
				class="w-full max-w-screen-lg font-anonymous text-sm leading-tight md:text-base md:leading-tight xl:text-3xl"
			>
				{jd.description}
			</p>
		</div>
		<a
			href="/career/{jd.slug}"
			class="rounded-full border-2 border-white px-6 py-1.5 font-aldrich text-lg transition-all duration-200 hover:-translate-y-2 hover:opacity-80 md:border-4 md:px-8 md:py-3 md:text-3xl xl:px-12 xl:py-8 xl:text-5xl"
		>
			Learn&nbsp;more
		</a>
	</div>
</li>
