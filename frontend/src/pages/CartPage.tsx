import { FaTrash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import Message from "../components/Message";
import {
  Row,
  Col,
  ListGroup,
  Image,
  Form,
  Button,
  Card,
} from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../hooks";
import { cartSelector } from "../selectors/cartSelector";
import { addToCart, removeFromCart } from "../slices/cartSlice";
import { CartItem } from "../entities";
import { addDecimals } from "../utils/cartUtils";

const CartPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const cart = useAppSelector(cartSelector);
  const { cartItems } = cart;

  const onChangeQty = async (product: CartItem, qty: number) => {
    dispatch(addToCart({ ...product, qty }));
  };

  const onRemoveItem = async (itemId: string) => {
    dispatch(removeFromCart(itemId));
  };

  const proceedToCheckout = () => {
    navigate("/login?redirect=/shipping");
  };
  return (
    <Row>
      <Col md={8}>
        <h1 style={{ marginBottom: "20px" }}>Shopping Cart</h1>
        {cartItems.length === 0 ? (
          <Message>
            Your cart is empty. <Link to={"/"}>Go Back.</Link>
          </Message>
        ) : (
          <ListGroup variant="flush">
            {cartItems.map((item) => (
              <ListGroup.Item key={item._id}>
                <Row>
                  <Col md={2}>
                    <Image src={item.image} alt={item.name} rounded fluid />
                  </Col>
                  <Col md={3}>
                    <Link to={`/products/${item._id}`}>{item.name}</Link>
                  </Col>
                  <Col md={2}>${item.price}</Col>
                  <Col>
                    <Form.Control
                      as="select"
                      value={item.qty}
                      onChange={(e) =>
                        onChangeQty(item, Number(e.target.value))
                      }
                    >
                      {[...Array(item.countInStock).keys()].map((num) => (
                        <option key={num + 1} value={num + 1}>
                          {num + 1}
                        </option>
                      ))}
                    </Form.Control>
                  </Col>
                  <Col md={2}>
                    <Button
                      type="button"
                      variant="light"
                      onClick={() => onRemoveItem(item._id)}
                    >
                      <FaTrash />
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Col>
      <Col md={4}>
        <Card>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>
                Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)})
                items
              </h2>
              $
              {addDecimals(
                cartItems.reduce((acc, item) => acc + item.qty * item.price, 0)
              )}
            </ListGroup.Item>
            <ListGroup.Item>
              <Button
                type="button"
                className="btn-block"
                disabled={cartItems.length === 0}
                onClick={proceedToCheckout}
              >
                Proceed To Checkout
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  );
};

export default CartPage;
