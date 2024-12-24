import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import {
  useGetOrderDetailsQuery,
  usePayOrderMutation,
  useGetPayPalClientIdQuery,
  useDeliverOrderMutation,
} from "../slices/ordersApiSlice";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { Col, ListGroup, Row, Image, Card, Button } from "react-bootstrap";
import {
  DISPATCH_ACTION,
  PayPalButtons,
  usePayPalScriptReducer,
} from "@paypal/react-paypal-js";
import { useAppSelector } from "../hooks";
import { authSelector } from "../selectors/authSelector";
import {
  CreateOrderActions,
  CreateOrderData,
  OnApproveActions,
  OnApproveData,
} from "@paypal/paypal-js";
import { toast } from "react-toastify";

const OrderDetailsPage = () => {
  const { id: orderId } = useParams();
  const {
    data: order,
    refetch,
    isLoading,
    error,
  } = useGetOrderDetailsQuery(orderId as string);

  const [payOrder, { isLoading: isLoadingPay }] = usePayOrderMutation();

  const [deliverOrder, { isLoading: isLoadingDeliver }] =
    useDeliverOrderMutation();

  const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();

  const {
    data: paypal,
    isLoading: isLoadingPayPal,
    error: errorPayPal,
  } = useGetPayPalClientIdQuery();

  const { userInfo } = useAppSelector(authSelector);

  useEffect(() => {
    if (!errorPayPal && !isLoadingPayPal && paypal?.clientId) {
      const loadPayPalScript = async () => {
        paypalDispatch({
          type: DISPATCH_ACTION.RESET_OPTIONS,
          value: { clientId: paypal?.clientId, currency: "USD" },
        });
        paypalDispatch({
          type: DISPATCH_ACTION.LOADING_STATUS,
          // @ts-expect-error
          value: "pending",
        });
      };
      if (order && !order.isPaid) {
        if (!window.paypal) {
          loadPayPalScript();
        }
      }
    }
  }, [order, paypal, paypalDispatch, isLoadingPayPal, errorPayPal]);

  const onApprove = (
    data: OnApproveData,
    actions: OnApproveActions
  ): Promise<void> => {
    return actions!.order!.capture().then(async (details) => {
      try {
        await payOrder({ orderId: orderId as string, details }).unwrap();
        refetch();
        toast.success("Payment successful");
      } catch (error: any) {
        toast.error(error?.data?.message || error.message);
      }
    });
  };

  const onApproveTest = async () => {
    await payOrder({ orderId: orderId as string, details: { payer: {} } });
    refetch();
    toast.success("Payment successful");
  };

  const onError = (error: any) => {
    toast.error(error.message);
  };

  const createOrder = (data: CreateOrderData, actions: CreateOrderActions) => {
    return actions.order
      .create({
        purchase_units: [
          {
            amount: {
              value: order!.totalPrice as unknown as string,
              currency_code: "USD",
            },
          },
        ],
        intent: "CAPTURE",
      })
      .then((orderId) => {
        return orderId;
      });
  };

  const deliverOrderHandler = async () => {
    try {
      await deliverOrder(orderId as string);
      refetch();
      toast.success("Order delivered");
    } catch (error: any) {
      toast.error(error?.data?.message || error.message);
    }
  };

  return isLoading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">
      {(error as any).data?.message || (error as any).error}
    </Message>
  ) : (
    <>
      <h1>Order {order?._id}</h1>
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Name: </strong>
                {order?.user.name}
              </p>
              <p>
                <strong>Email: </strong>
                {order?.user.email}
              </p>
              <p>
                <strong>Address: </strong>
                {order?.shippingAddress.address}, {order?.shippingAddress.city},{" "}
                {order?.shippingAddress.postalCode},{" "}
                {order?.shippingAddress.country}
              </p>
              {order?.isDelivered ? (
                <Message variant="success">
                  Delivered on {order.deliveredAt}
                </Message>
              ) : (
                <Message variant="danger">Not Delivered</Message>
              )}
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Payment Method</h2>
              <p>
                <strong>Method: </strong>
                {order?.paymentMethod}
              </p>
              {order?.isPaid ? (
                <Message variant="success">Paid on {order.paidAt}</Message>
              ) : (
                <Message variant="danger">Not paid</Message>
              )}
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Order Items</h2>
              {order?.orderItems.map((item, index) => (
                <ListGroup.Item key={index}>
                  <Row>
                    <Col md={1}>
                      <Image src={item.image} alt={item.name} fluid rounded />
                    </Col>
                    <Col>
                      <Link to={`/products/${item.product}`}>{item.name}</Link>
                    </Col>
                    <Col md={4}>
                      {item.qty} x ${item.price} = ${item.qty * item.price}
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Items:</Col>
                  <Col>${order?.itemsPrice}</Col>
                </Row>
                <Row>
                  <Col>Shipping:</Col>
                  <Col>${order?.shippingPrice}</Col>
                </Row>
                <Row>
                  <Col>Tax:</Col>
                  <Col>${order?.taxPrice}</Col>
                </Row>
                <Row>
                  <Col>Total:</Col>
                  <Col>${order?.totalPrice}</Col>
                </Row>
              </ListGroup.Item>
              {!order?.isPaid && (
                <ListGroup.Item>
                  {isLoadingPay && <Loader />}
                  {isPending ? (
                    <Loader />
                  ) : (
                    <div>
                      {/* <Button
                        onClick={onApproveTest}
                        style={{ marginBottom: "10px" }}
                      >
                        Test Pay Order
                      </Button> */}
                      <div>
                        <PayPalButtons
                          onApprove={onApprove}
                          createOrder={createOrder}
                          onError={onError}
                        ></PayPalButtons>
                      </div>
                    </div>
                  )}
                </ListGroup.Item>
              )}
              {isLoadingDeliver && <Loader />}
              {userInfo &&
                userInfo.isAdmin &&
                order?.isPaid &&
                !order.isDelivered && (
                  <ListGroup.Item>
                    <Button
                      type="button"
                      className="btn btn-block"
                      onClick={deliverOrderHandler}
                    >
                      Mard As Delivered
                    </Button>
                  </ListGroup.Item>
                )}
              {/* MARK AS DELIVERED PLACEHOLDER */}
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default OrderDetailsPage;
