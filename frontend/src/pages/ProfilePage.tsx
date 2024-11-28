import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { useAppDispatch, useAppSelector } from "../hooks";
import { authSelector } from "../selectors/authSelector";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useUpdateProfileMutation } from "../slices/usersApiSlice";
import Loader from "../components/Loader";
import { setCredentials } from "../slices/authSlice";
import { toast } from "react-toastify";

const FormSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
  confirmPassword: z.string(),
});

type FormValues = z.infer<typeof FormSchema>;

const ProfilePage = () => {
  const { userInfo } = useAppSelector(authSelector);
  const dispatch = useAppDispatch();

  const [updateProfile, { isLoading: loadingUpdateProfile }] =
    useUpdateProfileMutation();

  const { register, handleSubmit } = useForm<FormValues>({
    values: {
      name: userInfo!.name,
      email: userInfo!.email,
      password: "",
      confirmPassword: "",
    },
  });

  const submitHandler: SubmitHandler<FormValues> = async ({
    name,
    email,
    password,
    confirmPassword,
  }) => {
    if (password === confirmPassword) {
      try {
        const res = await updateProfile({
          name,
          email,
          password,
          _id: userInfo?._id,
        }).unwrap();
        dispatch(setCredentials(res));
        toast.success("Profile updated successfully");
      } catch (error: any) {
        toast.error(error?.data?.message || error.error);
      }
    } else {
      toast.error("Passwords do not match");
    }
  };

  return (
    <Row>
      <Col md={3}>
        <h2>User Profile</h2>
        <Form onSubmit={handleSubmit(submitHandler)}>
          <Form.Group controlId="name" className="my-2">
            <Form.Label>Name</Form.Label>
            <Form.Control {...register("name")} placeholder="Enter name" />
          </Form.Group>
          <Form.Group controlId="email" className="my-2">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              {...register("email")}
              type="email"
              placeholder="Enter email address"
            />
          </Form.Group>
          <Form.Group controlId="password" className="my-2">
            <Form.Label>New Password</Form.Label>
            <Form.Control
              {...register("password")}
              type="password"
              placeholder="Enter new password"
            />
          </Form.Group>
          <Form.Group controlId="confirmPassword" className="my-2">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              {...register("confirmPassword")}
              type="password"
              placeholder="Confirm password"
            />
          </Form.Group>
          <Button type="submit" variant="primary" className="my-2">
            Update
          </Button>
          {loadingUpdateProfile && <Loader />}
        </Form>
      </Col>
      <Col md={9}>Column</Col>
    </Row>
  );
};

export default ProfilePage;
