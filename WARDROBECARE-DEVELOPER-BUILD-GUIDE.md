# Wardrobecare — Developer Build Guide (v2, consolidated)

**For:** the developer, working in VS Code with Z ai and React (Next.js).
**Replaces:** the seven separate `*-BACKEND-WORKFLOW.md` files. Those stay as deep reference; this is the one file to start from.
**Date:** 8 Nov 2026

---

## 0. Read this first (2 minutes)

1. The **HTML mockups (00–62) are the design**. This guide is the **logic** behind them.
2. Build **one service at a time**, in the order in section 3. Do not ask Z ai for the whole site in one go.
3. For each service, paste into Z ai: **Section 1 (Global rules) + Section 2 (Shared building blocks) + that service's section + its mockup HTML.** Each service section ends with a ready prompt.
4. **Every price, fee, time limit and policy is a setting in the database.** Nothing is hard-coded. The admin Settings page edits them.
5. **The server is the boss.** The browser only displays. Prices, discounts, permissions and states are always recomputed or checked on the server.
6. Anything marked **OPEN** is a decision the owner has not made yet. Build it as a setting with **no default**. Do not invent a value.

---

## 1. Global rules (apply to every service)

| Rule | What it means in code |
|---|---|
| Money | Whole naira stored as integers (`Int`). Never floats. Format with `Intl.NumberFormat('en-NG')` and the ₦ sign. |
| Time | Store UTC, show Africa/Lagos. |
| State machines | Each order has a `status`. Only the allowed moves in this guide are permitted. Every move writes a `StatusEvent` row (who, when, from, to, note). The admin timeline reads that table. |
| Price snapshot | When an order is created, copy the prices and fees onto it. Changing a setting later never changes old orders. |
| Server recalculates | Never trust an amount, discount or total sent from the browser. |
| Promo / reward consumption | Mark a code used **only when payment succeeds**, inside the **same database transaction** that marks the order PAID. Failed or expired payment consumes nothing. |
| Payments | Paystack. The webhook is **idempotent** (same reference twice = processed once). Zero-total orders skip Paystack and go straight to PAID. |
| Roles | `OWNER`, `FRONT_DESK`, `STYLIST`, `MERCHANDISER`. Scope is `view_all` or `view_own`, assigned at login and **checked on the server for every admin call**. The owner toggles permissions in Admin → Roles & access. |
| Wallet vs refund | Retail policy: no cash refunds, wallet credit. For services, the choice is a setting (**OPEN**). Build both paths, default to wallet. |
| Audit | Every admin change (fee, discount, status, permission) writes an `AuditLog` row: actor, action, before, after. |
| Notifications | One `notify(event, recipient, data)` function, templates in the database, channels WhatsApp / Email / SMS, every send logged. Max 2 retries, then flag "Needs attention". |
| Consent | Waitlist and marketing messages go only to people who ticked consent. Opt-outs are permanent. |
| Phone numbers | Normalise to `+234…` before saving or checking duplicates. |

### Locked business rules (the only fixed numbers; all still editable in Settings)

**Delivery** (Lagos 1–24h; outside Lagos 3–7 working days, quoted): Lagos Island/Onikan 4,000 · VI/Ikoyi/Obalende 5,000 · Lekki Ph1 5,000 · Lekki beyond/VGC 6,500 · Ajah+ 7,000 · Surulere 2,000 · Yaba/Ebute Metta/Costain 3,000 · Gbagada/Festac/Maryland/Anthony/Ilupeju 4,000 · Ikeja/Alapere/Isheri CMD 5,000 · Ketu/Berger/Alausa/Ogba/Magodo/Omole/Agege/Iju/Iyana Ipaja/Egbeda/Ikorodu 6,000 · Ota/Sango/Ikorodu further/Iyana Iba/Agbara/Badagri 7,000 · Outside Lagos: quote.

**Policies:** COD Lagos only, case by case · Exchanges only (48h wrong size/item/defect; 24h change of mind) · Items delivered in custom shopping bags at no extra cost · Brand word "distinguished" · Tiers: Essential / Classic / Signature.

| Service | Fixed numbers |
|---|---|
| Consultation | ₦45,000 first 2 hours · +₦10,000 per extra hour · return drop-off 50% (₦22,500) · return with fitting = full rate · referral reward: free consultation at 3 referrals |
| Personal Shopping | Delivered from ₦45,000 · In-Person Fitting from ₦50,000 (60 min included, +₦5,000 per extra 30 min) · sourcing 24–48h, never over 3 days |
| Outfit Gifting | Styling fee ₦40,000 (includes first Small or Medium box) · Large first box +₦10,000 · extra boxes S 10k / M 20k / L 30k · Gift Card minimum ₦100,000, no maximum |
| Alterations | Service & handling fee ₦20,000 (mandatory, every order) + items: trouser hem 5,000 · waist adjust 7,000 · sleeve shirt 5,000 / blazer 10,000 · take in/let out blazer 15,000 / shirt 6,000 / t-shirt 5,000 / jean-pant 6,000 · tear repair 5,000 · button 5,000 · zipper 5,000 |

---

## 2. Tech stack and VS Code project

**Stack (matches the live site):** Next.js (App Router, React) · TypeScript · Supabase Postgres · Prisma · NextAuth · Paystack · Supabase Storage (photos) · Zod (validation).

> "React" here means Next.js. It is React, with routing and API routes built in, so the same project holds the pages and the back end.

### Folder layout
```
wardrobecare/
├─ prisma/schema.prisma              # section 6
├─ src/
│  ├─ app/
│  │  ├─ (shop)/                     # homepage, categories, product, cart, checkout, deals
│  │  ├─ services/                   # hub + [slug] detail (use services-config.js)
│  │  ├─ book/{consultation,personal-shopping,gifting,alterations}/
│  │  ├─ account/                    # bookings, wallet, profiles, rewards, shortlist review
│  │  ├─ admin/{consultation,personal-shopping,gifting,alterations,sourcing,waitlists,deals,settings,roles}/
│  │  └─ api/                        # route handlers, one folder per resource
│  ├─ lib/
│  │  ├─ db.ts            # Prisma client
│  │  ├─ auth.ts          # NextAuth + role/scope
│  │  ├─ permissions.ts   # can(user, 'fees') helpers
│  │  ├─ money.ts         # format + math helpers
│  │  ├─ pricing/         # one pure function per service (unit-tested)
│  │  ├─ state/           # allowed transitions per service
│  │  ├─ payments.ts      # Paystack init + verify + webhook
│  │  ├─ notify.ts        # templates + channels + log
│  │  ├─ promo.ts         # validate + consume
│  │  └─ delivery.ts      # area → fee lookup
│  └─ components/         # Stepper, PriceSummary, PromoBox, StatusBadge, Timeline, DataTable
└─ tests/                 # pricing + state + webhook tests
```

### VS Code setup
- Extensions: ESLint, Prettier, Prisma, Tailwind CSS IntelliSense (optional), Thunder Client (test API calls).
- `.env.local`: `DATABASE_URL`, `DIRECT_URL`, `NEXTAUTH_SECRET`, `NEXTAUTH_URL`, `PAYSTACK_SECRET_KEY`, `PAYSTACK_PUBLIC_KEY`, `SUPABASE_URL`, `SUPABASE_SERVICE_KEY`, `WHATSAPP_TOKEN`, `EMAIL_API_KEY`.
- Put a copy of the mockup you are building in `/design/` so Z ai can read it.

### Brand tokens (put in `globals.css` / Tailwind theme)
`--ink:#1B1917; --stone:#EDE6D8; --olive:#3E4630; --brass:#A8823D; --cream:#F7F3EA; --sage:#6B7A6E; --rust:#8C3B2E; --line:#D9D0C0` · Headings Georgia, body Helvetica/Arial.

---

## 3. Build order (do it in this order)

| Step | Build | Why this order |
|---|---|---|
| 1 | Project, auth, roles, Settings, AuditLog, notify, payments + webhook | Everything depends on these |
| 2 | Shared blocks (section 5): delivery fees, promo/rewards, wallet, price snapshot | Reused by every service |
| 3 | Consultation (33, 51, 43) | Template for all other services |
| 4 | Personal Shopping (10, 52, 53, 50) | Reuses Consultation pieces |
| 5 | Alterations (57, 58) | Simple states, good practice |
| 6 | Outfit Gifting (54, 55, 56) | Largest; uses everything |
| 7 | Deal Reasons (34, 12, 13, 14, 62) | Touches retail pages |
| 8 | Waitlists + Coming Soon (09, 59) | Small, standalone |
| 9 | Premium Sourcing (60, 61) | Ships as Coming Soon first, then launch |
| 10 | Traditional Wear booking | **BLOCKED** until owner answers the OPEN items |

Finish and test each step before starting the next.

---

## 4. Mockup map

| Mockup | Page | Guide section |
|---|---|---|
| 01–03, 06, 35, 36 | Homepage, nav, services hub, categories | Use `services-config.js`, `ServicesHub.jsx`, `ServiceDetail.jsx` |
| 04, 33, 43, 51 | Consultation: page, booking, summary, admin | 7 |
| 05, 10, 50, 52, 53 | Personal Shopping: page, booking, brief guard, shortlist review, admin | 8 |
| 08, 27, 28, 29, 54, 55, 56 | Outfit Gifting + Gift Card | 9 |
| 23, 57, 58 | Alterations | 10 |
| 34, 12, 13, 14, 62 | Deal Reasons (deal page, product, cart, checkout, admin) | 11 |
| 09, 59 | Coming Soon + waitlist + launch admin | 12 |
| 60, 61 | Premium Sourcing | 13 |
| 31, 32 | Wallet, account profiles | 5.4 |
| 24, 18, 19 | Delivery charges, shipping, returns | 5.1 |
| 37, 38, 41, 48, 49 | Admin products, login, orders, SEO, variants | Existing retail admin |
| 39, 44 | Payment flow, service checkout | 5.6 |

---

## 5. Shared building blocks (build once, use everywhere)

### 5.1 Delivery fee lookup
- Table `DeliveryArea(id, name, fee, zone, active)`. Admin edits it.
- `getDeliveryFee(area)` → fee, or `QUOTE` for outside Lagos.
- Used by: Alterations return, Personal Shopping delivery, Gifting delivery, retail checkout.

### 5.2 Price calculation (one pattern, every service)
```
list = sum of current setting prices (server-side)
discount = computed from the one discount allowed on this order (code, reward or staff)
amountDue = max(0, list − discount)
```
- Store a **price snapshot** (`listPrice, discountType, discountValue, discountSource, discountAmount, amountDue, amountPaid`).
- Discount types: `PERCENT | FIXED | FREE | CUSTOM(staff only)`.
- **One discount per order.** (Stacking is OPEN.)
- **Discount scope decided per service:**

| Service | What a discount may touch |
|---|---|
| Consultation | Admin picks per discount (`appliesToAll` true/false) |
| Personal Shopping | Sourcing fee only |
| Outfit Gifting | Styling fee only. Never boxes or items |
| Alterations | Per discount: alterations, service fee, or both |
| Premium Sourcing | Sourcing fee only |
| Referral reward | Consultation only |

### 5.3 Promo codes and rewards
```
PromoCode(code A-Z0-9 4-16, type, value, service, scope, expiresAt, maxUses, usedCount, active)
PromoRedemption(codeId, accountId, orderRef, amountOff)  unique(codeId, accountId)
AccountReward(accountId, ruleId, status AVAILABLE|USED, usedOnRef)
```
- `POST /api/{service}/promo/validate` → returns amountOff, never consumes.
- Errors: `NOT_FOUND, EXPIRED, INACTIVE, USED_UP, ALREADY_USED_BY_YOU, DISCOUNT_ALREADY_APPLIED, NOT_FOR_THIS_SERVICE`.
- Re-validate at pay time. If the total changed, show the new total and ask the customer to confirm.
- Lock the row so the last remaining use cannot be taken twice.

### 5.4 Wallet
- `WalletEntry(accountId, amount (+/−), reason, orderRef, createdAt)`. Balance = sum.
- Credit when staff lower a paid price (setting: WALLET or REFUND), or an order is cancelled per policy.
- Customer can pay (fully or partly) from wallet at checkout. Wallet is deducted in the same transaction as PAID.

### 5.5 Roles and permissions
```
Permission keys: view, assign, confirm, fees, discount, contact, notify, launch, settings, export, roles, orders, reasons, avail
RolePermission(role, permission, allowed)   // owner edits in Admin → Roles & access
```
- On login, put `role` and `scope` (`view_all | view_own`) in the session.
- Every admin handler starts with `requirePermission(user, 'x')` and, for `view_own`, filters `where stylistId = user.id`.
- Roles without `contact` see masked phone/email.

### 5.6 Payments (Paystack)
1. `POST /api/{service}/pay` creates a Paystack transaction with the **server-computed** amount and a unique `reference`.
2. Customer pays on Paystack.
3. `POST /api/webhooks/paystack` verifies the signature, looks up the order by reference, and — if not already processed — moves it to PAID, consumes promo/reward/wallet, creates staff alerts and sends confirmation, **all in one transaction**.
4. Extra payment links (extra hours, extra items, extra boxes, revised alteration quote) use the same flow with their own reference.
5. Amount 0 → skip Paystack, go to PAID.
6. Confirm Paystack's minimum amount before allowing very small totals.

### 5.7 Notifications
Templates keyed by event, e.g. `booking.paid`, `booking.confirmed`, `booking.new_date`, `shortlist.ready`, `gift.preview_ready`, `alteration.quote_revised`, `order.out_for_delivery`, `waitlist.launch`. Each template has WhatsApp + Email text with `{first_name}` style variables. Log every send in `NotificationLog`.

### 5.8 Reminders and timers (cron / Supabase scheduled functions)
Hold expiry (10 min) · reschedule reminders (6h, 24h, alert staff at 48h) · sourcing deadline (3 days) · gift scheduled delivery · gap-list reminders · preview approval reminders.

### 5.9 Booking holds
Create HELD status with `heldUntil`. Unique database constraint stops two active bookings on the same stylist and slot. Hold expiry job releases slots.

---

# SERVICE SECTIONS

Each section: **What it does → Customer steps → States → Tables → Endpoints → Calculations → Edge cases → OPEN → Z ai prompt.**

---

## 7. Wardrobe & Style Consultation (mockups 04, 33, 43, 51)

**What it does:** Customer books a 2-hour styling session (in person or video), pays in full, staff confirm, stylist runs the session, client receives a Wardrobe Map and Gap List.

**Customer steps (33):** pick mode (+ area if in person) → pick date/time slot → goals (why, occasions, frustration) → contact details → promo/reward → pay.

**Rules**
- ₦45,000 first 2 hours, +₦10,000 per started hour, same price everywhere in Lagos.
- Pay in full at booking. No deposit.
- Not confirmed until staff confirm. If the date fails: NEEDS_NEW_DATE with 2–3 offered slots; payment stays valid.
- The person being assessed must attend, even if someone else booked.
- A client who completed a consultation never sees "book another consultation". Route to Personal Shopping / Alterations / retail.

**States**
```
HELD → PAID | EXPIRED
PAID → CONFIRMED | NEEDS_NEW_DATE
NEEDS_NEW_DATE → CONFIRMED
CONFIRMED → NEEDS_NEW_DATE | IN_SESSION | NO_SHOW | CANCELLED
IN_SESSION → COMPLETED → SUMMARY_SENT
```

**Tables:** `ConsultationBooking, RescheduleOffer, BookingEvent, AvailabilityRule, AvailabilityBlock, AuditItem, OutfitPhoto, GapItem, ConsultationSummary` (see section 14).

**Slot rule (`GET /api/consultation/slots`):** offer a slot only if inside a stylist's working day, not blocked, not held/booked (including 60-min buffer after in-person), at least `minNoticeHours` away, and at least one stylist qualifies. Customer sees a time, not a stylist.

**Endpoints**
| Who | Call | Does |
|---|---|---|
| Customer | `POST /api/consultation/hold` | Creates HELD; re-checks slot in a transaction; 409 `SLOT_TAKEN` if gone (no charge) |
| Customer | `POST /api/consultation/promo/validate` | Checks code |
| Customer | `POST /api/consultation/pay` | Starts payment (server amount) |
| System | `POST /api/webhooks/paystack` | HELD→PAID, consume promo/reward, notify |
| Customer | `GET /api/account/bookings/:ref` and `/offers` | Status, timeline, offered slots |
| Customer | `POST …/choose-slot` and `…/suggest` | Pick offered slot, or send own suggestion |
| Customer | `GET /api/account/consultations/:ref/summary` | Only after SUMMARY_SENT, only the owner account |
| Staff | `GET /api/admin/consultation/bookings` | Inbox; stylist sees only own |
| Staff | `PATCH …/:id/assign` | Set stylist; reject clash |
| Staff | `POST …/confirm`, `…/new-date`, `…/start`, `…/finish`, `…/send-summary` | State moves |
| Staff | `POST …/audit`, `…/outfits`, `…/gaps` | Add session rows |
| Staff | `POST …/extra-time/bill` | `extraHours = ceil((elapsed − 120)/60)`; payment link for `extraHours × 10,000` |
| Staff | `POST …/return-visit` | DROP_OFF 22,500 or WITH_FITTING 45,000 |
| Staff | `POST …/personal-shopping-brief` | Creates Personal Shopping request from gap list |
| Staff | `POST …/discount`, `GET/PUT …/fees`, promo CRUD | Needs `discount` / `fees` |

**Finish rule:** `finish` needs ≥1 audit item, ≥1 outfit photo, ≥1 gap item.

**Edge cases:** code expires during payment → re-validate; free booking still needs staff confirmation; date change keeps discount; hold expiry releases slot; stylist ill → NEEDS_NEW_DATE.

**OPEN:** wallet vs refund after staff discount · stacking · front-desk discount limit · reward returned on cancellation · no-show / cancellation policy.

**Z ai prompt**
> Build the Consultation service in Next.js + Prisma following section 1, 5 and 7 of the guide and the attached mockups 33 and 51. Start with: (1) Prisma models, (2) `lib/pricing/consultation.ts` as a pure function with unit tests for percent/fixed/free/custom discounts and extra hours, (3) `lib/state/consultation.ts` with the allowed transitions, (4) the slot availability endpoint, (5) hold/pay/webhook. Then the booking pages, then the admin pages. Never accept an amount from the browser.

---

## 8. Personal Shopping (mockups 05, 10, 50, 52, 53)

**What it does:** Customer fills a brief, pays a sourcing fee upfront, staff source items, customer approves a shortlist, pays for approved items, items are delivered or fitted in person.

**Customer steps (10):** tier (Delivered / In-Person Fitting) → brief (budget, sizes, occasions, brands, colours) → delivery/fitting details → promo → pay sourcing fee.
**Brief guard (50):** if the brief names a brand the shop does not stock, show the notice and offer the Premium Sourcing waitlist. Never promise.

**Rules**
- Delivered from ₦45,000; In-Person Fitting from ₦50,000 (60 min included, +₦5,000 per extra 30 min).
- Sourcing fee upfront; items paid after the customer approves.
- Sourcing takes 24–48h, **max 3 days**. The clock only starts when the brief is complete; show this time upfront at booking.
- Earliest fitting 48h after booking.
- Discount applies to the **sourcing fee only**.
- Items are delivered in custom shopping bags at no extra cost.

**States**
```
NEW → SOURCING → SHORTLIST_SENT → APPROVED → ITEMS_PAID → IN_PROGRESS → COMPLETED
```
(`SOURCING` has a visible deadline timer; if the brief is incomplete the status shows "Waiting for you" and the clock pauses.)

**Tables:** `ShoppingRequest, ShoppingBrief, ShortlistItem(name, price, imageUrl, status PROPOSED|APPROVED|DECLINED), ShoppingPayment, FittingSlot`.

**Endpoints**
| Who | Call | Does |
|---|---|---|
| Customer | `POST /api/shopping/request` · `/pay` | Create, pay sourcing fee |
| Customer | `GET /api/account/shopping/:ref/shortlist` | See shortlist (mockup 52) |
| Customer | `POST …/shortlist/approve` | Approve some/all items; creates item payment total |
| Customer | `POST …/pay-items` | Pay for approved items |
| Staff | `GET /api/admin/shopping` | Inbox with deadline countdown |
| Staff | `POST …/shortlist` | Add items; `POST …/send-shortlist` |
| Staff | `POST …/extra-items` | Add items later; sends a new payment link |
| Staff | `POST …/book-for-customer` | Staff create a request from the customer's info |
| Staff | `POST …/complete` | IN_PROGRESS→COMPLETED |

**Payment options (admin toggles in Settings):** full payment, per-item payment, extra payment links for items added or unpaid, staff-created booking. Admin decides which are on.

**Edge cases:** item sold out after approval → staff swap and message; customer declines all → close with sourcing fee kept (OPEN); brief changed after sourcing started → restart clock; overdue sourcing → alert owner at 48h, escalate at 72h.

**OPEN:** how long a shortlist is held · in-person payment method · is the sourcing fee refundable · coverage areas · COD for items · wallet vs refund.

**Z ai prompt**
> Build Personal Shopping per sections 1, 5 and 8 and mockups 10, 52, 53, 50. Reuse the pricing, promo and payment libs from the Consultation step. Build the sourcing deadline timer as a computed field plus a scheduled job. Shortlist approval must produce a server-computed item total.

---

## 9. Outfit Gifting and Gift Card (mockups 08, 27–29, 54, 55, 56)

**What it does:** Two paths. **Styled by Us:** buyer fills a brief for the recipient, we style and pack a gift box, buyer approves a preview, delivery. **Gift Card:** buyer pays a value, recipient shops with it.

**Customer steps (54):** path → recipient (sizes, or ask someone close), occasion, budget → message card and gift note → delivery date, surprise handling, address → box size → promo (styling fee only) → pay everything upfront.

**Rules**
- Styling fee ₦40,000 includes the first Small or Medium box. Large first box +₦10,000. Extra boxes S 10k / M 20k / L 30k.
- Everything paid upfront (styling fee + items + boxes + delivery).
- Buyer approves a preview (55) before packing; changes allowed.
- Recipient gets an exchange link.
- **Discount applies to the styling fee only**, never boxes or items.
- Gift Card minimum ₦100,000, no maximum. Paid upfront before the recipient is notified.

**States**
```
Styled:    PAID_NEW → STYLING → PREVIEW_SENT → (CHANGES → PREVIEW_SENT) → APPROVED_PACKING → OUT → DELIVERED
Gift Card: PAID → NOTIFIED → RECIPIENT_SHOPPING → DONE
```

**Tables:** `GiftOrder, GiftRecipient, GiftItem, GiftPreview(versions), GiftBox, GiftCard(code, balance, expiresAt), GiftCardUse, ExchangeLink`.

**Endpoints**
| Who | Call | Does |
|---|---|---|
| Customer | `POST /api/gifting/order` · `/pay` | Create, pay |
| Customer | `GET /api/account/gifts/:ref/preview` · `POST …/approve` · `POST …/request-changes` | Mockup 55 |
| Recipient | `GET /api/gift-exchange/:token` | Exchange page; token expires |
| Staff | `GET /api/admin/gifting`, `POST …/items`, `…/send-preview`, `…/pack`, `…/out`, `…/delivered` | Mockup 56 |
| System | Gift card: create code on PAID, notify recipient at scheduled time, balance deducted on use |

**Edge cases:** scheduled delivery date vs lead time (OPEN); surprise = do not message recipient before delivery; items over budget → block `send-preview` until within budget or buyer pays the difference; gift card used partly → keep balance; wrong recipient email → resend with edit.

**OPEN:** minimum budget · lead time · preview approval window (what if buyer is silent) · gift card expiry.

**Z ai prompt**
> Build Outfit Gifting per sections 1, 5 and 9 and mockups 54, 55, 56. Two flows share one `GiftOrder` table with a `path` field. Pricing must treat box fees and items as non-discountable. Preview approval is versioned: every revision creates a new `GiftPreview` row.

---

## 10. Amendments & Alterations (mockups 23, 57, 58)

**What it does:** Customer lists garments and alterations, pays an estimate, drops off or books pickup, staff inspect and may revise the quote (customer approves), tailor works, item is returned.

**Customer steps (57):** garments + alterations (from price list) → pick-up or drop-off → address → turnaround shown upfront → promo → pay.

**Rules**
- ₦20,000 mandatory service & handling fee on every order + item prices (section 1).
- Return delivery uses the area table and is **included in the ₦20,000 inside coverage**.
- Staff message the customer with a revised quote after inspection; **work waits for approval**.
- Re-fit/redo window after return.
- Promo codes and staff discounts allowed. Per discount: alterations, service fee, or both.
- Staff or customer can make a booking on behalf of someone using their information.
- Extra payment link for extra work found at inspection.

**States**
```
BOOKED → RECEIVED → (AWAITING_APPROVAL) → IN_ALTERATION → READY → RETURNED
RETURNED → REDO → IN_ALTERATION
```

**Tables:** `AlterationOrder, AlterationLine(garment, serviceId, price), AlterationService(name, price, active), QuoteRevision(amount, reason, status), PickupJob, RedoRequest`.

**Endpoints:** customer `POST /api/alterations/order`, `/pay`, `GET …/:ref`, `POST …/quote/approve|decline`, `POST …/redo`; staff `POST …/received`, `…/revise-quote`, `…/start`, `…/ready`, `…/return`, `…/extra-payment-link`, `…/discount`; settings `GET/PUT /api/admin/alterations/services` (add/rename/reprice items).

**Edge cases:** quote declined → return garment, keep ₦20,000 fee? (OPEN); outside coverage → quote the return fee; same garment listed twice → merge; item price changed later → old orders keep snapshot.

**OPEN:** turnaround days · redo window length · studio address · declined-quote fee policy.

**Z ai prompt**
> Build Alterations per sections 1, 5 and 10 and mockups 57, 58. The services price list must be database-driven (admin can edit). Quote revision is its own table with a status. Block `start` while a revision is AWAITING_APPROVAL.

---

## 11. Deal Reasons (mockups 34, 12, 13, 14, 62)

**What it does:** Every sale item can show *why* it is on sale (old stock, older design, discontinued, minor flaw, final piece) on the deal page card, product page, cart/checkout and order confirmation/invoice.

**Rules**
- Reason list is managed by the owner. Two types: **INFO** and **FLAW**.
- **FLAW** items need a note (≥15 chars, where and what), a photo (setting, default on), and a **buyer tick box before add-to-cart**. Server rejects add-to-cart or checkout without `dealAccepted`.
- Each reason has a **return rule**: `STANDARD` (48h/24h exchange), `FLAW_DISCLOSED` (wrong size/item still exchanged; disclosed flaw is not a defect), `FINAL_SALE` (no exchange).
- Rule: FLAW cannot use STANDARD; INFO cannot use FLAW_DISCLOSED.
- With "require reason" on, a sale price cannot be published without an active reason.
- A reason switched off while items still use it: items flagged "Reason switched off", cannot publish.
- Each order line stores a **snapshot** of the reason, note, photo and acceptance. Later edits never change old orders.

**Tables:** `DealReason, ProductDeal, DealSettings, OrderLineDealSnapshot`.

**Endpoints:** public `GET /products/:slug` and `/deals` include `deal{}`; `POST /cart/items` and `/checkout` take `dealAccepted`. Admin `GET/PUT /admin/deal-reasons`, `PUT /admin/products/:id/deal`, `PUT /admin/deal-settings`.

**Edge cases:** mixed cart → acceptance per flaw line; note changed after buyer saved cart → re-require acceptance; item off sale → hide reason but keep; staff exchange screen shows "Disclosed at purchase".

**OPEN:** final reason wording · hidden damage exchange · mandatory flaw photos · stronger final-sale tick · reasons in marketing messages.

**Z ai prompt**
> Add Deal Reasons per section 11. Modify the product, cart and checkout components from mockups 12, 13, 14, 34 to show the reason badge, note and photo. Add server validation for `dealAccepted`. Write the order-line snapshot on checkout.

---

## 12. Coming Soon services and Waitlists (mockups 09, 59)

**What it does:** Traditional Wear Consultation (and Digital Closet, Premium Sourcing) show a Coming Soon page with a working **Notify Me** form. Admin sees waitlists, checks a launch checklist, flips the service live and sends a one-time launch message.

**Rules**
- Fields: name, phone or email, optional interest/occasion, **required consent tick**. No price shown.
- One entry per contact per service; resubmitting updates it.
- Only consented people are messaged. Opt-outs are permanent.
- Launch toggle is locked until the checklist is complete (fee set, session format set, availability set, booking flow tested, staff briefed, launch message approved).
- Launch message sent once, only when LIVE, must include `{first_name}` and the opt-out line.
- Delete entry = permanent erase.
- Fee, included time, extra-hour fee, session format, book-for-others rule and pre-session brief are settings with **no defaults** and never shown before launch.

**Tables:** `WaitlistEntry, ServiceLaunch, ServiceSettings(nullable fields), NotificationLog, AuditLog`.

**Endpoints:** `POST /waitlist/:service`, `GET /waitlist/optout/:token`; admin `GET /admin/waitlists`, `POST …/:id/contacted|optout`, `DELETE …/:id`, `GET …/export.csv`, `PUT /admin/services/:service/settings|checklist`, `POST …/launch`, `POST …/notify`.

**On launch:** owner fills settings and ticks checklist → toggles LIVE (Coming Soon page becomes the booking page) → sends launch message → entries become NOTIFIED → matching bookers become BOOKED.

**Traditional Wear booking and admin flow: NOT BUILT.** Blocked on: fee, included hours, extra-hour fee, session format, book-for-others rule, pre-session brief. Build it by copying the Consultation module once these are answered.

**Z ai prompt**
> Build the waitlist and launch module per section 12 and mockups 09, 59. One generic module serving three services via a `service` enum. The launch toggle must be rejected by the server unless the checklist is complete.

---

## 13. Premium Sourcing (mockups 60, 61)

**Status:** Coming Soon first (use section 12). The flow below is built when the owner launches it.

**What it does:** Customer requests a specific premium item. Staff check availability **before** payment, send a quote, customer pays to reserve, staff source, deliver.

**Rules**
- No 100% guarantee; availability checked before payment; pay ahead to reserve.
- Discount applies to the **sourcing fee only**.
- Fee, pay-ahead rule, quote validity, refund rule: **OPEN settings, no defaults**.

**States**
```
NEW → CHECKING → NOT_AVAILABLE | QUOTED
QUOTED → PAID → SOURCING → SECURED → ARRIVED → OUT → DELIVERED
SOURCING → COULD_NOT_SECURE (refund per OPEN rule)
```

**Tables:** `SourcingRequest, SourcingQuote(itemPrice, sourcingFee, delivery, validUntil), SourcingEvent`.

**Endpoints:** customer `POST /api/sourcing/request`, `GET …/:ref`, `POST …/quote/accept`, `/pay`; staff `POST …/check`, `…/quote`, `…/not-available`, `…/secured`, `…/arrived`, `…/out`, `…/delivered`, `…/could-not-secure`.

**Edge cases:** quote expires → customer must re-request; item price rises before payment → new quote; could-not-secure → wallet or refund; special-order returns (OPEN).

**Z ai prompt**
> Build Premium Sourcing per section 13 and mockups 60, 61. Keep it behind the `ServiceLaunch` flag. Quote has a `validUntil` and cannot be paid after it. Payment is blocked unless status is QUOTED.

---

# REFERENCE

## 14. Draft Prisma schema (starting point; Z ai may refine field names)

```prisma
// ---------- shared ----------
enum Role {
  OWNER
  FRONT_DESK
  STYLIST
  MERCHANDISER
}
enum Service {
  CONSULTATION
  SHOPPING
  GIFTING
  ALTERATIONS
  SOURCING
  TRADITIONAL_WEAR
  DIGITAL_CLOSET
}

model User {
  id String @id @default(cuid())
  email String @unique
  name String
  phone String?
  role Role?           // null = customer
  scope String @default("view_own")   // view_all | view_own
  createdAt DateTime @default(now())
}
model RolePermission {
  id String @id @default(cuid())
  role Role
  permission String
  allowed Boolean
  @@unique([role, permission])
}
model Setting { // every fee/time/policy
  key String @id
  value String
  updatedBy String?
  updatedAt DateTime @updatedAt
}
model DeliveryArea {
  id String @id @default(cuid())
  name String @unique
  fee Int
  zone String
  active Boolean @default(true)
}
model StatusEvent {
  id String @id @default(cuid())
  service Service
  orderRef String
  actorId String?
  actorType String
  fromStatus String?
  toStatus String
  note String?
  createdAt DateTime @default(now())
  @@index([orderRef])
}
model AuditLog {
  id String @id @default(cuid())
  actorId String
  action String
  before Json?
  after Json?
  createdAt DateTime @default(now())
}
model Payment { // SERVICE|EXTRA|ITEMS|WALLET
  id String @id @default(cuid())
  reference String @unique
  service Service
  orderRef String
  amount Int
  status String
  processedAt DateTime?
  purpose String
}
model PriceSnapshot {
  id String @id @default(cuid())
  orderRef String @unique
  listPrice Int
  discountType String?
  discountValue Int?
  discountSource String?
  discountLabel String?
  discountAmount Int @default(0)
  amountDue Int
  amountPaid Int @default(0)
  staffReason String?
  appliedBy String?
}
model PromoCode {
  id String @id @default(cuid())
  code String @unique
  type String
  value Int
  service Service?
  scope String
  expiresAt DateTime?
  maxUses Int?
  usedCount Int @default(0)
  active Boolean @default(true)
}
model PromoRedemption {
  id String @id @default(cuid())
  codeId String
  accountId String
  orderRef String
  amountOff Int
  @@unique([codeId, accountId])
}
model AccountReward {
  id String @id @default(cuid())
  accountId String
  ruleId String
  status String
  usedOnRef String?
  earnedAt DateTime @default(now())
}
model WalletEntry {
  id String @id @default(cuid())
  accountId String
  amount Int
  reason String
  orderRef String?
  createdAt DateTime @default(now())
}
model NotificationLog {
  id String @id @default(cuid())
  recipient String
  channel String
  template String
  status String
  sentAt DateTime @default(now())
}
model ManagedProfile { // "book for someone else"
  id String @id @default(cuid())
  ownerId String
  name String
  sizes Json?
  notes String?
}

// ---------- consultation ----------
model ConsultationBooking {
  id String @id @default(cuid()) ref String @unique status String
  accountId String profileId String? mode String area String?
  slotStart DateTime slotEnd DateTime stylistId String?
  goalWhy String? goalOccasions String? goalFrustration String?
  contactName String contactPhone String contactVia String
  heldUntil DateTime? startedAt DateTime? endedAt DateTime? elapsedMinutes Int @default(0)
  extraHours Int @default(0) extraAmount Int @default(0)
  rescheduleReason String? createdAt DateTime @default(now())
  @@index([stylistId, slotStart, status])
}
model RescheduleOffer {
  id String @id @default(cuid())
  bookingId String
  slotStart DateTime
  slotEnd DateTime
  offeredBy String
  chosenAt DateTime?
  expiresAt DateTime
}
model AvailabilityRule {
  id String @id @default(cuid())
  stylistId String
  weekday Int
  startTimes String[]
  modes String[]
  active Boolean @default(true)
}
model AvailabilityBlock {
  id String @id @default(cuid())
  stylistId String?
  slotStart DateTime
  reason String
  createdBy String
}
model AuditItem {
  id String @id @default(cuid())
  bookingId String
  name String
  category String
  action String
  note String?
}
model OutfitPhoto {
  id String @id @default(cuid())
  bookingId String
  number Int
  occasion String
  imageUrl String
}
model GapItem {
  id String @id @default(cuid())
  bookingId String
  name String
  priority String
}
model ConsultationSummary {
  id String @id @default(cuid())
  bookingId String @unique
  styleDirection String
  palette String
  silhouette String
  publishedAt DateTime?
}

// ---------- personal shopping ----------
model ShoppingRequest {
  id String @id @default(cuid())
  ref String @unique
  status String
  tier String
  accountId String
  brief Json
  briefComplete Boolean @default(false)
  sourcingStartedAt DateTime?
  sourcingDueAt DateTime?
  fittingAt DateTime?
  area String?
  createdAt DateTime @default(now())
}
model ShortlistItem {
  id String @id @default(cuid())
  requestId String
  name String
  price Int
  imageUrl String?
  status String
}

// ---------- gifting ----------
model GiftOrder {
  id String @id @default(cuid())
  ref String @unique
  status String
  path String
  buyerId String
  recipientName String
  recipientContact String?
  recipientSizes Json?
  occasion String?
  budget Int?
  message String?
  deliverOn DateTime?
  surprise Boolean @default(false)
  area String?
  boxSize String?
  extraBoxes Json?
}
model GiftPreview {
  id String @id @default(cuid())
  orderId String
  version Int
  items Json
  total Int
  status String
  sentAt DateTime?
  decidedAt DateTime?
  note String?
}
model GiftCard {
  id String @id @default(cuid())
  code String @unique
  buyerId String
  recipientContact String
  value Int
  balance Int
  expiresAt DateTime?
  notifyOn DateTime?
  status String
}

// ---------- alterations ----------
model AlterationService {
  id String @id @default(cuid())
  name String
  price Int
  active Boolean @default(true)
}
model AlterationOrder {
  id String @id @default(cuid())
  ref String @unique
  status String
  accountId String
  handlingFee Int
  method String
  area String?
  returnFee Int @default(0)
  redoUntil DateTime?
}
model AlterationLine {
  id String @id @default(cuid())
  orderId String
  garment String
  serviceId String
  price Int
}
model QuoteRevision {
  id String @id @default(cuid())
  orderId String
  amount Int
  reason String
  status String
  createdAt DateTime @default(now())
}

// ---------- deal reasons ----------
model DealReason {
  id String @id @default(cuid())
  label String @unique
  type String
  returnRule String
  defaultText String
  active Boolean @default(true)
}
model ProductDeal {
  productId String @id
  reasonId String
  note String?
  flawPhotoUrl String?
  updatedBy String
  updatedAt DateTime @updatedAt
}
model OrderLineDealSnapshot {
  orderLineId String @id
  reasonLabel String
  reasonType String
  returnRule String
  noteShown String?
  flawPhotoUrl String?
  acceptedByBuyer Boolean
  acceptedAt DateTime?
}

// ---------- waitlist / launch / sourcing ----------
model WaitlistEntry {
  id String @id @default(cuid())
  service Service
  name String
  contact String
  channel String
  interest String[]
  occasion String?
  source String
  status String
  consentAt DateTime
  consentText String
  optedOutAt DateTime?
  accountId String?
  createdAt DateTime @default(now())
  @@unique([service, contact])
}
model ServiceLaunch {
  service Service @id
  state String @default("COMING_SOON")
  checklist Json
  liveAt DateTime?
  liveBy String?
  launchMessage String?
  messageSentAt DateTime?
  sentCount Int @default(0)
}
model SourcingRequest {
  id String @id @default(cuid())
  ref String @unique
  status String
  accountId String
  itemBrief Json
}
model SourcingQuote {
  id String @id @default(cuid())
  requestId String
  itemPrice Int
  sourcingFee Int
  delivery Int
  validUntil DateTime
}
```

> Run `npx prisma format` then `npx prisma validate` after pasting. Add relations (`@relation`) between tables as you build each service.

---

## 15. Master prompt for Z ai (paste at the start of every session)

> You are helping build the Wardrobecare website: Next.js (App Router, TypeScript), Prisma on Supabase Postgres, NextAuth, Paystack, Tailwind. I will give you the developer guide (`WARDROBECARE-DEVELOPER-BUILD-GUIDE.md`) and one or two HTML mockups at a time. Rules you must follow:
> 1. Match the mockup layout and the brand tokens in section 2. Use flexbox, not decorative extras.
> 2. All money is integer naira. All fees, times and policies come from the `Setting` table or the relevant table — never hard-code them.
> 3. Prices, discounts, permissions and state changes are decided on the server. Never trust a client amount.
> 4. Use the state machines in the guide exactly. Reject any other transition and log a `StatusEvent`.
> 5. Consume promo codes/rewards only inside the payment-success transaction. Webhooks are idempotent by reference.
> 6. For anything marked OPEN, build a setting with no default. Do not invent values.
> 7. Work in this order for each service: Prisma models → pure pricing function with unit tests → state transitions → API routes with Zod validation → customer pages → admin pages → notifications → tests.
> 8. After each step, list the files you created and what to test.

**Per-service prompt template**
> Service: `<name>`. Read sections 1, 5 and `<service section>` of the guide, plus mockups `<numbers>`. Build step `<n>` only. Do not touch other services. When done, give me the test checklist.

---

## 16. Test checklist (per service)

- [ ] Price: list, each discount type, zero total, discount scope (e.g. gifting discount never touches boxes), rounding.
- [ ] A tampered amount from the browser is ignored.
- [ ] Every allowed state move works; every other move is rejected; each writes a `StatusEvent`.
- [ ] Payment webhook sent twice → processed once.
- [ ] Promo consumed only on success; failed or expired payment leaves it unused; last use cannot be double-taken.
- [ ] Stylist with `view_own` cannot read or edit another stylist's items by changing an ID in the URL.
- [ ] Role without the permission gets 403 on the matching admin call.
- [ ] Price changed in Settings → old orders unchanged, new orders updated.
- [ ] Notification sent and logged for each template; failure shows "Needs attention".
- [ ] Hold expiry releases the slot; two people cannot book the same slot.
- [ ] Mobile layout for every customer page.
- [ ] Deal Reasons: flaw item cannot be added to cart or checked out without acceptance.
- [ ] Waitlist: no consent = rejected; opt-out excluded from messages and export; launch blocked until checklist complete.

---

## 17. OPEN decisions (owner to answer; build as empty settings)

| Service | Decision |
|---|---|
| All services | Wallet credit or refund after staff discount or cancellation · can two discounts stack · front-desk discount limit |
| Consultation | No-show and cancellation policy · reward returned if booking cancelled |
| Personal Shopping | How long a shortlist is held · in-person payment method · is the sourcing fee refundable · coverage areas · COD for items |
| Outfit Gifting | Minimum budget · lead time · preview approval window · gift card expiry |
| Alterations | Turnaround days · redo window · studio address · fee if quote declined |
| Premium Sourcing | Sourcing fee · pay-ahead amount · quote validity · refund rule · special-order returns · launch date |
| Traditional Wear | Fee · included hours · extra-hour fee · session format · book-for-others rule · pre-session brief · early access offer |
| Deal Reasons | Final reason wording · hidden-damage exchange · mandatory flaw photo · stronger final-sale tick · use in marketing |
| Waitlists | How long unanswered entries are kept |

---

## 18. Files the developer already has

`services-config.js`, `ServicesHub.jsx`, `ServiceDetail.jsx`, `WardrobecareHomepage.jsx` (Next.js components for the hub, detail and homepage) · `00-INDEX.html` (open this to browse all mockups) · the seven `*-BACKEND-WORKFLOW.md` files (deeper edge cases and endpoint lists per service) · `CHATBOT-KNOWLEDGE-SPEC.md` and `CHATBOT-RETAIL-SHOPPING-SPEC.md` (chatbot, later phase).

*Do not reference the Marketplace/Hub concept anywhere in the site (confidentiality).*
