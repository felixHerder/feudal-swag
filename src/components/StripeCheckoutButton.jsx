import React from "react";
import Logo from "../assets/banner.svg";
import StripeCheckout from "react-stripe-checkout";
import { Text } from "@chakra-ui/react";

const StripeCheckoutButton = ({ price, currentUser }) => {
  const priceForStripe = price * 100;
  const publishableKey =
    "pk_test_51J18KZEnp17OBTFVt9pCPe3Y8Yyh9hVm7RfsYn7wSM0vMsGSvNLV1itY39Q05wnNQBy4GilhwPzpBH2wMbUiv0Je00PwpdO7QE";
  const onToken = (token) => {
    alert("Payment Succesful");
  };
  return !currentUser.isAnonymous ? (
    <StripeCheckout
      email={currentUser.email}
      label="Check out with Stripe"
      name="Feudal Swag Ltd."
      shippingAddress
      image={Logo}
      description={`Your total is $${price}`}
      amount={priceForStripe}
      panelLabel="Check out with Stripe"
      token={onToken}
      stripeKey={publishableKey}
    />
  ) : (
    <Text>Please signin/up to checkout</Text>
  );
};

export default StripeCheckoutButton;
