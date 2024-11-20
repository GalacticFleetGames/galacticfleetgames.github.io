<svelte:head>
	<title>Contact | Galactic Fleet</title>
	<meta name="description" content="Contact informations for Galactic Fleet" />
</svelte:head>

<!-- <section
	class="px-wrapper relative min-h-screen w-full bg-no-repeat bg-center 3xl:bg-cover"
  style="background-image: url('/svgs/layout/contact-bg.svg')"
> -->
<section
	class="px-wrapper max-w-screen relative flex min-h-screen items-center justify-end overflow-hidden bg-[url('/svgs/layout/contact-bg.svg')] 3xl:bg-cover"
>
	<h1 class="sr-only">Contact informations for Galactic Fleet</h1>

	<div
		class="flex h-full w-fit flex-col items-start justify-center gap-y-4 md:gap-y-6 xl:gap-y-8"
	>
		<img
			class="w-56 md:w-72 lg:w-96 xl:w-[34rem]"
			src="/svgs/logo.svg"
			alt="Logo of the company"
		/>
		<ul class="flex flex-col items-start justify-start gap-y-2 md:ml-4">
			<a
				href="mailto:info@galactic-fleet.com"
				class="inline-flex items-center gap-4 xl:gap-8"
			>
				<img src="/svgs/icons/mail.svg" alt="mail" />
				<span class="text-lg md:text-2xl xl:text-3xl">info@galactic-fleet.com</span
				>
			</a>
		</ul>
	</div>
</section>

<style>
	section {
		background-position-x: 65%;
		background-repeat: no-repeat;
	}
</style>
