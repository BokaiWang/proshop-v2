import React from "react";
import { useGetTopProductsQuery } from "../slices/productsApiSlice";
import Loader from "./Loader";
import Message from "./Message";
import { Carousel, Image } from "react-bootstrap";
import { Link } from "react-router-dom";

const ProductCarousel = () => {
  const { data: topProducts, isLoading, error } = useGetTopProductsQuery();
  return isLoading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error as any}</Message>
  ) : (
    <Carousel fade pause="hover" className="bg-primary mb-4">
      {topProducts?.map((product) => (
        <Carousel.Item key={product._id}>
          <Link to={`/products/${product._id}`}>
            <Image src={product.image} alt={product.name} fluid />
            <Carousel.Caption className="carousel-caption">
              <h2>
                {product.name} (${product.price})
              </h2>
            </Carousel.Caption>
          </Link>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default ProductCarousel;
