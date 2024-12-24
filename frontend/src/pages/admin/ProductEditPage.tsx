import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  useGetProductDetailsQuery,
  useUpdateProductMutation,
  useUploadProductImageMutation,
} from "../../slices/productsApiSlice";
import FormContainer from "../../components/FormContainer";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import { Button, Form } from "react-bootstrap";
import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";

const FormSchema = z.object({
  name: z.string(),
  price: z.number(),
  brand: z.string(),
  image: z.string(),
  category: z.string(),
  countInStock: z.number(),
  description: z.string(),
});

type FormValues = z.infer<typeof FormSchema>;

const ProductEditPage = () => {
  const { id: productId } = useParams();

  const {
    data: product,
    isLoading,
    error,
  } = useGetProductDetailsQuery(productId as string);

  const [updateProduct, { isLoading: isLoadingUpdate }] =
    useUpdateProductMutation();

  const [uploadProductImage, { isLoading: isLoadingUpload }] =
    useUploadProductImageMutation();

  const navigate = useNavigate();
  const { register, handleSubmit, setValue } = useForm<FormValues>({
    values: {
      name: product?.name as string,
      price: product?.price as number,
      brand: product?.brand as string,
      image: product?.image as string,
      category: product?.category as string,
      countInStock: product?.countInStock as number,
      description: product?.description as string,
    },
  });
  const submitHandler: SubmitHandler<FormValues> = async (values) => {
    const updatedProduct = {
      _id: productId,
      ...values,
    };
    const result = await updateProduct(updatedProduct);
    if (result.error) {
      toast.error(result.error as any);
    } else {
      toast.success("Product updated");
      navigate("/admin/product-list");
    }
  };

  const uploadFileHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const formData = new FormData();
    formData.append("image", e.target.files?.[0] as File);
    try {
      const res = await uploadProductImage(formData).unwrap();
      toast.success(res.message);
      setValue("image", res.image);
    } catch (err) {
      toast.error((err as any)?.data?.message || (err as any).error);
    }
  };

  return (
    <>
      <Link to="/admin/product-list" className="btn btn-light my-3">
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit Product</h1>
        {isLoadingUpdate && <Loader />}
        {isLoading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{(error as any).data.message}</Message>
        ) : (
          <Form onSubmit={handleSubmit(submitHandler)}>
            <Form.Group controlId="name" className="my-2">
              <Form.Label>Name</Form.Label>
              <Form.Control
                placeholder="Enter name"
                {...register("name")}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="price" className="my-2">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter price"
                step={"0.01"}
                {...register("price")}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="image" className="my-2">
              <Form.Label>Image</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter image url"
                {...register("image")}
              ></Form.Control>
              <Form.Control
                type="file"
                onChange={uploadFileHandler}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="brand" className="my-2">
              <Form.Label>Brand</Form.Label>
              <Form.Control
                placeholder="Enter brand"
                {...register("brand")}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="category" className="my-2">
              <Form.Label>Category</Form.Label>
              <Form.Control
                placeholder="Enter category"
                {...register("category")}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="countInStock" className="my-2">
              <Form.Label>Count In Stock</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter count in stock"
                {...register("countInStock")}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="description" className="my-2">
              <Form.Label>Description</Form.Label>
              <Form.Control
                placeholder="Enter description"
                {...register("description")}
              ></Form.Control>
            </Form.Group>
            <Button type="submit">Update</Button>
          </Form>
        )}
      </FormContainer>
    </>
  );
};

export default ProductEditPage;
