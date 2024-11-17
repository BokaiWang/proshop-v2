import React, { useEffect } from "react";
import FormContainer from "../components/FormContainer";
import { Button, Col, Form, Row } from "react-bootstrap";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks";
import { useRegisterMutation } from "../slices/usersApiSlice";
import { authSelector } from "../selectors/authSelector";
import { setCredentials } from "../slices/authSlice";
import { toast } from "react-toastify";
import Loader from "../components/Loader";

const FormSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
  confirmPassword: z.string(),
});

type FormValues = z.infer<typeof FormSchema>;

const RegisterPage = () => {
  const { register, handleSubmit } = useForm<FormValues>();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [registerUser, { isLoading }] = useRegisterMutation();
  const { userInfo } = useAppSelector(authSelector);
  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const redirect = searchParams.get("redirect") || "/";

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [userInfo, redirect, navigate]);

  const submitHandler: SubmitHandler<FormValues> = async ({
    name,
    email,
    password,
    confirmPassword,
  }) => {
    try {
      if (password === confirmPassword) {
        const res = await registerUser({
          name,
          email,
          password,
        }).unwrap();
        dispatch(setCredentials({ ...res }));
        navigate(redirect);
      } else {
        toast.error("Password do not match");
      }
    } catch (error: any) {
      toast.error(error?.data?.message || error?.error);
    }
  };
  return (
    <FormContainer>
      <h1>Sign Up</h1>
      <Form onSubmit={handleSubmit(submitHandler)}>
        <Form.Group controlId="name" className="my-3">
          <Form.Label>Name</Form.Label>
          <Form.Control placeholder="Enter name" {...register("name")} />
        </Form.Group>
        <Form.Group controlId="email" className="my-3">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            {...register("email")}
          />
        </Form.Group>
        <Form.Group controlId="password" className="my-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            {...register("password")}
          />
        </Form.Group>
        <Form.Group controlId="confirmPassword" className="my-3">
          <Form.Label>Cofirm Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirm password"
            {...register("confirmPassword")}
          />
        </Form.Group>
        <Button
          type="submit"
          variant="primary"
          className="mt-2"
          disabled={isLoading}
        >
          Register
        </Button>
        {isLoading && <Loader />}
      </Form>
      <Row className="py-3">
        <Col>
          Already have an account?{" "}
          <Link to={redirect ? `/login?redirect=${redirect}` : "/login"}>
            Login
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default RegisterPage;
