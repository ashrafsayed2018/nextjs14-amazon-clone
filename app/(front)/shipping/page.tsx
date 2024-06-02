import { Metadata } from 'next'
import Form from './Form'

export const metadata: Metadata = {
  title: 'Shipping page',
}
function ShippingPage() {
  return <Form />
}

export default ShippingPage
