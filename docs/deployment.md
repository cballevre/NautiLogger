# Deployment

## 1. Supabase Production Setup

### Provision Supabase project in production

- Create a Supabase project at [supabase.com](https://supabase.com/).
- Retrieve your production Supabase URL and API key from the project settings.

### Configure environment variables for production

Update your `.env` file with the production Supabase credentials:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_KEY=your-production-anon-key
```

### Migrate your database schema
Apply migrations to your production Supabase database using:

```bash
supabase link
supabase db push
```

## 2. Build and Deploy Static Assets

### Build the application

Run the following command to create a production build:
```bash
yarn build
```

### Serve the production build

You can use any static file server or hosting platform to deploy your build.
