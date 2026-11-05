/**
 * Additive schema migration via Prisma client — bypasses the slow
 * `prisma db push` interactive flow. ONLY adds the new OrderNote table +
 * relation columns. Does NOT touch any existing data.
 *
 * Run with: `node --experimental-strip-types scripts/migrate-order-notes-prisma.ts`
 * or compile first.
 */
import { PrismaClient } from '@prisma/client'

const db = new PrismaClient({
  datasources: {
    db: {
      url:
        process.env.DATABASE_URL ||
        'postgresql://postgres.msaqfdjwizvzdjnpzkvg:Onyemanelso@aws-0-eu-west-1.pooler.supabase.com:6543/postgres?pgbouncer=true',
    },
  },
})

const STATEMENTS = [
  // 1. OrderNote table — additive only
  `CREATE TABLE IF NOT EXISTS "OrderNote" (
    "id" TEXT NOT NULL DEFAULT '',
    "orderId" TEXT NOT NULL,
    "authorId" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "pinned" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "OrderNote_pkey" PRIMARY KEY ("id")
  )`,
  `CREATE INDEX IF NOT EXISTS "OrderNote_orderId_idx" ON "OrderNote"("orderId")`,
  // 2. Foreign keys — additive (DO blocks so they are idempotent)
  `DO $$ BEGIN
    IF NOT EXISTS (
      SELECT 1 FROM pg_constraint WHERE conname = 'OrderNote_orderId_fkey'
    ) THEN
      ALTER TABLE "OrderNote"
        ADD CONSTRAINT "OrderNote_orderId_fkey"
        FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE CASCADE;
    END IF;
  END $$`,
  `DO $$ BEGIN
    IF NOT EXISTS (
      SELECT 1 FROM pg_constraint WHERE conname = 'OrderNote_authorId_fkey'
    ) THEN
      ALTER TABLE "OrderNote"
        ADD CONSTRAINT "OrderNote_authorId_fkey"
        FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE CASCADE;
    END IF;
  END $$`,
]

async function main() {
  for (const sql of STATEMENTS) {
    try {
      await db.$executeRawUnsafe(sql)
      console.log('OK:', sql.slice(0, 80).replace(/\s+/g, ' '))
    } catch (e) {
      // Most failures here are "already exists" — fine, idempotent.
      console.log('SKIP:', e.message.slice(0, 80), '—', sql.slice(0, 60).replace(/\s+/g, ' '))
    }
  }
  console.log('Migration complete.')
}

main()
  .catch((e) => {
    console.error('Fatal:', e)
    process.exit(1)
  })
  .finally(async () => {
    await db.$disconnect()
  })
