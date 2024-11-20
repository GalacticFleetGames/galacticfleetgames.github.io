import { jobs } from '$lib/job-descriptions';
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = ({ params }) => {
	const job = jobs.find((j) => j.slug === params.job);

	if (!job) throw redirect(308, '/career');

	return {
		job
	};
};
