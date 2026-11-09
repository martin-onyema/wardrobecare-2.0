# Database Migrations

This folder contains SQL migration files for the Wardrobecare production
Postgres (Supabase) database.

## How to apply

You have two options. **Option A** is recommended — it uses Prisma's
own tooling and tracks the migration in the `_prisma_migrations` table
so it won't be re-applied.

### Option A — via Prisma Migrate (recommended)

Make sure your local environment has the production database URL:

```bash
# .env.local (temporarily — REMOVE after the migration)
DATABASE_URL="postgresql://postgres:YOUR_PASSWORD@aws-0-eu-central-1.pooler.supabase.com:5432/postgres?pgbouncer=true&prepared_statements=false"
DIRECT_URL="postgresql://postgres:YOUR_PASSWORD@aws-0-eu-central-1.pooler.supabase.com:6543/postgres"
```

Then deploy the migration:

```bash
npx prisma migrate deploy --schema=prisma/schema.prisma
```

This will apply any pending migrations in this folder to the production
database and record them in the `_prisma_migrations` table.

After it succeeds, **remove the production DATABASE_URL from your local
.env.local** so you don't accidentally run local dev against production.

### Option B — via Supabase SQL Editor

If you prefer to run the SQL directly:

1. Open your Supabase dashboard → SQL Editor.
2. Open `prisma/migrations/20261109_seo_and_sms.sql` from this repo.
3. Copy the entire file contents into the SQL Editor.
4. Review the SQL (all changes are additive — no existing data is touched).
5. Click **Run**.

The new tables (`SmsLog`, `SeoOverride`, `Redirect`, `SeoTemplate`,
`SeoAuditLog`) will be created, and the new columns (`seoH1`, `seoIntroText`,
`seoOgImage`, `noindex`, `inSitemap`) will be added to `Category` and
`Product`. Existing rows default to `noindex = false` and `inSitemap = true`
— every existing record is indexed and in the sitemap by default, exactly
as before.

## What's in this migration

### SMS fix (commit a54af46)

- New `SmsLog` table — records every Termii SMS send attempt (success or
  failure), used by the `/admin/notifications/sms` diagnostic page.

### SEO Manager (commit b6aae00)

- `Category`: new `seoH1`, `seoIntroText`, `seoOgImage` (TEXT, nullable),
  `noindex` (BOOLEAN default false), `inSitemap` (BOOLEAN default true).
- `Product`: new `seoH1` (TEXT, nullable), `noindex` (BOOLEAN default
  false), `inSitemap` (BOOLEAN default true).
- New `SeoOverride` table — keyed by route, holds SEO fields for static
  pages (`/about`, `/faq`, etc.) and services (`/services/wardrobe-consultation`)
  that don't have a dedicated DB model.
- New `Redirect` table — `fromPath` (unique), `toPath`, `statusCode`,
  `note`, `createdById`. The middleware looks up paths here and issues
  the configured redirect.
- New `SeoTemplate` table — `contentType` (unique), template strings with
  `{name}` and `{name_lc}` placeholders. Used by the "Auto templates" tab
  to fill empty SEO fields without overwriting existing values.
- New `SeoAuditLog` table — records every SEO field change with the old
  value, new value, and the user who made the change.

All changes are **additive** — existing data is not affected, and the new
boolean columns default to `noindex = false` and `inSitemap = true`, so
every existing record defaults to indexed + in-sitemap exactly as it was
before the migration.

## Rolling back

If you need to roll back (the changes are safe to keep, but for reference):

```sql
DROP TABLE IF EXISTS "SeoAuditLog";
DROP TABLE IF EXISTS "SeoTemplate";
DROP TABLE IF EXISTS "Redirect";
DROP TABLE IF EXISTS "SeoOverride";
DROP TABLE IF EXISTS "SmsLog";

ALTER TABLE "Product" DROP COLUMN IF EXISTS "seoH1";
ALTER TABLE "Product" DROP COLUMN IF EXISTS "noindex";
ALTER TABLE "Product" DROP COLUMN IF EXISTS "inSitemap";

ALTER TABLE "Category" DROP COLUMN IF EXISTS "seoH1";
ALTER TABLE "Category" DROP COLUMN IF EXISTS "seoIntroText";
ALTER TABLE "Category" DROP COLUMN IF EXISTS "seoOgImage";
ALTER TABLE "Category" DROP COLUMN IF EXISTS "noindex";
ALTER TABLE "Category" DROP COLUMN IF EXISTS "inSitemap";
```
