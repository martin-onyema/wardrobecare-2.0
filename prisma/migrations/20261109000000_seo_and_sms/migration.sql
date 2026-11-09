-- AlterTable
ALTER TABLE "Category" ADD COLUMN     "inSitemap" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "noindex" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "seoH1" TEXT,
ADD COLUMN     "seoIntroText" TEXT,
ADD COLUMN     "seoOgImage" TEXT;

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "inSitemap" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "noindex" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "seoH1" TEXT;

-- CreateTable
CREATE TABLE "SmsLog" (
    "id" TEXT NOT NULL,
    "reason" TEXT NOT NULL,
    "orderId" TEXT,
    "recipient" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "ok" BOOLEAN NOT NULL DEFAULT false,
    "error" TEXT,
    "providerResponse" TEXT,
    "recipientSource" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SmsLog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SeoOverride" (
    "id" TEXT NOT NULL,
    "route" TEXT NOT NULL,
    "contentType" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "seoTitle" TEXT,
    "seoDescription" TEXT,
    "h1" TEXT,
    "introText" TEXT,
    "ogImage" TEXT,
    "noindex" BOOLEAN NOT NULL DEFAULT false,
    "inSitemap" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SeoOverride_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Redirect" (
    "id" TEXT NOT NULL,
    "fromPath" TEXT NOT NULL,
    "toPath" TEXT NOT NULL,
    "statusCode" INTEGER NOT NULL DEFAULT 308,
    "note" TEXT,
    "createdById" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Redirect_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SeoTemplate" (
    "id" TEXT NOT NULL,
    "contentType" TEXT NOT NULL,
    "titleTemplate" TEXT,
    "descriptionTemplate" TEXT,
    "introTemplate" TEXT,
    "altTemplate" TEXT,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SeoTemplate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SeoAuditLog" (
    "id" TEXT NOT NULL,
    "entityType" TEXT NOT NULL,
    "entityId" TEXT NOT NULL,
    "fieldName" TEXT NOT NULL,
    "oldValue" TEXT,
    "newValue" TEXT,
    "changedById" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SeoAuditLog_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "SmsLog_createdAt_idx" ON "SmsLog"("createdAt");

-- CreateIndex
CREATE INDEX "SmsLog_ok_idx" ON "SmsLog"("ok");

-- CreateIndex
CREATE INDEX "SmsLog_reason_idx" ON "SmsLog"("reason");

-- CreateIndex
CREATE INDEX "SmsLog_orderId_idx" ON "SmsLog"("orderId");

-- CreateIndex
CREATE UNIQUE INDEX "SeoOverride_route_key" ON "SeoOverride"("route");

-- CreateIndex
CREATE INDEX "SeoOverride_contentType_idx" ON "SeoOverride"("contentType");

-- CreateIndex
CREATE INDEX "SeoOverride_noindex_idx" ON "SeoOverride"("noindex");

-- CreateIndex
CREATE INDEX "SeoOverride_inSitemap_idx" ON "SeoOverride"("inSitemap");

-- CreateIndex
CREATE UNIQUE INDEX "Redirect_fromPath_key" ON "Redirect"("fromPath");

-- CreateIndex
CREATE INDEX "Redirect_fromPath_idx" ON "Redirect"("fromPath");

-- CreateIndex
CREATE INDEX "Redirect_toPath_idx" ON "Redirect"("toPath");

-- CreateIndex
CREATE UNIQUE INDEX "SeoTemplate_contentType_key" ON "SeoTemplate"("contentType");

-- CreateIndex
CREATE INDEX "SeoAuditLog_entityType_entityId_idx" ON "SeoAuditLog"("entityType", "entityId");

-- CreateIndex
CREATE INDEX "SeoAuditLog_changedById_idx" ON "SeoAuditLog"("changedById");

-- CreateIndex
CREATE INDEX "SeoAuditLog_createdAt_idx" ON "SeoAuditLog"("createdAt");

-- AddForeignKey
ALTER TABLE "SmsLog" ADD CONSTRAINT "SmsLog_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Redirect" ADD CONSTRAINT "Redirect_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SeoAuditLog" ADD CONSTRAINT "SeoAuditLog_changedById_fkey" FOREIGN KEY ("changedById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
