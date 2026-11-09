import { requireAdmin } from '@/lib/session'
import { getMyPermissionCodes } from '@/lib/permissions'
import { db } from '@/lib/db'
import { AdminLayout } from '@/components/admin/admin-layout'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { SmsTestPanel } from './sms-test-panel'
import { termiiConfigured } from '@/lib/sms'

export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'SMS Diagnostic',
  robots: { index: false, follow: false },
}

export default async function SmsDiagnosticPage() {
  await requireAdmin()
  const perms = await getMyPermissionCodes()

  // Config status — what does the server see in env?
  const config = {
    termiiApiKeySet: termiiConfigured(),
    termiiToSet: !!(process.env.TERMII_TO && process.env.TERMII_TO.trim()),
    termiiSenderId: process.env.TERMII_SENDER_ID || '(not set, defaults to WARDROBECARE)',
  }

  // AdminSettings phone fields — where the owner phone would come from if env isn't set
  const settings = await db.adminSettings.findUnique({
    where: { id: 'singleton' },
    select: { supportPhone: true, whatsappNumber: true, storeName: true, supportEmail: true },
  })

  // Most recent SMS attempts from SmsLog
  const recent = await db.smsLog.findMany({
    orderBy: { createdAt: 'desc' },
    take: 30,
    include: { order: { select: { orderNumber: true } } },
  })

  const sent = recent.filter((r) => r.ok).length
  const failed = recent.length - sent
  const last = recent[0]

  // Resolve the recipient phone we'd use right now (for the test panel default)
  const defaultTo =
    process.env.TERMII_TO?.trim() ||
    settings?.supportPhone?.trim() ||
    settings?.whatsappNumber?.trim() ||
    ''

  return (
    <AdminLayout
      title="SMS Diagnostic"
      description="Why you did or didn't get an SMS when orders come in"
      permissions={perms}
    >
      <div className="flex flex-col gap-6">
        {/* Config status */}
        <Card>
          <CardHeader>
            <CardTitle>Termii configuration</CardTitle>
            <CardDescription>
              The SMS gateway is Termii. New-order SMS only sends if these are set correctly.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Row
              label="TERMII_API_KEY (env var)"
              value={
                <Badge variant={config.termiiApiKeySet ? 'default' : 'destructive'}>
                  {config.termiiApiKeySet ? 'Set' : 'NOT SET'}
                </Badge>
              }
              hint="Get this from your Termii dashboard → API Keys. Set in Vercel → Project → Settings → Environment Variables."
            />
            <Row
              label="TERMII_TO (env var)"
              value={
                <Badge variant={config.termiiToSet ? 'default' : 'destructive'}>
                  {config.termiiToSet ? 'Set' : 'NOT SET'}
                </Badge>
              }
              hint="Your phone number in international format (e.g. 2348012345678). SMS goes here on every new order."
            />
            <Row
              label="TERMII_SENDER_ID (env var)"
              value={<Badge variant="secondary">{config.termiiSenderId}</Badge>}
              hint="Sender ID must be approved on Termii for the DND/transactional route. If unapproved, SMS silently fails."
            />
            <Separator />
            <Row
              label="AdminSettings.supportPhone (DB)"
              value={
                <Badge variant={settings?.supportPhone?.trim() ? 'default' : 'destructive'}>
                  {settings?.supportPhone?.trim() ? 'Set' : 'NOT SET'}
                </Badge>
              }
              hint="Set in /admin/settings — Support phone field. Used as fallback when TERMII_TO is empty."
            />
            <Row
              label="AdminSettings.whatsappNumber (DB)"
              value={
                <Badge variant={settings?.whatsappNumber?.trim() ? 'default' : 'destructive'}>
                  {settings?.whatsappNumber?.trim() ? 'Set' : 'NOT SET'}
                </Badge>
              }
              hint="Last-resort fallback. Set in /admin/settings — WhatsApp number field."
            />
            {!config.termiiApiKeySet && (
              <div className="rounded-md border border-amber-300 bg-amber-50 p-3 text-sm text-amber-900">
                <strong>Action needed:</strong> your <code>TERMII_API_KEY</code> env var is not set. Add it to your deployment (Vercel → Project → Settings → Environment Variables) and to your local <code>.env.local</code> file, then redeploy. No SMS will send until this is set.
              </div>
            )}
            {config.termiiApiKeySet && !config.termiiToSet && !settings?.supportPhone?.trim() && !settings?.whatsappNumber?.trim() && (
              <div className="rounded-md border border-amber-300 bg-amber-50 p-3 text-sm text-amber-900">
                <strong>Action needed:</strong> no store-owner phone is configured. Either set <code>TERMII_TO</code> in env, or go to <a href="/admin/settings" className="underline">/admin/settings</a> and put your phone in the Support phone field.
              </div>
            )}
          </CardContent>
        </Card>

        {/* Test send */}
        <Card>
          <CardHeader>
            <CardTitle>Send a test SMS</CardTitle>
            <CardDescription>
              Use this to verify your Termii key, sender ID, and recipient phone are all working. The result is recorded in the log below.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <SmsTestPanel defaultTo={defaultTo} />
          </CardContent>
        </Card>

        {/* Recent SMS log */}
        <Card>
          <CardHeader>
            <CardTitle>
              Recent SMS attempts
              {recent.length > 0 && (
                <span className="ml-2 text-sm font-normal text-muted-foreground">
                  Last 30 — {sent} sent, {failed} failed
                  {last && ` · most recent: ${last.createdAt.toISOString().replace('T', ' ').slice(0, 19)} UTC`}
                </span>
              )}
            </CardTitle>
            <CardDescription>
              Every send attempt (success or failure) is recorded here. This is how you can see exactly why an SMS didn't reach you.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {recent.length === 0 ? (
              <p className="text-sm text-muted-foreground py-6 text-center">
                No SMS attempts logged yet. Place a test order, or use the test panel above, then refresh this page.
              </p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="text-xs uppercase text-muted-foreground border-b">
                    <tr>
                      <th className="text-left py-2 px-2">When</th>
                      <th className="text-left py-2 px-2">Reason</th>
                      <th className="text-left py-2 px-2">Order</th>
                      <th className="text-left py-2 px-2">Recipient</th>
                      <th className="text-left py-2 px-2">Source</th>
                      <th className="text-left py-2 px-2">Result</th>
                      <th className="text-left py-2 px-2">Error / response</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recent.map((r) => (
                      <tr key={r.id} className="border-b last:border-0">
                        <td className="py-2 px-2 whitespace-nowrap text-xs text-muted-foreground">
                          {r.createdAt.toISOString().replace('T', ' ').slice(0, 19)}
                        </td>
                        <td className="py-2 px-2 whitespace-nowrap">{r.reason}</td>
                        <td className="py-2 px-2 whitespace-nowrap text-xs">
                          {r.order?.orderNumber ?? '—'}
                        </td>
                        <td className="py-2 px-2 whitespace-nowrap text-xs font-mono">{r.recipient}</td>
                        <td className="py-2 px-2 whitespace-nowrap text-xs text-muted-foreground">
                          {r.recipientSource ?? '—'}
                        </td>
                        <td className="py-2 px-2 whitespace-nowrap">
                          {r.ok ? (
                            <Badge variant="default">Sent</Badge>
                          ) : (
                            <Badge variant="destructive">Failed</Badge>
                          )}
                        </td>
                        <td className="py-2 px-2 text-xs text-muted-foreground max-w-md">
                          {r.error && <div className="font-mono text-red-600">{r.error}</div>}
                          {r.providerResponse && (
                            <details className="mt-1">
                              <summary className="cursor-pointer text-xs">Provider response</summary>
                              <pre className="mt-1 text-xs bg-muted p-2 rounded whitespace-pre-wrap break-all">
                                {r.providerResponse}
                              </pre>
                            </details>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>How the SMS flow works</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground space-y-2">
            <p>
              <strong>1. Customer places an order</strong> at checkout — the server action in <code>src/actions/store.ts</code> calls <code>notifyOwnerNewOrder</code> after the order is saved. This is the SMS that fires for every order, regardless of payment method.
            </p>
            <p>
              <strong>2. Paystack confirms a card payment</strong> via webhook at <code>/api/webhooks/paystack</code> — that triggers a second <code>notifyOwnerNewOrder</code> call with <code>paymentStatus: 'SUCCESS'</code>. This only fires for Paystack-card orders.
            </p>
            <p>
              <strong>3. SMS sender resolves your phone</strong> in this order: <code>TERMII_TO</code> env var → <code>AdminSettings.supportPhone</code> → <code>AdminSettings.whatsappNumber</code>. If none is set, the SMS is skipped and the reason is recorded here.
            </p>
            <p>
              <strong>4. SMS is sent via Termii</strong> using the <code>dnd</code> (transactional) channel, with your <code>TERMII_SENDER_ID</code> as the from-name. The sender ID must be approved on your Termii account for the DND route, or the SMS silently fails.
            </p>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  )
}

function Row({
  label,
  value,
  hint,
}: {
  label: string
  value: React.ReactNode
  hint?: string
}) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 py-1">
      <div className="sm:w-72 text-sm font-medium">{label}</div>
      <div className="flex-1 flex flex-col gap-1">
        <div>{value}</div>
        {hint && <div className="text-xs text-muted-foreground">{hint}</div>}
      </div>
    </div>
  )
}
