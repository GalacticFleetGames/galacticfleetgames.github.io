<script lang="ts">
	import { base } from '$app/paths';
	import Marquee from 'svelte-fast-marquee';

    // Define the type
    type CompanyValue = {
    title: string;
    description: string;
    };

	// Define the array
const companyValues: CompanyValue[] = [
  {
    title: "We are open",
    description: "We welcome and respect every aspect of diversity.",
  },
  {
    title: "Stand up",
    description:
      "We encourage you to use your voice if you experience unfair treatment, uncomfortable situations or any kind of harassment.",
  },
  {
    title: "Transparency",
    description:
      "We believe in the benefits of clear and honest communication.",
  },
  {
    title: "Be direct and kind",
    description:
      "We value assertive communication and prefer to receive specific and actionable feedback.",
  },
  {
    title: "Get it done",
    description:
      "Be proactive, trust your knowledge and experience, and do it!",
  },
  {
    title: "Take the responsibility",
    description:
      "Own up to mistakes, take corrective action, learn from them, and take the initiative to solve problems.",
  },
  {
    title: "Team work",
    description:
      "We share the tasks, the responsibility and the achievements.",
  },
  {
    title: "Effectiveness and excellence",
    description:
      "Develop efficient processes to optimize operations and communication. Expand knowledge and strive for excellence to deliver the right solutions.",
  },
];
</script>

<svelte:head>
	<title>Team | Galactic Fleet</title>
</svelte:head>

<section
	class="flex h-[60vh] w-full flex-col items-center justify-end bg-cover bg-center md:h-screen"
	style="background-image: url('{base}/svgs/layout/portfolio-bg.svg');"
>
<p class="text-center text-sm w-4/5 md:text-base md:w-1/2 text-[#0365aa] font-semibold md:py-12">
    At the core of our culture are values that guide how we work, collaborate, and grow — with integrity, respect, and a commitment to excellence. These principles define who we are and how we show up every day.
</p>
</section>
<div class="bg-[#47c1e6] text-[#0365aa] py-8">
    <div class="grid md:grid-cols-2 md:grid-rows-4 text-center justify-items-center">
        {#each companyValues as value}
        <div class="value p-4 w-2/3">
          <p class="font-bold text-lg">{value.title}</p>
          <p class="justify-self-center">{value.description}</p>
        </div>
      {/each}
    </div>
</div>