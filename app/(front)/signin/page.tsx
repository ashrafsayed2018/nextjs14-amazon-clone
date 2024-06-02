import { Metadata } from 'next'
import Form from '@/components/Form'

export const metadata: Metadata = {
  title: 'sign in',
}

function SignInPage() {
  return <Form />
}

export default SignInPage
