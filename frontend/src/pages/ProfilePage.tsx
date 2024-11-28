import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { useAppDispatch, useAppSelector } from "../hooks";
import { authSelector } from "../selectors/authSelector";
import { Button, Col, Form, Row, Table } from "react-bootstrap";
import { useUpdateProfileMutation } from "../slices/usersApiSlice";
import Loader from "../components/Loader";
import { setCredentials } from "../slices/authSlice";
import { toast } from "react-toastify";
import { useGetMyOrdersQuery } from "../slices/ordersApiSlice";
import Message from "../components/Message";
import { FaTimes } from "react-icons/fa";
import { LinkContainer } from "react-router-bootstrap";

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
  const {
    data: orders,
    isLoading: loadingGetMyOrders,
    error,
  } = useGetMyOrdersQuery();

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
      <Col md={9}>
        <h2>My Orders</h2>
        {loadingGetMyOrders ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">
            {"status" in error ? JSON.stringify(error.data) : error.message}
          </Message>
        ) : (
          <Table striped hover responsive className="table-sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>DATE</th>
                <th>TOTAL</th>
                <th>PAID</th>
                <th>DELIVERED</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {orders?.map((order) => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{order.createdAt.substring(0, 10)}</td>
                  <td>${order.totalPrice}</td>
                  <td>
                    {order.isPaid ? (
                      order.paidAt.substring(0, 10)
                    ) : (
                      <FaTimes style={{ color: "red" }} />
                    )}
                  </td>
                  <td>
                    {order.isDelivered ? (
                      order.deliveredAt.substring(0, 10)
                    ) : (
                      <FaTimes style={{ color: "red" }} />
                    )}
                  </td>
                  <td>
                    <LinkContainer to={`/order/${order._id}`}>
                      <Button className="btn-sm" variant="light">
                        Details
                      </Button>
                    </LinkContainer>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Col>
    </Row>
  );
};

export default ProfilePage;
