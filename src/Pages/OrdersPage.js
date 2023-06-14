import React, { useEffect, useState } from "react";
import "./CSS/OrdersPage.css";
import { useSelector } from "react-redux";
import axios from "../axios";
import { Badge, Button, Container, Modal, Table } from "react-bootstrap";
import Loading from "../Components/Loading";

const OrdersPage = () => {
  const user = useSelector((state) => state.user);
  const products = useSelector((state) => state.products);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [orderToShow, setOrderToShow] = useState([]);
  const [show, setShow] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`users/${user._id}/orders`)
      .then(({ data }) => {
        setLoading(false);
        setOrders(data);
      })
      .catch((e) => {
        setLoading(false);
        console.log(e);
      });
  }, []);

  if (loading) {
    return <Loading />;
  }

  if (orders.length === 0) {
    return <h1 className="text-center pt-3">No Orders Here</h1>;
  }

  const showOrder = (productsObj) => {
    let productsToShow = products.filter((product) => productsObj[product._id]);
    productsToShow = productsToShow.map((product) => {
      const productCopy = { ...product };
      productCopy.count = productsObj[product._id];
      delete productCopy.description;
      return productCopy;
    });
    setShow(true);
    setOrderToShow(productsToShow);
  };

  return (
    <Container>
      <h1 className="text-center">Your Orders</h1>
      <Table responsive striped bordered hover>
        <thead>
          <tr>
            <th>Order_Id</th>
            <th>Status</th>
            <th>Date & Time</th>
            <th>Total</th>
            <th>View Orders</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order, idx) => (
            <tr key={idx}>
              <td>{order._id}</td>
              <td>
                <Badge
                  bg={`${order.status == "processing" ? "warning" : "success"}`}
                  text="white"
                >
                  {order.status}
                </Badge>
              </td>
              <td>{order.date}</td>
              <td>₹{order.total}</td>
              <td>
                <span
                  style={{
                    cursor: "pointer",
                    color: "red",
                    backgroundColor: "black",
                    padding: "4px 10px",
                    borderRadius: "25px",
                  }}
                  onClick={() => showOrder(order.products)}
                >
                  <i className="fa fa-eye"></i>
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Order Details</Modal.Title>
        </Modal.Header>
        {orderToShow.map((order, idx) => (
          <div
            key={idx}
            className="order-details_container d-flex justify-content-around py-2"
          >
            <img
              src={order.pictures[0].url}
              style={{ maxWidth: 100, height: 100, objectFit: "cover" }}
            />
            <p>
              <span>{order.count} x </span>
              {order.name}
            </p>
            <p>Price: ₹{Number(order.price) * order.count}</p>
          </div>
        ))}
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShow(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default OrdersPage;
