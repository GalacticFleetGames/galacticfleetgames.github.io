//import { mdsvex } from 'mdsvex';
import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/kit/vite';

/** @type {import('mdsevx').MdsvexOptions} */
/* const markdownConfig = {
	extensions: ['.md'],
	layout: './src/routes/blog/posts/markdown-layout.svelte'
}; */

/** @type {import('@sveltejs/kit').Config} */
const config = {
	extensions: ['.svelte', '.md'],

	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: [vitePreprocess()],

	kit: {
		// Using static adapter for GitHub Pages-style deployment.
		// Enable SPA-style fallback so dynamic routes (e.g. /career/[job]) work on a static host.
		adapter: adapter({
			fallback: 'index.html',
			strict: false
		})
	}
};

export default config;
