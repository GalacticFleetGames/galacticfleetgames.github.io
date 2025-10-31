<script lang="ts">
	import type { Member } from '$lib/components/member-card.svelte';
	import MemberCard from '$lib/components/member-card.svelte';
</script>

<svelte:head>
	<title>Team | Galactic Fleet</title>
</svelte:head>

<section
	class="px-wrapper lg:h-screen w-full bg-black  bg-no-repeat pt-headerHeightMd text-white bg-none xl:bg-[url('/svgs/layout/application-bg-logo.svg')] bg-cover"
>
	<div
		class=" mx-auto flex flex-grow h-full w-full max-w-screen-2xl flex-col items-center justify-start gap-4 md:gap-20 xl:gap-40 pb-12"
	>
		<div class="xl:ml-[50%] flex flex-col xl:w-1/2 pt-12 b-32">
			<div class="mx-12">
				<img src="/svgs/logo.svg" alt="" class="xl:hidden mb-8 mx-auto">
                <p class="space-y-16">
                    We’re Galactic Fleet, a Hungarian video game development company with
                    roots in Budapest and partnerships in California. We build video games,
                    and we love it! Games are universally understood, and modern video games
                    engage all ages. Imagine building something that can be in the hands of
                    everyone, from children to grandmothers!
                </p>
                <p class="pt-6">
                    We are focused on building the best mobile, PC and console experiences
                    for our partners, players, and employees without compromise
                </p>
            </div>
			<div class="flex flex-col text-center items-center pt-12 mb-32">
				<h1 class="underline text-2xl font-bold">What we do:</h1>
				<p class="pt-4">Video game development</p>
				<p class="pb-4">2D / 3D game design</p>
                <img src="/svgs/problems/problem-1.svg" alt="" class="w-28 md:w-44">
				<p class="pt-4">Co-development</p>
				<p  class="pb-4">Development consulting</p>
                <img src="/svgs/problems/problem-4.svg" alt="" class="w-28 md:w-44">
                <img src="" alt="">
				<p  class="pt-4" >Internship programs</p>
				<p>Networking events</p>
			</div>
		</div>
	</div>
</section>
