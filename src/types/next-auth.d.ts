/**
 * NextAuth session type augmentation.
 *
 * The default NextAuth Session.user type only has { name, email, image }.
 * Our JWT callback adds { id, role, phone, whatsappNumber } — this file
 * tells TypeScript about those extra fields so we don't need to cast
 * `session.user as { id?: string }` everywhere.
 *
 * Reference: https://next-auth.js.org/getting-started/typescript
 */

import 'next-auth'
import 'next-auth/jwt'

declare module 'next-auth' {
  interface Session {
    user: {
      id: string
      email: string
      name?: string | null
      role: 'CUSTOMER' | 'ADMIN' | 'MANAGER' | 'SALES' | 'INVENTORY_MANAGER' | 'CUSTOMER_SUPPORT' | 'CONTENT_MANAGER'
      phone?: string | null
      whatsappNumber?: string | null
      image?: string | null
    }
  }

  interface User {
    id: string
    role: 'CUSTOMER' | 'ADMIN' | 'MANAGER' | 'SALES' | 'INVENTORY_MANAGER' | 'CUSTOMER_SUPPORT' | 'CONTENT_MANAGER'
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id?: string
    role?: 'CUSTOMER' | 'ADMIN' | 'MANAGER' | 'SALES' | 'INVENTORY_MANAGER' | 'CUSTOMER_SUPPORT' | 'CONTENT_MANAGER'
  }
}
