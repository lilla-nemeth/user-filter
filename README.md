# Users Dashboard

Built with React, TypeScript, Next.js, Sass and Jest.

A dashboard where users data is fetched and filtered by search, dropdown list and toggle button.

## Install

```bash
yarn install
```

## Running the App

```bash
yarn dev
```

## Running Tests

```bash
yarn test
```

## Directories

- `types` -- Constants and TypeScript types for data and props
- `app` -- Dashboard page and layout
- `app/__mocks__` -- Mock user data for unit testing
- `app/__tests__` -- Unit tests
- `app/api/users` -- Logic for data fetching from users API 
- `app/components` -- Mostly reusable components
- `app/components/icons` - Icons components
- `app/styles` -- Style variables, global styles and Dashboard module
- `app/utils` -- Functions related to the state, sorting user cards and fetching users data for the client page
