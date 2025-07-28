# VesselVigil
VesselVigil is an open-source application designed to help you track and manage boat maintenance. Key features include intervention tracking, associated accounting, and inventory management for parts required during maintenance.

## Getting started

To get started, follow these steps:

### Prerequisites

- [Docker](https://www.docker.com/get-started/) installed
- [Node.js](https://nodejs.org/) installed
- [Yarn](https://yarnpkg.com/getting-started) installed

### 1. Install dependencies

```bash
yarn install
```

### 2. Set up Supabase locally

```bash
supabase init
supabase start
```

This will start a local Supabase instance for development. The studio will be available at `http://localhost:54323`.

Migrate the database schema onto your Supabase database:
```bash
supabase migration up
```

### 3. Configure environment variables

Create a `.env` file and add your Supabase credentials:

```env
VITE_SUPABASE_URL=http://localhost:54321
VITE_SUPABASE_KEY=your-anon-key
```

### 4. Run the Vite development server

```bash
yarn dev
```

The application will be available at `http://localhost:5173`.

## Deployment

For detailed deployment instructions, please refer to the [Deployment Documentation](./docs/deployment.md).
