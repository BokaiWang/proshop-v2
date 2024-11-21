import React, { useEffect } from "react";
import FormContainer from "../components/FormContainer";
import { Button, Col, Form } from "react-bootstrap";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import CheckoutSteps from "../components/CheckoutSteps";
import { useAppDispatch, useAppSelector } from "../hooks";
import { savePaymentMethod } from "../slices/cartSlice";
import { cartSelector } from "../selectors/cartSelector";
import { useNavigate } from "react-router-dom";

const FormSchema = z.object({
  paymentMethod: z.string(),
});

type FormValues = z.infer<typeof FormSchema>;

const PaymentPage = () => {
  const dispatch = useAppDispatch();
  const { shippingAddress } = useAppSelector(cartSelector);
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm<FormValues>({
    defaultValues: { paymentMethod: "PayPal" },
  });

  const submitHandler: SubmitHandler<FormValues> = ({ paymentMethod }) => {
    dispatch(savePaymentMethod(paymentMethod));
    navigate("/place-order");
  };

  useEffect(() => {
    if (!shippingAddress) {
      navigate("/shipping");
    }
  }, [shippingAddress, navigate]);

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 step3 />
      <h1>Payment Method</h1>
      <Form onSubmit={handleSubmit(submitHandler)}>
        <Form.Group>
          <Form.Label as="legend">Select Method</Form.Label>
          <Col>
            <Form.Check
              type="radio"
              className="my-2"
              label="PayPal or Credit Card"
              value="PayPal"
              checked
              {...register("paymentMethod")}
            />
          </Col>
        </Form.Group>
        <Button type="submit">Save</Button>
      </Form>
    </FormContainer>
  );
};

export default PaymentPage;
