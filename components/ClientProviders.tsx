'use client'
import { ReactNode } from 'react'
import { Toaster } from 'react-hot-toast'

function ClientProviders({ children }: { children: ReactNode }) {
  return (
    <>
      <Toaster />
      {children}
    </>
  )
}

export default ClientProviders
