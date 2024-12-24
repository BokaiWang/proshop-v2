import { Col, Row } from "react-bootstrap";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Product from "../components/Product";
import { useGetProductsQuery } from "../slices/productsApiSlice";
import { useSearchParams, Link } from "react-router-dom";
import Paginate from "../components/Paginate";
import ProductCarousel from "../components/ProductCarousel";

const HomePage = () => {
  const [searchParams] = useSearchParams();
  const page = searchParams.get("page") || 1;
  const keyword = searchParams.get("keyword") || "";
  const { data, isLoading, error } = useGetProductsQuery({
    pageNumber: Number(page),
    keyword,
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
      {keyword ? (
        <Link className="btn btn-outline-primary mb-4" to="/">
          Go Back
        </Link>
      ) : (
        <ProductCarousel />
      )}
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
          <Paginate pages={data!.pages} page={data!.page} />
        </>
      )}
    </>
  );
};

export default HomePage;
