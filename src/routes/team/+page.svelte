<script lang="ts">
	import type { Member } from '$lib/components/member-card.svelte';
	import MemberCard from '$lib/components/member-card.svelte';

	const team: Array<Member> = [
		{
			name: 'Balazs',
			role: 'Founder, CEO',
			imgSrc: '/images/team/balazs.png',
			description:
				'Balazs has a knack for building and running high-performing product engineering teams. In his roles at various small startups and big names like Cloudera, Formlabs, Prezi and Nokia he saw that people who worked around him made things happen. Based in Budapest but with his heart in California, he brings a cool mix of innovation and know-how to the table.'
		},
		{
			name: 'Alex',
			role: 'Engineer',
			imgSrc: '/images/team/alex.png',
			description:
				'Alex is a passionate software engineer, striving for efficiency in his work. His journey began in high school, where he learned programming, and it has led him to experiment with all kinds of coding. He finds joy in developing optimized solutions for backend services and internal tools.'
		},
		{
			name: 'Bence',
			role: 'Software Engineer',
			imgSrc: '/images/team/bence.png',
			description:
				"Bence is a software engineer with a passion for gaming. While his main focus lies in DevOps and tackling infrastructural challenges, don't be deceived. His interest in game development traces back to the day he unwrapped his first Nintendo Famicom console. As a lifelong learner, you're welcome to reach out to him with any tech-related inquiries."
		},
		{
			name: 'Laci',
			role: 'Software Engineer',
			imgSrc: '/images/team/laci.png',
			description:
				'Laci is an engineering leader who is keen on new technologies and methodologies that support software development. He thrives on creating and optimizing SLDC pipelines, including developer experience, release and testing infrastructure and monitoring solutions.'
		},
		{
			name: 'Misi',
			role: 'Software Engineer',
			imgSrc: '/images/team/misi.png',
			description:
				'Misi is a backend engineer, worked on a wide variety of consumer and business applications. He prefers to work with functional and strongly typed programming languages on tough problems. He is very much interested in new technologies and gadgets, loves casual, "indy" or racing games.In real life he enjoys riding motorbikes, travel around, spend time outdoors and taking a lot of photos.'
		}
	];

	const advisors: Array<Member> = [
		
	];
</script>

<svelte:head>
	<title>Team | Galactic Fleet</title>
</svelte:head>

<section
	class="px-wrapper w-full bg-black bg-[url('/svgs/layout/stars-mobile.svg')] bg-contain bg-no-repeat pt-headerHeightMd text-white md:bg-[url('/svgs/layout/stars.svg')] md:bg-auto"
>
	<div
		class=" mx-auto flex w-full max-w-screen-2xl flex-col items-center justify-start gap-4 py-20 md:gap-20 xl:gap-40"
	>
		<h2
			class="font-aldrich text-2xl uppercase text-blue md:text-4xl xl:text-7xl"
		>
			Our team
		</h2>
		<ul class="space-y-16">
			{#each team as m, i}
				<li>
					<MemberCard member={m} align={i % 2 ? 'left' : 'right'} />
				</li>
			{/each}
		</ul>
		{#if advisors.length >0}
			<h2
				class="font-aldrich text-2xl uppercase text-blue md:text-4xl xl:text-7xl"
			>
				Advisors
			</h2>
			<ul class="space-y-16">
				{#each advisors as m, i}
					<li>
						<MemberCard member={m} align={i % 2 ? 'right' : 'left'} />
					</li>
				{/each}
			</ul>
		{/if}
	</div>
</section>
