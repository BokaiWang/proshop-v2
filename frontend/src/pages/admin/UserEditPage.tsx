import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import FormContainer from "../../components/FormContainer";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import { Button, Form } from "react-bootstrap";
import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import {
  useGetUserByIdQuery,
  useUpdateUserMutation,
} from "../../slices/usersApiSlice";

const FormSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  isAdmin: z.boolean(),
});

type FormValues = z.infer<typeof FormSchema>;

const UserEditPage = () => {
  const { id: userId } = useParams();

  const {
    data: user,
    isLoading,
    refetch,
    error,
  } = useGetUserByIdQuery(userId as string);

  const [updateUser, { isLoading: isLoadingUpdate }] = useUpdateUserMutation();

  const navigate = useNavigate();
  const { register, handleSubmit, watch } = useForm<FormValues>({
    values: {
      name: user?.name || "",
      email: user?.email || "",
      isAdmin: user?.isAdmin || false,
    },
  });
  const submitHandler: SubmitHandler<FormValues> = async (values) => {
    const updatedUser = {
      _id: userId,
      ...values,
    };
    const result = await updateUser(updatedUser);
    if (result.error) {
      toast.error(result.error as any);
    } else {
      toast.success("User updated");
      navigate("/admin/user-list");
    }
  };

  return (
    <>
      <Link to="/admin/user-list" className="btn btn-light my-3">
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit Product</h1>
        {isLoadingUpdate && <Loader />}
        {isLoading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error as any}</Message>
        ) : (
          <Form onSubmit={handleSubmit(submitHandler)}>
            <Form.Group controlId="name" className="my-2">
              <Form.Label>Name</Form.Label>
              <Form.Control
                placeholder="Enter name"
                {...register("name")}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="email" className="my-2">
              <Form.Label>Email</Form.Label>
              <Form.Control
                placeholder="Enter email"
                {...register("email")}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="isAdmin" className="my-2">
              <Form.Check
                type="switch"
                label="Is Admin"
                {...register("isAdmin")}
              ></Form.Check>
            </Form.Group>

            <Button type="submit">Update</Button>
          </Form>
        )}
      </FormContainer>
    </>
  );
};

export default UserEditPage;
