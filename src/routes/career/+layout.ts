import type { LayoutLoad } from './$types';
import { jobs } from '$lib/job-descriptions';

export const load: LayoutLoad = () => {
	return {
		jobs
	};
};
