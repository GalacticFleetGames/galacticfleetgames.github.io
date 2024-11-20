# Galactic Fleet Website

Currently, this site is built with SvelteKit, with the possibility to migrate to any other framework.

# Setup local dev env
1. You have to install nvm to setup the proper node version.
1. `nvm use` - this will install the node version pinned in the `.nvmrc` file
1. `npm i` - to install all the deps
1. `npm run dev` - run the website locally

## git hooks
- `pre-commit`: we use `husky` to run the pnpm linter before commits. It requires a working localdevenv with the right node version.
