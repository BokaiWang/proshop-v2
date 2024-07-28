import { Col, Row } from "react-bootstrap";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Product from "../components/Product";
import { useGetProductsQuery } from "../slices/productsApiSlice";

const HomePage = () => {
  const { data: products, isLoading, error } = useGetProductsQuery();

  if (error) {
    if ("status" in error) {
      const errMsg = JSON.stringify(error.data);

      return <Message variant="danger">{errMsg}</Message>;
    } else {
      return <Message variant="danger">{error.message}</Message>;
    }
  }

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <h1>Latest Products</h1>
          <Row>
            {products!.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
        </>
      )}
    </>
  );
};

export default HomePage;
