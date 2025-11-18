<svelte:head>

	<title>Contact | Galactic Fleet</title>
	<meta name="description" content="Contact informations for Galactic Fleet" />
</svelte:head>

<!-- <section
	class="px-wrapper relative min-h-screen w-full bg-no-repeat bg-center 3xl:bg-cover"
  style="background-image: url('/svgs/layout/contact-bg.svg')"
> -->
<section
	class="px-wrapper max-w-screen relative flex min-h-screen justify-start pt-none overflow-hidden bg-black bg-[url('/svgs/layout/home-bg-mobile.svg')] md:bg-[url('/svgs/layout/home-bg-logo.svg')] bg-center bg-contain md:bg-cover"
	>
	<h1 class="sr-only">Contact informations for Galactic Fleet</h1>

	<div
		class="flex w-fit flex-col gap-y-4 md:gap-y-6 xl:gap-y-8 pt-headerHeightXl"
	>
		<ul class="flex flex-col items-start justify-start gap-y-2 md:ml-4">
			<li>
				<a
					href="mailto:info@galactic-fleet.com"
					class="flex items-center gap-4 xl:gap-8"
				>
					<img src="/svgs/icons/mail.svg" alt="mail" />
					<span class="text-lg md:text-2xl xl:text-3xl">info@galactic-fleet.com</span>
				</a>
			</li>
			<li>
				<a
					href="https://www.linkedin.com/company/galacticfleet"
					class="flex items-center gap-4 xl:gap-8"
				>
					<img src="/svgs/icons/linkedin.svg" alt="mail" />
					<span class="text-lg md:text-2xl xl:text-3xl">Galactic Fleet LinkedIn</span>
				</a>
			</li>
		</ul>

	</div>

</section>

<style>
	section {
		background-position-x: 65%;
		background-repeat: no-repeat;
	}
</style>
