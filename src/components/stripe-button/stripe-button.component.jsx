import React from 'react';
import Logo from '../../assets/banner.svg'
import StripeCheckout from 'react-stripe-checkout';

const StripeCheckoutButton = ({price})=>{
  const priceForStripe = price * 100;
  const publishableKey = 'pk_test_51J18KZEnp17OBTFVt9pCPe3Y8Yyh9hVm7RfsYn7wSM0vMsGSvNLV1itY39Q05wnNQBy4GilhwPzpBH2wMbUiv0Je00PwpdO7QE';
  const onToken = token =>{
    console.log(token);
    alert('Payment Succesful');
  }
  return(
    <StripeCheckout
      label='Pay Now'
      name='Feudal Swag Ltd.'
      billingAddress
      shippingAddress
      image={Logo}
      description={`Your total is $${price}`}
      amount={priceForStripe}
      panelLabel ='Pay Now'
      token={onToken}
      stripeKey = {publishableKey}
    />
  );
};

export default StripeCheckoutButton;