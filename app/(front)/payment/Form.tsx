'use client'
import CheckoutSteps from '@/components/CheckoutSteps'
import useCartService from '@/lib/hooks/useCartStore'
import { useRouter } from 'next/navigation'
import { FormEvent, useEffect, useState } from 'react'

function Form() {
  const router = useRouter()
  const { paymentMethod, savePaymentMethod, shippingAddress } = useCartService()
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('')
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    savePaymentMethod(selectedPaymentMethod)
    router.push('/place-order')
  }
  useEffect(() => {
    if (!shippingAddress.address) {
      router.push('/shipping')
    }
    setSelectedPaymentMethod(selectedPaymentMethod || 'PayPal')
  }, [shippingAddress.address, router, selectedPaymentMethod])
  return (
    <div>
      <CheckoutSteps current={2} />
      <div className="max-w-sm mx-auto card bg-base-300 my-4">
        <div className="card-body">
          <h1 className="card-title">Payment Method</h1>
          <form onSubmit={handleSubmit}>
            {['PayPal', 'Strip', 'CashOnDelivery'].map((payment) => (
              <div key={payment}>
                <label className="label cursor-pointer">
                  <span className="label-text">{payment}</span>
                  <input
                    type="radio"
                    name="paymentMethod"
                    className="radio-sm"
                    value={payment}
                    checked={selectedPaymentMethod === payment}
                    onChange={() => setSelectedPaymentMethod(payment)}
                  />
                </label>
              </div>
            ))}
            <div className="my-2">
              <button type="submit" className="w-full btn btn-primary">
                Next
              </button>
            </div>
            <div className="my-2">
              <button
                type="button"
                className="my-2 w-full btn"
                onClick={() => router.back()}
              >
                Back
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Form
