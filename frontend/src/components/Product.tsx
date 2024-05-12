import { FC } from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Product as ProductType } from "../entities";
import Rating from "./Rating";

interface Props {
  product: ProductType;
}

const Product: FC<Props> = ({ product }) => {
  return (
    <Card className="my-3 p-3 rounded">
      <Link to={`/products/${product._id}`}>
        <Card.Img src={product.image} variant="top" />
      </Link>
      <Card.Body>
        <Link to={`/products/${product._id}`}>
          <Card.Title as="div" className="product-title">
            <strong>{product.name}</strong>
          </Card.Title>
        </Link>
        <Card.Text as="div">
          <Rating rating={product.rating} numReviews={product.numReviews} />
        </Card.Text>
        <Card.Text as="h3">${product.price}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Product;
