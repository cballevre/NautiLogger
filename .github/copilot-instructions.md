# VesselVigil — AI Agent Instructions

This document guides AI agents to contribute effectively to the VesselVigil project.

## Overview
- **VesselVigil** is an open-source application for managing boat maintenance: tracking interventions, inventory of parts, access and account management.
- Architecture:
  - Frontend : **React + TypeScript** with **Vite**
  - Backend : **Supabase** for database and authentication.
- Folders structure:
  - The project uses a **feature-based architecture**. This improves modularity and makes it easier to work on a specific feature without affecting others.
  - `src/boats/`, `src/equipments/`, `src/interventions/`: each main business domain (boats, equipments, interventions) is organized in its own folder containing all related components, pages, hooks, and utils.
  - `src/core/`: layout, provider, global routing.
  - `src/shared/`: reusable components and common types.
  - `supabase/`: SQL schemas, migrations, seeds.

## Conventions and patterns
- **Pages**: each entity has a `pages/` folder for main views (e.g., `add.tsx`, `list.tsx`, `dashboard.tsx`).
- **Components**: reusable, organized by entity in `components/`.
- **Hooks**: business logic in `hooks/` (e.g., `use-current-boat.tsx`).
- **Utils**: business helpers in `utils/`.
- **Types**: centralized in `src/shared/types/`.
- **I18n**: translation files in `public/locales/`.
- **Authentication**: handled via Supabase and Refine, see `src/auth/providers/auth-provider.ts`.

## Commit messages
- Use the conventional commits format: `type(scope): Description`.
- Types include: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`.
- Use the imperative mood in the description (e.g., `feat: Add new boat management feature`).
- Include a short description of the change and, if necessary, a longer explanation in the body.
- Example: `feat(boats): Add boat management page with list and add functionality`.
- Always write in English

## React librairies
- **Refine**: used for data management and UI components.
- **Ant Design**: UI components library.
- **React Router**: for routing.

## React usage
- Use **functional components** with hooks.
- Use **TypeScript** for type safety.
- Use kebab-case for file names (e.g., `add-boat.tsx`, `boat-list.tsx`).
- Use **named exports** for components.
- Export components at the bottom of the file.
- Use PascalCase for component names (e.g., `AddBoat`, `BoatList`).
- One component per file, with the file name matching the component name.

## Supabase usage
- **Supabase client**: Always access Supabase using the helper in `src/core/utils/supabaseClient.ts`. Do not instantiate Supabase clients elsewhere.
- **Database schemas**: All table and relationship definitions are stored in `supabase/schemas/`. Update these files when changing the database structure.
- **Migrations**: SQL migration scripts are located in `supabase/migrations/`. These scripts are generated from the schema files and must be applied to keep the Supabase database up to date.

## Refine usage
- Use Refine hooks (e.g., `useList`, `useDelete`, `useCreate`) for all Supabase data operations. Avoid direct Supabase client calls except in utilities.
- Organize Refine logic by feature: hooks and pages for each entity (boats, equipments, interventions).
- Prefer declarative data fetching and mutation via Refine, and leverage its built-in error/loading states.
- Example: To list boats, use `useList` in `src/boats/pages/list.tsx`.
- To navigate between pages, use the `useGo` hook or the `Link` component from Refine.

## Ant Design usage
- Use Ant Design components for all UI elements unless a custom component is required.
- Customize Ant Design components using props and the project's global styles (`src/global.css`).
- Organize UI components by feature in their respective `components/` folders.
- Example: Use `<Table />` for entity lists, `<Form />` for add/edit pages, and `<Button />` for actions.

## Translations usage
- All translations are stored in `public/locales/` in JSON files.
- Use `translate` function from `useTranslate` hook from Refine to access translations in components.
- Always provide translations for both English and French.
- Split each part of key into a json object inside locale files, e.g., `common.deleteBoat.button` will be `{ "common": { "deleteBoat": { "button": "The translation for the key" }}}`.
- Refine use i18next under the hood, follow its conventions for pluralization and interpolation.

## Project-specific best practices
- To get information about the current boat, use the `useCurrentBoat` hook from `src/boats/hooks/use-current-boat.tsx`.
