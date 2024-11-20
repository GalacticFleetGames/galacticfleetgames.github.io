<script lang="ts">
	export let title: string;
	export let items: string[];
</script>

<div>
	<h3
		class="mb-6 font-aldrich text-2xl text-evenDarkerNavy md:text-4xl xl:text-6xl"
	>
		{title}
	</h3>
	<ul class="list-inside list-disc">
		{#each items as i}
			<li class="no-leading font-anonymous text-base md:text-xl xl:text-3xl">
				{i}
			</li>
		{/each}
	</ul>
</div>
