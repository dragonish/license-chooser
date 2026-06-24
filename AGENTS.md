# Project Instructions

This is a Quasar project.

## Tech Stack

- Quasar Framework 2
- Vue 3
- TypeScript
- Vite via `@quasar/app-vite`
- Pinia
- Vue Router
- Vue I18n
- ESLint
- Use the existing package manager and project conventions

## Internationalization

This is an internationalized project.

- Write user-facing text in English by default
- Do not hardcode UI strings directly in Vue components when i18n is already used
- Prefer existing i18n message files and translation keys
- Follow the existing naming style for translation keys
- When adding new UI text, add it through the i18n system unless instructed otherwise

## Development Guidelines

- Follow the existing code style
- Keep changes minimal and focused
- Prefer Quasar components and patterns
- Check existing files before introducing new structure
- Do not refactor unrelated code
- In Vue templates, use kebab-case for component element names (e.g. `<my-component>` not `<MyComponent>`)

## Verification Rule

When the user asks exactly "rules-check", reply with:
"AGENTS.md loaded for this Quasar project."
