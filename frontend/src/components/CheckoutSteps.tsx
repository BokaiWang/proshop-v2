import React, { FC } from "react";
import { Nav } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

interface Props {
  step1?: boolean;
  step2?: boolean;
  step3?: boolean;
  step4?: boolean;
}

const CheckoutSteps: FC<Props> = ({ step1, step2, step3, step4 }) => {
  return (
    <Nav className="justify-content-center mb-4">
      <Nav.Item>
        <LinkContainer to={"/login"}>
          <Nav.Link disabled={!step1}>Sign In</Nav.Link>
        </LinkContainer>
      </Nav.Item>
      <Nav.Item>
        <LinkContainer to={"/shipping"}>
          <Nav.Link disabled={!step2}>Shipping</Nav.Link>
        </LinkContainer>
      </Nav.Item>
      <Nav.Item>
        <LinkContainer to={"/payment"}>
          <Nav.Link disabled={!step3}>Payment</Nav.Link>
        </LinkContainer>
      </Nav.Item>
      <Nav.Item>
        <LinkContainer to={"/place-order"}>
          <Nav.Link disabled={!step4}>Place Order</Nav.Link>
        </LinkContainer>
      </Nav.Item>
    </Nav>
  );
};

export default CheckoutSteps;
