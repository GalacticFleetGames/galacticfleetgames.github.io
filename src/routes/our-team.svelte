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
			name: 'Andras',
			role: 'Engineer',
			imgSrc: '/images/team/andras.png',
			description:
				'Ever since his childhood Andras was always entertained by the worlds of books, movies, and video games. He also enjoy creating and building things, figuring out solutions to mind-bending problems. Game development has everything Andras love: fantasy, creativity, ingenuity. Andras mainly enjoy working on Gameplay, that is where he is most experienced.'
		},
		{
			name: 'Betti',
			role: 'Recruiter',
			imgSrc: '/images/team/betti.png',
			description:
				'Betti has a remarkable ability to identify exceptional talents. She has worked with global companies including Cloudera and GitLab to assemble winning teams that thrive on creative problem solving. Her emphasis on fostering a culture of innovation and driving efficiency has made a significant impact on the success of the organizations she has worked with.'
		},
		{
			name: 'Bence',
			role: 'Software Engineer',
			imgSrc: '/images/team/bence.png',
			description:
				"Bence is a software engineer with a passion for gaming. While his main focus lies in DevOps and tackling infrastructural challenges, don't be deceived. His interest in game development traces back to the day he unwrapped his first Nintendo Famicom console. As a lifelong learner, you're welcome to reach out to him with any tech-related inquiries."
		},
		{
			name: 'evik',
			role: 'Software Engineer',
			imgSrc: '/images/team/evik.png',
			description:
				'evik is a seasoned polyglot developer who often finds himself chasing elusive bugs and digging in documentation to squeeze out more performance. His current focus is Rust, WebAssembly and WebGPU with interest in using generative AI as a coding companion.'
		},
		{
			name: 'Laci',
			role: 'Software Engineer',
			imgSrc: '/images/team/laci.png',
			description:
				'Laci is an engineering leader who is keen on new technologies and methodologies that support software development. He thrives on creating and optimizing SLDC pipelines, including developer experience, release and testing infrastructure and monitoring solutions.'
		},				
		{
			name: 'Mate',
			role: 'Software Engineer',
			imgSrc: '/images/team/mate.png',
			description:
				'Mate is a passionate software engineer intern with a deep love for video games that spans over a decade. His enthusiasm for both playing and creating games drives him to solve complex problems in the gaming world.'
		},
		{
			name: 'Misi',
			role: 'Software Engineer',
			imgSrc: '/images/team/misi.png',
			description:
				'Misi is a backend engineer, worked on a wide variety of consumer and business applications. He prefers to work with functional and strongly typed programming languages on tough problems. He is very much interested in new technologies and gadgets, loves casual, "indy" or racing games.In real life he enjoys riding motorbikes, travel around, spend time outdoors and taking a lot of photos.'
		},
		{
			name: 'Reka',
			role: 'Designer',
			imgSrc: '/images/team/reka.png',
			description:
				'Réka is our designer with a passion for creating visually stunning and user-friendly digital experiences. Réka has loved the world of art since she was young. She studied engineering at university, where she realized that the combination of the two was the perfect profession for her.'
		}
	];

	const advisors: Array<Member> = [
		{
			name: 'Ishai',
			role: 'Advisor',
			imgSrc: '/images/team/ishai.png',
			description:
				'On an advisory level Ishai brings to us his extensive work experience in the tech industry. Ishai was the CEO & Founder of Growth Streak, Business Performance at Proteus Games, Business Growth Advisor at Lightricks, CPO at JOB TODAY, Senior Director, Product Management & Business Performance and Director, Product Management & Business Performance at King, Lead Product Manager, Senior Product Manager and Product Manager at Electronic Arts (EA), Co-Founder/Product Manager/Android Developer at CraveEat Mobile, Business Development Manager / Economy Manager at P-Kama, and Business Development Manager at Shidonni.. He also held a Strategic Review and Marketing Intelligence Project at Geoservices.  Ishai Shamir received their MBA from HEC Paris in 2009, specializing in Entrepreneurship. Ishai also obtained a Bachelor of Arts (BA) in Psychology and a Bachelor of Laws (LL.B.) from Tel Aviv University between 2002 and 2006.'
		}
	];
</script>

<section
	class="px-wrapper mx-auto flex min-h-screen w-full max-w-screen-2xl flex-col items-center justify-start gap-4 py-28 md:gap-20 xl:gap-40"
>
	<h2 class="font-aldrich text-2xl uppercase text-blue md:text-4xl xl:text-7xl">
		Our team
	</h2>
	<ul class="space-y-16">
		{#each team as m, i}
			<li>
				<MemberCard member={m} align={i % 2 ? 'left' : 'right'} />
			</li>
		{/each}
	</ul>
	<h2 class="font-aldrich text-2xl uppercase text-blue md:text-4xl xl:text-7xl">
		Advisors
	</h2>
	<ul class="space-y-16">
		{#each advisors as m, i}
			<li>
				<MemberCard member={m} align={i % 2 ? 'right' : 'left'} />
			</li>
		{/each}
	</ul>
</section>
