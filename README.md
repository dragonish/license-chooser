# License Chooser

A web application that helps developers browse, filter, compare, and download open-source software licenses.

## Demo

- [Site 1](https://license.dragonish.org/)
- [Site 2](https://cucumber7748.serv00.net/)

## Features

- **License Browsing** -- View 47 open-source licenses with detailed metadata including permissions, conditions, and limitations.
- **Filtering** -- Narrow down licenses using 9 criteria (e.g., patent use, disclose source, same license) with yes/no/special options.
- **Search** -- Filter licenses by SPDX ID or name.
- **Sorting** -- Sort by usage popularity (default) or alphabetically by ID. Preference is persisted locally.
- **Copy** -- Copy license SPDX ID or name to the clipboard with one click.
- **Download** -- Download a ready-to-use `LICENSE` file. If the license requires personalized info (e.g., author, year), a dialog prompts you to fill in the fields and the template is automatically populated.
- **Dark Mode** -- Toggle between auto (follows system), dark, and light themes.
- **Internationalization** -- Supports English (en-US), Simplified Chinese (zh-CN), and Traditional Chinese (zh-TW) with auto-detection.

## Tech Stack

- [Quasar Framework 2](https://quasar.dev/)
- [Vue 3](https://vuejs.org/) with Composition API
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/) via `@quasar/app-vite`
- [Pinia](https://pinia.vuejs.org/) for state management
- [Vue Router](https://router.vuejs.org/)
- [Vue I18n](https://vue-i18n.intlify.dev/)

## Getting Started

### Prerequisites

- Node.js ^22.12 || ^24 || ^26 || ^28
- npm (>= 6.13.4), yarn (>= 1.21.1), or pnpm (>= 10.0.0)

### Install dependencies

```bash
npm install
# or
yarn
# or
pnpm install
```

### Start in development mode

```bash
quasar dev
```

### Lint

```bash
npm run lint
```

### Build for production

```bash
quasar build
```

### Customize the configuration

See [Configuring quasar.config.js](https://v2.quasar.dev/quasar-cli-vite/quasar-config-js).

## Docker

The easiest way to deploy is via the pre-built Docker image:

```bash
# pull
docker pull giterhub/license-chooser:latest

# run
docker run -d \
    --name license-chooser \
    --restart unless-stopped \
    -p 80:80 \
    giterhub/license-chooser:latest
```

## License

This project is licensed under the [Open Software License 3.0 (OSL-3.0)](LICENSE).

## Credits

This application uses license data from [github/choosealicense.com](https://github.com/github/choosealicense.com), a project by GitHub that helps people choose an open-source license for their work. The license templates, metadata (permissions, conditions, limitations), and descriptions are derived from this project. We are grateful to GitHub and the choosealicense.com contributors for making this data freely available.
