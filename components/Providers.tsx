import { SessionProvider } from 'next-auth/react'
import { auth } from '@/lib/auth'
import { ReactNode } from 'react'
import { Session } from 'inspector'
import ClientProviders from './ClientProviders'
async function Providers({ children }: { children: ReactNode }) {
  const session = await auth()
  return (
    <SessionProvider session={session}>
      <ClientProviders>{children}</ClientProviders>
    </SessionProvider>
  )
}

export default Providers
