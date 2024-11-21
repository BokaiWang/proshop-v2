import React from "react";
import FormContainer from "../components/FormContainer";
import { Button, Form } from "react-bootstrap";
import { z } from "zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../hooks";
import { cartSelector } from "../selectors/cartSelector";
import { saveShippingAddress } from "../slices/cartSlice";
import { useNavigate } from "react-router-dom";
import CheckoutSteps from "../components/CheckoutSteps";

const FormSchema = z.object({
  address: z.string(),
  city: z.string(),
  postalCode: z.string(),
  country: z.string(),
});

type FormValues = z.infer<typeof FormSchema>;

const ShippingPage = () => {
  const { shippingAddress } = useAppSelector(cartSelector);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm<FormValues>({
    defaultValues: { ...shippingAddress },
  });

  const submitHandler: SubmitHandler<FormValues> = (values) => {
    dispatch(saveShippingAddress({ ...values }));
    navigate("/payment");
  };

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 />
      <h1>Shipping Address</h1>
      <Form onSubmit={handleSubmit(submitHandler)}>
        <Form.Group controlId="address" className="my-3">
          <Form.Label>Address</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter address"
            {...register("address")}
          />
        </Form.Group>
        <Form.Group controlId="city" className="my-3">
          <Form.Label>City</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter city"
            {...register("city")}
          />
        </Form.Group>
        <Form.Group controlId="postalCode" className="my-3">
          <Form.Label>Postal Code</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter postal code"
            {...register("postalCode")}
          />
        </Form.Group>
        <Form.Group controlId="country" className="my-3">
          <Form.Label>Country</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter country"
            {...register("country")}
          />
        </Form.Group>
        <Button type="submit" variant="primary" className="my-2">
          Continue
        </Button>
      </Form>
    </FormContainer>
  );
};

export default ShippingPage;
