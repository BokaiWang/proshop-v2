import React, { useEffect } from "react";

import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../hooks";
import { cartSelector } from "../selectors/cartSelector";
import { Col, Row } from "react-bootstrap";
import CheckoutSteps from "../components/CheckoutSteps";

const PlaceOrderPage = () => {
  const navigate = useNavigate();
  const cart = useAppSelector(cartSelector);

  useEffect(() => {
    if (!cart.shippingAddress.address) {
      navigate("/shippgin");
    } else if (!cart.paymentMethod) {
      navigate("/payment");
    }
  }, [cart.paymentMethod, cart.shippingAddress.address, navigate]);

  return (
    <>
      <CheckoutSteps step1 step2 step3 step4 />
      <Row>
        <Col md={8}>Column</Col>
        <Col md={4}>Column</Col>
      </Row>
    </>
  );
};

export default PlaceOrderPage;
