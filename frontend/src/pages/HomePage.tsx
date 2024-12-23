import { Col, Row } from "react-bootstrap";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Product from "../components/Product";
import { useGetProductsQuery } from "../slices/productsApiSlice";
import { useSearchParams } from "react-router-dom";

const HomePage = () => {
  const [searchParams] = useSearchParams();
  const page = searchParams.get("page") || 1;
  const { data, isLoading, error } = useGetProductsQuery({
    pageNumber: Number(page),
  });

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
            {data?.products?.map((product) => (
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
