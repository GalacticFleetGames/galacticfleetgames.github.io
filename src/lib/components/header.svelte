<script lang="ts">
	import { fade, slide } from 'svelte/transition';

	const paths: Array<{ title: string; href: string }> = [
		{
			title: 'About us',
			href: '/'
		},
		{
			title: 'Our Team',
			href: '/team'
		},
		{
			title: 'Portfolio',
			href: '/portfolio'
		},
		{
			title: 'Career',
			href: '/career'
		},
		{
			title: 'Contact',
			href: '/contact'
		}
	];

	let showMobileMenu = false;

	function toggle() {
		showMobileMenu = !showMobileMenu;
		window.document.body.classList.toggle('overflow-hidden');
	}

	function handlePress(e: KeyboardEvent) {
		if (e.key === 'Enter') toggle();
	}
</script>

<header
	class="h-headerHeight px-wrapper absolute left-0 top-0 z-20 flex w-full items-center justify-start bg-transparent"
>
	<nav class="hidden w-full items-center justify-start gap-x-8 xl:flex">
		{#each paths as p}
			<a href={p.href} class="font-aldrich text-3xl uppercase text-yellow"
				>{p.title}</a
			>
		{/each}
	</nav>
	<button
		class="transition-transform duration-300 ease-in-out hover:-translate-y-1 xl:hidden"
		on:click={() => toggle()}
	>
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="29"
			height="21"
			viewBox="0 0 29 21"
			fill="none"
			class="text-yellow"
		>
			<path
				d="M2 2H26.1312"
				stroke="currentColor"
				stroke-width="4"
				stroke-linecap="round"
			/>
			<path
				d="M2 10.5H26.1312"
				stroke="currentColor"
				stroke-width="4"
				stroke-linecap="round"
			/>
			<path
				d="M2 19H26.1312"
				stroke="currentColor"
				stroke-width="4"
				stroke-linecap="round"
			/>
		</svg>
	</button>
</header>

{#if showMobileMenu}
	<div
		role="button"
		tabindex="0"
		in:fade={{ duration: 300 }}
		out:fade={{ duration: 300 }}
		on:click={() => toggle()}
		on:keypress={handlePress}
		id="modal-overlay"
		class="absolute z-40 h-full w-full bg-black/50 transition-transform duration-500 will-change-transform"
	/>
	<div>
		<nav
			in:slide={{ duration: 500 }}
			out:slide={{ duration: 500 }}
			class="absolute z-50 w-full overflow-hidden bg-lightBlue transition-transform will-change-transform xl:hidden"
		>
			<ul class="grid h-full grid-flow-row">
				{#each paths as p}
					<li
						class="inline-flex w-full items-center border-b border-b-[rgba(255,_255,_255,_0.30)] last:border-none"
					>
						<a
							on:click={() => toggle()}
							on:keypress={handlePress}
							class="w-full py-3 text-center font-aldrich text-xl uppercase text-yellow"
							href={p.href}>{p.title}</a
						>
					</li>
				{/each}
			</ul>
		</nav>
	</div>
{/if}
