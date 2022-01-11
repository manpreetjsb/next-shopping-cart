import React from 'react'
import Stepper from '@mui/material/Stepper'
import Step from '@mui/material/Step'
import StepLabel from '@mui/material/StepLabel'

const CheckoutProcessBar = ({ activeStep = 0 }) => {
  const steps = ['Login', 'Shipping Address', 'Payment Method', 'Place Order']
  return (
    <Stepper activeStep={activeStep} alternativeLabel>
      {steps.map((step) => (
        <Step key={step}>
          <StepLabel>{step}</StepLabel>
        </Step>
      ))}
    </Stepper>
  )
}
export default CheckoutProcessBar
