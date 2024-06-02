import { Metadata } from 'next'
import Form from './Form'

export const metadata: Metadata = {
  title: 'register page',
}
async function RegisterPage() {
  return <Form />
}

export default RegisterPage
