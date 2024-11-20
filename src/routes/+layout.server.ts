import type { LayoutServerLoad } from './$types';

// since there's no dynamic data here, we can prerender
// it so that it gets served as a static asset in production
export const prerender = true;

export const trailingSlash = 'always';

export const load: LayoutServerLoad = async ({ url }) => {
	return {
		url: url.pathname
	};
};
