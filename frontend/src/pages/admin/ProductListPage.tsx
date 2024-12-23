import React from "react";
import {
  useCreateProductMutation,
  useDeleteProductMutation,
  useGetProductsQuery,
} from "../../slices/productsApiSlice";
import { Button, Col, Row, Table } from "react-bootstrap";
import { FaEdit, FaTrash } from "react-icons/fa";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import { LinkContainer } from "react-router-bootstrap";
import { toast } from "react-toastify";
import { useSearchParams } from "react-router-dom";

const ProductListPage = () => {
  const [searchParams] = useSearchParams();
  const page = searchParams.get("page");
  const { data, isLoading, error, refetch } = useGetProductsQuery({
    pageNumber: Number(page),
  });
  const [
    createProduct,
    { isLoading: isLoadingCreateProduct, error: errorCreateProduct },
  ] = useCreateProductMutation();

  const [deleteProduct, { isLoading: isLoadingDeleteProduct }] =
    useDeleteProductMutation();

  const deleteProductHandler = async (productId: string) => {
    if (window.confirm("Are you sure you want to delete the product?")) {
      try {
        const res = await deleteProduct(productId).unwrap();
        toast.success(res.message);
        refetch();
      } catch (err) {
        toast.error((err as any)?.data?.message || (err as any).error);
      }
    }
  };

  const createProductHandler = async () => {
    if (window.confirm("Are you sure you want to create a product?")) {
      try {
        await createProduct();
        refetch();
      } catch (err: any) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  return (
    <>
      <Row className="align-items-center">
        <Col>
          <h1>Products</h1>
        </Col>
        <Col className="text-end">
          <Button className="btn-sm m-3" onClick={createProductHandler}>
            <FaEdit /> Create Product
          </Button>
        </Col>
      </Row>
      {isLoadingCreateProduct && <Loader />}
      {isLoadingDeleteProduct && <Loader />}
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error as any}</Message>
      ) : (
        <>
          <Table striped hover responsive className="table-sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>PRICE</th>
                <th>CATEGORY</th>
                <th>BRAND</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {data?.products?.map((product) => (
                <tr key={product._id}>
                  <td>{product._id}</td>
                  <td>{product.name}</td>
                  <td>{product.price}</td>
                  <td>{product.category}</td>
                  <td>{product.brand}</td>
                  <td>
                    <LinkContainer to={`/admin/products/${product._id}/edit`}>
                      <Button variant="light" className="btn-sm mx-2">
                        <FaEdit />
                      </Button>
                    </LinkContainer>
                    <Button
                      variant="danger"
                      className="btn-sm"
                      onClick={() =>
                        deleteProductHandler(product._id as string)
                      }
                    >
                      <FaTrash />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </>
      )}
    </>
  );
};

export default ProductListPage;
