<script lang="ts">
	const socials = [
		/* {
			href: 'https://www.facebook.com',
			title: 'Facebook',
			iconPath: '/svgs/icons/facebook.svg'
		},
		{
			href: 'https://www.instagram.com',
			title: 'Instagram',
			iconPath: '/svgs/icons/instagram.svg'
		}, */
		{
			href: 'https://www.linkedin.com/company/galactic-fleet/about/',
			title: 'LinkedIn',
			iconPath: '/svgs/icons/linkedin.svg'
		}
	];
</script>

<footer
	class="relative flex h-20 md:h-36 xl:h-44 w-full justify-between items-center gap-8 xl:gap-40 overflow-x-hidden bg-navy "
>
    <img class="pl-wrapper w-40 sm:w-48 md:w-60 lg:w-72 xl:w-[32rem] " src="/svgs/logo.svg" alt="Logo of the company">
  <!-- <div class="left-6 absolute w-fit h-full inline-flex items-center justify-center">
  </div> -->

	<nav class="w-fit  xl:space-y-4 flex flex-col">
		<h2 class="font-aldrich text-sm md:text-2xl xl:text-4xl uppercase">
			Social&nbsp;media
		</h2>
		<ul class="flex w-full justify-center gap-x-2 xl:gap-x-16">
			{#each socials as s}
				<li class="">
					<a href={s.href} target="_blank" >
						<img src="{s.iconPath}" alt={s.title}  class="aspect-square w-6 h-6  md:w-12 md:h-12  xl:w-16 xl:h-16"/>
					</a>
				</li>
			{/each}
		</ul>
	</nav>

	 <img
		class="sm:translate-x-[20%] h-full " 
		src="/svgs/layout/footer-planet.svg"
		alt="A Pink planet floating away"
	/> 
</footer>
