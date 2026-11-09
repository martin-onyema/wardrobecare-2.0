module.exports=[463021,(a,b,c)=>{b.exports=a.x("@prisma/client-2c3a283f134fdcb6",()=>require("@prisma/client-2c3a283f134fdcb6"))},761469,a=>{"use strict";var b=a.i(463021);let c=globalThis.prisma??new b.PrismaClient({log:["error"],datasources:process.env.DATABASE_URL?{db:{url:process.env.DATABASE_URL}}:void 0});a.s(["db",0,c])},254799,(a,b,c)=>{b.exports=a.x("crypto",()=>require("crypto"))},792509,(a,b,c)=>{b.exports=a.x("url",()=>require("url"))},921517,(a,b,c)=>{b.exports=a.x("http",()=>require("http"))},406461,(a,b,c)=>{b.exports=a.x("zlib",()=>require("zlib"))},524836,(a,b,c)=>{b.exports=a.x("https",()=>require("https"))},427699,(a,b,c)=>{b.exports=a.x("events",()=>require("events"))},449719,(a,b,c)=>{b.exports=a.x("assert",()=>require("assert"))},145706,(a,b,c)=>{b.exports=a.x("querystring",()=>require("querystring"))},500874,(a,b,c)=>{b.exports=a.x("buffer",()=>require("buffer"))},575096,a=>{a.v({name:"openid-client",version:"5.7.1",description:"OpenID Connect Relying Party (RP, Client) implementation for Node.js runtime, supports passportjs",keywords:["auth","authentication","basic","certified","client","connect","dynamic","electron","hybrid","identity","implicit","oauth","oauth2","oidc","openid","passport","relying party","strategy"],homepage:"https://github.com/panva/openid-client",repository:"panva/openid-client",funding:{url:"https://github.com/sponsors/panva"},license:"MIT",author:"Filip Skokan <panva.ip@gmail.com>",exports:{types:"./types/index.d.ts",import:"./lib/index.mjs",require:"./lib/index.js"},main:"./lib/index.js",types:"./types/index.d.ts",files:["lib","types/index.d.ts"],scripts:{format:"npx prettier --loglevel silent --write ./lib ./test ./certification ./types",test:"mocha test/**/*.test.js"},dependencies:{jose:"^4.15.9","lru-cache":"^6.0.0","object-hash":"^2.2.0","oidc-token-hash":"^5.0.3"},devDependencies:{"@types/node":"^16.18.106","@types/passport":"^1.0.16",base64url:"^3.0.1",chai:"^4.5.0",mocha:"^10.7.3",nock:"^13.5.5",prettier:"^2.8.8","readable-mock-req":"^0.2.2",sinon:"^9.2.4",timekeeper:"^2.3.1"},"standard-version":{scripts:{postchangelog:"sed -i '' -e 's/### \\[/## [/g' CHANGELOG.md"},types:[{type:"feat",section:"Features"},{type:"fix",section:"Fixes"},{type:"chore",hidden:!0},{type:"docs",hidden:!0},{type:"style",hidden:!0},{type:"refactor",section:"Refactor",hidden:!1},{type:"perf",section:"Performance",hidden:!1},{type:"test",hidden:!0}]}})},182241,a=>{"use strict";var b=a.i(20971),c=a.i(109307);a.i(570396);var d=a.i(673727),e=a.i(761469);async function f(){return(0,b.getServerSession)(c.authOptions)}async function g(){let a=await f();return a?.user||(0,d.redirect)("/account/login?callbackUrl="+encodeURIComponent("/account")),a.user}let h=(0,a.i(800717).cache)(async()=>{let a=await f();if(!a?.user)return null;let b=a.user;if(!b.id)return null;let c=await e.db.user.findUnique({where:{id:b.id}});return c&&"CUSTOMER"!==c.role&&c.active?c:null});async function i(){let a=await h();return a||(0,d.redirect)("/admin/login"),a}a.s(["getCurrentStaffUser",0,h,"getSession",()=>f,"requireAdmin",()=>i,"requireUser",()=>g])},451569,a=>{"use strict";a.i(570396);var b=a.i(673727),c=a.i(182241);let d=[{code:"product.create",name:"Create products",roles:["ADMIN","MANAGER","INVENTORY_MANAGER","CONTENT_MANAGER"]},{code:"product.update",name:"Edit products",roles:["ADMIN","MANAGER","INVENTORY_MANAGER","CONTENT_MANAGER"]},{code:"product.delete",name:"Delete products",roles:["ADMIN","MANAGER"]},{code:"product.publish",name:"Publish/unpublish products",roles:["ADMIN","MANAGER","CONTENT_MANAGER"]},{code:"category.manage",name:"Manage categories",roles:["ADMIN","MANAGER","CONTENT_MANAGER"]},{code:"brand.manage",name:"Manage brands",roles:["ADMIN","MANAGER","CONTENT_MANAGER"]},{code:"attribute.manage",name:"Manage attributes",roles:["ADMIN","MANAGER","CONTENT_MANAGER"]},{code:"inventory.view",name:"View inventory",roles:["ADMIN","MANAGER","INVENTORY_MANAGER","SALES"]},{code:"inventory.adjust",name:"Adjust stock",roles:["ADMIN","MANAGER","INVENTORY_MANAGER"]},{code:"order.view",name:"View orders",roles:["ADMIN","MANAGER","SALES","CUSTOMER_SUPPORT","INVENTORY_MANAGER"]},{code:"order.update_status",name:"Update order status",roles:["ADMIN","MANAGER","SALES","CUSTOMER_SUPPORT"]},{code:"order.cancel",name:"Cancel orders",roles:["ADMIN","MANAGER","CUSTOMER_SUPPORT"]},{code:"order.refund",name:"Refund orders",roles:["ADMIN","MANAGER"]},{code:"order.update_tracking",name:"Update tracking",roles:["ADMIN","MANAGER","SALES","CUSTOMER_SUPPORT"]},{code:"customer.view",name:"View customers",roles:["ADMIN","MANAGER","SALES","CUSTOMER_SUPPORT"]},{code:"customer.update",name:"Edit customers",roles:["ADMIN","MANAGER","CUSTOMER_SUPPORT"]},{code:"customer.disable",name:"Disable customers",roles:["ADMIN","MANAGER"]},{code:"customer.note",name:"Add customer notes",roles:["ADMIN","MANAGER","SALES","CUSTOMER_SUPPORT"]},{code:"service.enquiry.view",name:"View service enquiries",roles:["ADMIN","MANAGER","SALES","CUSTOMER_SUPPORT"]},{code:"service.enquiry.manage",name:"Manage service enquiries",roles:["ADMIN","MANAGER","CUSTOMER_SUPPORT"]},{code:"coupon.manage",name:"Manage coupons",roles:["ADMIN","MANAGER"]},{code:"campaign.manage",name:"Manage campaigns",roles:["ADMIN","MANAGER"]},{code:"banner.manage",name:"Manage banners",roles:["ADMIN","MANAGER","CONTENT_MANAGER"]},{code:"faq.manage",name:"Manage FAQs",roles:["ADMIN","MANAGER","CONTENT_MANAGER"]},{code:"review.moderate",name:"Moderate reviews",roles:["ADMIN","MANAGER","CONTENT_MANAGER","CUSTOMER_SUPPORT"]},{code:"shipping.manage",name:"Manage shipping",roles:["ADMIN","MANAGER"]},{code:"analytics.view",name:"View analytics",roles:["ADMIN","MANAGER","SALES"]},{code:"report.view",name:"View reports",roles:["ADMIN","MANAGER"]},{code:"report.export",name:"Export reports",roles:["ADMIN","MANAGER"]},{code:"cms.manage",name:"Manage homepage content",roles:["ADMIN","MANAGER","CONTENT_MANAGER"]},{code:"settings.manage",name:"Manage store settings",roles:["ADMIN"]},{code:"staff.manage",name:"Manage staff users",roles:["ADMIN"]},{code:"audit.view",name:"View audit log",roles:["ADMIN","MANAGER"]},{code:"notification.view",name:"View notifications",roles:["ADMIN","MANAGER","SALES","CUSTOMER_SUPPORT","INVENTORY_MANAGER","CONTENT_MANAGER"]}],e=new Set;for(let a of d)for(let b of a.roles)e.add(`${b}:${a.code}`);function f(a,b){return"ADMIN"===a||e.has(`${a}:${b}`)}async function g(){let a=await (0,c.getCurrentStaffUser)();return a||(0,b.redirect)("/admin/login"),a}async function h(a){let c=await g();return f(c.role,a)||(0,b.redirect)("/admin?forbidden=1"),c}async function i(){let a=await g();return"ADMIN"!==a.role&&(0,b.redirect)("/admin?forbidden=1"),a}async function j(){let a=await (0,c.getCurrentStaffUser)();return a?{user:a,can:b=>f(a.role,b),isSuperAdmin:"ADMIN"===a.role}:null}async function k(){let a=await j();return!a||a.isSuperAdmin?[]:d.filter(b=>a.can(b.code)).map(a=>a.code)}a.s(["getMyPermissionCodes",()=>k,"requireStaff",()=>g,"requireStaffWithPermission",()=>h,"requireSuperAdmin",()=>i])},643116,a=>{"use strict";function b(a){return null==a||isNaN(a)?"₦0":"₦"+Math.round(a).toLocaleString("en-NG")}function c(a){return("string"==typeof a?new Date(a):a).toLocaleDateString("en-NG",{day:"numeric",month:"long",year:"numeric"})}function d(a){return("string"==typeof a?new Date(a):a).toLocaleDateString("en-NG",{day:"2-digit",month:"2-digit",year:"numeric"})}function e(){let a=Date.now().toString(36).toUpperCase().slice(-5),b=Math.random().toString(36).toUpperCase().slice(2,5);return`WC-${a}${b}`}function f(a,b){let c=a.replace(/[^\d]/g,"");return`https://wa.me/${c}?text=${encodeURIComponent(b)}`}function g(a){return a.toLowerCase().trim().replace(/[^a-z0-9\s-]/g,"").replace(/\s+/g,"-").replace(/-+/g,"-")}function h(a,b){return a.length<=b?a:a.slice(0,b).trim()+"…"}function i(a,b=2500,c=5e5){return a>=c?0:b}a.s(["NIGERIAN_STATES",0,["Abia","Adamawa","Akwa Ibom","Anambra","Bauchi","Bayelsa","Benue","Borno","Cross River","Delta","Ebonyi","Edo","Ekiti","Enugu","FCT (Abuja)","Gombe","Imo","Jigawa","Kaduna","Kano","Katsina","Kebbi","Kogi","Kwara","Lagos","Nasarawa","Niger","Ogun","Ondo","Osun","Oyo","Plateau","Rivers","Sokoto","Taraba","Yobe","Zamfara"],"calculateDeliveryFee",()=>i,"formatDate",()=>c,"formatDateShort",()=>d,"formatNGN",()=>b,"generateOrderNumber",()=>e,"slugify",()=>g,"truncate",()=>h,"whatsappLink",()=>f])},863985,a=>{"use strict";var b=a.i(761469),c=a.i(905246);async function d(a){try{let d=await (0,c.headers)(),f=d.get("x-forwarded-for")?.split(",")[0]?.trim()||d.get("x-real-ip")||null,g=d.get("user-agent")||null;await b.db.auditLog.create({data:{actorId:a.actorId,action:a.action,entityType:a.entityType,entityId:a.entityId??null,before:a.before?e(a.before):null,after:a.after?e(a.after):null,description:a.description,ip:f,userAgent:g}})}catch(a){console.error("[auditLog] failed to write audit entry:",a)}}function e(a){try{let b=new WeakSet;return JSON.stringify(a,(a,c)=>{if("object"==typeof c&&null!==c){if(b.has(c))return"[Circular]";b.add(c)}if("function"!=typeof c)return c},0).slice(0,8e3)}catch{return"[Unserializable]"}}function f(a,b){let c={};for(let d of new Set([...Object.keys(a),...Object.keys(b)])){let e=a[d],f=b[d];JSON.stringify(e)!==JSON.stringify(f)&&(c[d]={from:e,to:f})}return c}function g(a,b){let c=[];for(let[d,{from:e,to:f}]of Object.entries(a)){let a=b?.[d]??d;c.push(`${a}: ${h(e)} → ${h(f)}`)}return c.length?c.join(", "):"no changes"}function h(a){return null==a?"∅":"boolean"==typeof a?a?"yes":"no":"number"==typeof a?String(a):Array.isArray(a)?`[${a.length} items]`:"object"==typeof a?JSON.stringify(a).slice(0,80):String(a).slice(0,80)}a.s(["auditLog",()=>d,"describeChanges",()=>g,"diffChangedFields",()=>f])},428725,a=>{"use strict";function b(){return(process.env.NEXTAUTH_URL||"http://localhost:3000").replace(/\/+$/,"")}async function c(b){try{let{sendGmail:c,gmailConfigured:d}=await a.A(307825);if(d()){let a=await c({to:b.to,subject:b.subject,html:b.html});if(a.ok)return console.log(`[email] gmail sent "${b.subject}" → ${b.to}`),{ok:!0,id:a.messageId};console.error(`[email] gmail failed, falling back to Resend: ${a.error}`)}}catch(a){console.error(`[email] gmail import/send error, falling back to Resend: ${a?.message}`)}if(!process.env.RESEND_API_KEY)return console.log(`[email] skipped (neither Gmail nor Resend configured): "${b.subject}" → ${b.to}`),{ok:!1,skipped:!0,error:"email-not-configured"};let c=new AbortController,d=setTimeout(()=>c.abort(),5e3);try{let a=await fetch("https://api.resend.com/emails",{method:"POST",signal:c.signal,headers:{Authorization:`Bearer ${process.env.RESEND_API_KEY}`,"Content-Type":"application/json"},body:JSON.stringify({from:process.env.EMAIL_FROM||"Wardrobecare Clothing <onboarding@resend.dev>",to:[b.to],subject:b.subject,html:b.html,...b.text?{text:b.text}:{},...b.replyTo?{reply_to:b.replyTo}:{}})});if(!a.ok){let c=await a.text().catch(()=>"");return console.error(`[email] resend ${a.status} for "${b.subject}" → ${b.to}: ${c.slice(0,300)}`),{ok:!1,error:`resend-${a.status}`}}let d=await a.json().catch(()=>({}));return console.log(`[email] resend sent "${b.subject}" → ${b.to} (id: ${d?.id??"?"})`),{ok:!0,id:d?.id}}catch(c){let a=c?.name==="AbortError"?"timeout":c?.message;return console.error(`[email] failed "${b.subject}" → ${b.to}: ${a}`),{ok:!1,error:String(a)}}finally{clearTimeout(d)}}function d(a){return`₦${Number(a||0).toLocaleString("en-NG",{maximumFractionDigits:0})}`}function e(a){return String(a??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}let f="#121110",g="#f7f6f3",h="#6f6c66",i="#e9e7e1";function j(a){let c=new Date().getFullYear();return`<!doctype html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${e(a.title)}</title></head>
<body style="margin:0;padding:0;background:${g};font-family:Georgia,'Times New Roman',serif;">
<span style="display:none;max-height:0;overflow:hidden;">${e(a.preheader??a.title)}</span>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${g};padding:32px 12px;">
<tr><td align="center">
  <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

    <!-- Brand bar -->
    <tr><td style="background:${f};padding:28px 40px;text-align:center;">
      <div style="color:#f7f6f3;font-family:Helvetica,Arial,sans-serif;font-size:20px;letter-spacing:6px;font-weight:bold;">WARDROBECARE</div>
      <div style="color:#a8a49c;font-family:Helvetica,Arial,sans-serif;font-size:10px;letter-spacing:3px;margin-top:6px;">CLOTHING &middot; LAGOS</div>
    </td></tr>

    <!-- Body card -->
    <tr><td style="background:#ffffff;border:1px solid ${i};border-top:none;padding:40px;">
      <h1 style="margin:0 0 8px;color:${f};font-family:Helvetica,Arial,sans-serif;font-size:22px;font-weight:bold;">${e(a.title)}</h1>
      ${a.body}
    </td></tr>

    <!-- Footer -->
    <tr><td style="padding:24px 8px;text-align:center;">
      <div style="color:${h};font-family:Helvetica,Arial,sans-serif;font-size:11px;line-height:18px;">
        &copy; ${c} Wardrobecare Clothing &middot; Your #1 Personal Shopper for distinguished men's fashion<br>
        Questions? Reply to this email or reach us on WhatsApp &middot; <a href="${b()}/track-order" style="color:${f};">Track your order</a>
      </div>
    </td></tr>

  </table>
</td></tr>
</table>
</body>
</html>`}function k(a,b){return`<table role="presentation" cellpadding="0" cellspacing="0" style="margin:24px auto 4px;"><tr>
<td style="background:${f};border-radius:3px;">
  <a href="${a}" style="display:inline-block;padding:13px 34px;color:#f7f6f3;font-family:Helvetica,Arial,sans-serif;font-size:13px;letter-spacing:2px;text-decoration:none;">${e(b)}</a>
</td></tr></table>`}function l(a){let b=a.map(a=>{let b=[a.size,a.color].filter(Boolean).join(" / ");return`<tr>
  <td style="padding:10px 0;border-bottom:1px solid ${i};color:${f};font-family:Helvetica,Arial,sans-serif;font-size:13px;">
    ${e(a.productName)}${b?`<span style="color:${h};"> &nbsp;(${e(b)})</span>`:""}
    <span style="color:${h};"> &nbsp;&times;${a.quantity}</span>
  </td>
  <td align="right" style="padding:10px 0;border-bottom:1px solid ${i};color:${f};font-family:Helvetica,Arial,sans-serif;font-size:13px;white-space:nowrap;">${d(a.totalPrice)}</td>
</tr>`});return`<table role="presentation" width="100%" cellpadding="0" cellspacing="0">${b.join("")}</table>`}function m(a){let b=a.discount&&a.discount>0?`<tr><td style="padding:4px 0;color:${h};font-family:Helvetica,Arial,sans-serif;font-size:13px;">Discount</td>
       <td align="right" style="padding:4px 0;color:#1f7a4d;font-family:Helvetica,Arial,sans-serif;font-size:13px;">&minus;${d(a.discount)}</td></tr>`:"";return`<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-top:16px;">
  <tr><td style="padding:4px 0;color:${h};font-family:Helvetica,Arial,sans-serif;font-size:13px;">Subtotal</td>
      <td align="right" style="padding:4px 0;color:${f};font-family:Helvetica,Arial,sans-serif;font-size:13px;">${d(a.subtotal)}</td></tr>
  ${b}
  <tr><td style="padding:4px 0;color:${h};font-family:Helvetica,Arial,sans-serif;font-size:13px;">Delivery</td>
      <td align="right" style="padding:4px 0;color:${f};font-family:Helvetica,Arial,sans-serif;font-size:13px;">${a.deliveryFee>0?d(a.deliveryFee):"Free"}</td></tr>
  <tr><td style="padding:12px 0 0;border-top:2px solid ${f};color:${f};font-family:Helvetica,Arial,sans-serif;font-size:15px;font-weight:bold;">Total</td>
      <td align="right" style="padding:12px 0 0;border-top:2px solid ${f};color:${f};font-family:Helvetica,Arial,sans-serif;font-size:15px;font-weight:bold;">${d(a.total)}</td></tr>
</table>`}function n(a){return`<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-top:24px;background:${g};border:1px solid ${i};">
  <tr><td style="padding:16px 20px;font-family:Helvetica,Arial,sans-serif;font-size:12px;line-height:20px;color:${h};">
    <strong style="color:${f};letter-spacing:1px;">DELIVERING TO</strong><br>
    ${e(a.customerName)}<br>
    ${e(a.address)}, ${e(a.city)}, ${e(a.state)}<br>
    ${e(a.phone??"")}
  </td></tr>
</table>`}function o(a){return`<p style="margin:8px 0 20px;color:${h};font-family:Helvetica,Arial,sans-serif;font-size:14px;line-height:22px;">${a}</p>`}function p(a){return`<div style="margin:0 0 20px;color:${f};font-family:Helvetica,Arial,sans-serif;font-size:13px;letter-spacing:1px;">
    <span style="background:${g};border:1px solid ${i};padding:6px 14px;">ORDER ${e(a)}</span>
  </div>`}async function q(a,e,f){let g="WHATSAPP"===a.paymentMethod?"One of our stylists will contact you on WhatsApp to arrange payment and delivery.":"Complete your payment via the secure Paystack checkout — you will receive a receipt the moment it succeeds.",h=j({title:`Thank you, ${a.customerName.split(" ")[0]} — your order is confirmed`,preheader:`Order ${a.orderNumber} received — ${d(a.total)}`,body:`
      ${p(a.orderNumber)}
      ${o(`We have received your order and our team is already preparing it. ${g}`)}
      ${l(e)}
      ${m(a)}
      ${n(a)}
      ${k(`${b()}/track-order`,"TRACK YOUR ORDER")}
    `});return c({to:a.email,subject:`Order ${a.orderNumber} confirmed — Wardrobecare Clothing`,html:h,replyTo:f})}async function r(a,g,i,q){let r=j({title:"Payment confirmed — thank you",preheader:`We received ${d(a.total)} for order ${a.orderNumber}`,body:`
      ${p(a.orderNumber)}
      ${o(`Your payment of <strong style="color:${f};">${d(a.total)}</strong> was received successfully${i?.paidAt?` on ${i.paidAt.toUTCString()}`:""}. Your order is now being prepared for dispatch.`)}
      ${l(g)}
      ${m(a)}
      ${i?.reference?`<p style="margin:20px 0 0;color:${h};font-family:Helvetica,Arial,sans-serif;font-size:12px;">Payment reference: <span style="color:${f};">${e(i.reference)}</span></p>`:""}
      ${n(a)}
      ${k(`${b()}/track-order`,"TRACK YOUR ORDER")}
    `});return c({to:a.email,subject:`Receipt for order ${a.orderNumber} — payment confirmed`,html:r,replyTo:q})}async function s(a,d,l){let m=d.carrier?` with ${e(d.carrier)}`:"",n=d.trackingNumber?`<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:20px 0;background:${g};border:1px solid ${i};">
        <tr><td style="padding:16px 20px;font-family:Helvetica,Arial,sans-serif;font-size:13px;color:${h};">
          <strong style="color:${f};letter-spacing:1px;">TRACKING</strong><br>
          ${d.carrier?`${e(d.carrier)} &nbsp;&middot;&nbsp; `:""}
          <span style="color:${f};font-size:15px;">${e(d.trackingNumber)}</span>
        </td></tr>
      </table>`:"",q=j({title:"Your order is on the way",preheader:`Order ${a.orderNumber} has been dispatched`,body:`
      ${p(a.orderNumber)}
      ${o(`Great news — your order has been dispatched${m} and is on its way to you.`)}
      ${n}
      ${o(`Expected delivery: <strong style="color:${f};">2&ndash;5 business days</strong> depending on your location. Our support line will follow up on WhatsApp on the day of delivery.`)}
      ${d.trackingUrl?k(d.trackingUrl,"TRACK PARCEL"):k(`${b()}/track-order`,"TRACK YOUR ORDER")}
    `});return c({to:a.email,subject:`Your Wardrobecare order ${a.orderNumber} is on the way`,html:q,replyTo:l})}async function t(a,b,g){let h=j({title:"Your refund has been processed",preheader:`Refund of ${d(b.amount)} for order ${a.orderNumber}`,body:`
      ${p(a.orderNumber)}
      ${o(`We have processed a refund of <strong style="color:${f};">${d(b.amount)}</strong> for your order${b.reason?` — reason: ${e(b.reason)}`:""}. ${b.full?"This is a full refund for the order.":"This is a partial refund for the returned items."}`)}
      ${o(`Refunds to cards typically appear within <strong style="color:${f};">5&ndash;10 business days</strong>, depending on your bank. If you do not see it by then, reply to this email and we will trace it with Paystack immediately.`)}
      ${o("We are sorry this purchase did not work out, and we appreciate your patience.")}
    `});return c({to:a.email,subject:`Refund processed for order ${a.orderNumber} — Wardrobecare Clothing`,html:h,replyTo:g})}async function u(a,g,h){let i=h||process.env.ADMIN_NOTIFY_EMAIL;if(!i)return console.log("[email] admin alert skipped (no supportEmail / ADMIN_NOTIFY_EMAIL)"),{ok:!1,skipped:!0,error:"no-admin-email"};let q=j({title:`New order ${a.orderNumber} — ${d(a.total)}`,preheader:`${a.customerName} placed a ${d(a.total)} order`,body:`
      ${p(a.orderNumber)}
      ${o(`<strong style="color:${f};">${e(a.customerName)}</strong> just placed an order via
        ${"WHATSAPP"===a.paymentMethod?"WhatsApp":"Paystack checkout"}.`)}
      ${l(g)}
      ${m(a)}
      ${n(a)}
      ${k(`${b()}/admin/orders`,"OPEN ADMIN CONSOLE")}
    `});return c({to:i,subject:`🔔 New order ${a.orderNumber} — ${d(a.total)}`,html:q})}async function v(a,d){let l=d||process.env.ADMIN_NOTIFY_EMAIL||process.env.GMAIL_USER;if(!l)return console.log("[email] service enquiry alert skipped (no admin email)"),{ok:!1,skipped:!0,error:"no-admin-email"};let m=[a.occasion&&`<strong>Occasion:</strong> ${e(a.occasion)}`,a.preferredDate&&`<strong>Preferred date:</strong> ${e(a.preferredDate)}`,a.location&&`<strong>Location:</strong> ${e(a.location)}`,a.budget&&`<strong>Budget:</strong> ${e(a.budget)}`].filter(Boolean).join("<br>"),n=j({title:`New ${a.serviceName} enquiry — ${a.enquiryNumber}`,preheader:`${a.customerName} requested ${a.serviceName}`,body:`
      <div style="margin:0 0 20px;color:${f};font-family:Helvetica,Arial,sans-serif;font-size:13px;letter-spacing:1px;">
        <span style="background:${g};border:1px solid ${i};padding:6px 14px;">ENQUIRY ${e(a.enquiryNumber)}</span>
      </div>
      <p style="margin:8px 0 20px;color:${h};font-family:Helvetica,Arial,sans-serif;font-size:14px;line-height:22px;">
        <strong style="color:${f};">${e(a.customerName)}</strong> just submitted a
        <strong style="color:${f};">${e(a.serviceName)}</strong> enquiry.
      </p>
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:16px 0;background:${g};border:1px solid ${i};">
        <tr><td style="padding:16px 20px;font-family:Helvetica,Arial,sans-serif;font-size:13px;line-height:20px;color:${h};">
          <strong style="color:${f};letter-spacing:1px;">CONTACT</strong><br>
          ${e(a.customerName)}<br>
          ${e(a.email)}<br>
          ${e(a.phone)}
        </td></tr>
      </table>
      ${m?`<p style="margin:12px 0;color:${h};font-family:Helvetica,Arial,sans-serif;font-size:13px;line-height:20px;">${m}</p>`:""}
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:16px 0;background:${g};border:1px solid ${i};">
        <tr><td style="padding:16px 20px;font-family:Helvetica,Arial,sans-serif;font-size:13px;line-height:20px;color:${h};">
          <strong style="color:${f};letter-spacing:1px;">MESSAGE</strong><br>
          ${e(a.message)}
        </td></tr>
      </table>
      ${k(`${b()}/admin/services/enquiries`,"VIEW ENQUIRY")}
    `});return c({to:l,subject:`🔔 New ${a.serviceName} enquiry — ${a.enquiryNumber}`,html:n})}a.s(["notifyAdminNewOrder",()=>u,"notifyAdminServiceEnquiry",()=>v,"sendOrderConfirmation",()=>q,"sendPaymentReceipt",()=>r,"sendRefundConfirmation",()=>t,"sendTrackingUpdate",()=>s])}];

//# sourceMappingURL=%5Broot-of-the-server%5D__7b869a04._.js.map