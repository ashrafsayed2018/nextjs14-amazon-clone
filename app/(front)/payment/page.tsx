import { Metadata } from 'next'
import Form from './Form'

export const metadata: Metadata = {
  title: 'payment page',
}
function PaymentPage() {
  return <Form />
}

export default PaymentPage
