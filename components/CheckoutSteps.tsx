function CheckoutSteps({ current = 0 }) {
  return (
    <ul className="w-full mt-4 steps steps-vertical lg:steps-horizontal">
      {['User Login', 'Shipping Address', 'Payment Method', 'Place Order'].map(
        (step, index) => (
          <li
            key={index}
            className={`step ${index <= current ? 'step-primary' : ''}`}
          >
            {step}
          </li>
        )
      )}
    </ul>
  )
}

export default CheckoutSteps
