import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "../axios";
import Loading from "./Loading";
import { Badge, Button, Modal, Table } from "react-bootstrap";
import Pagination from "./Pagination";

const OrdersAdminPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const products = useSelector((state) => state.products);
  const [ordersToShow, setOrdersToShow] = useState([]);
  const [show, setShow] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get("/orders")
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
    return <h1 className="text-center pt-4">No Orders Here</h1>;
  }

  const markShipped = (orderId, ownerId) => {
    axios
      .patch(`/orders/${orderId}/mark-shipped`, { ownerId })
      .then(({ data }) => setOrders(data))
      .catch((e) => console.log(e));
  };

  const showOrder = (productsObj) => {
    let productsToShow = products.filter((product) => productsObj[product._id]);
    productsToShow = productsToShow.map((product) => {
      const productCopy = { ...product };
      productCopy.count = productsObj[product._id];
      delete productCopy.description;
      return productCopy;
    });
    setShow(true);
    setOrdersToShow(productsToShow);
  };
  console.log(ordersToShow)

  function TableRow({ _id, count, owner, total, status, products, address }) {
    return (
      <tr>
        <td>{_id}</td>
        <td>{owner?.name}</td>
        <td>{count}</td>
        <td>{total}</td>
        <td>{address}</td>
        <td>
          {status === "processing" ? (
            <Button size="sm" onClick={() => markShipped(_id, owner?._id)}>
              Mark as shipped
            </Button>
          ) : (
            <Badge bg="success">Shipped</Badge>
          )}
        </td>
        <td>
          <span
            style={{
              cursor: "pointer",
              color: "red",
              backgroundColor: "black",
              padding: "4px 10px",
              borderRadius: "25px",
            }}
            onClick={() => showOrder(products)}
          >
            <i className="fa fa-eye"></i>
          </span>
        </td>
      </tr>
    );
  }

  return (
    <>
      <Table responsive striped bordered hover>
        <thead>
          <tr style={{ borderBottom: "2px solid black" }}>
            <th>Order_Id</th>
            <th>Client_Name</th>
            <th>Items</th>
            <th>Order Total</th>
            <th style={{ width: "150px" }}>Address</th>
            <th>Actions</th>
            <th>View Orders</th>
          </tr>
        </thead>
        <tbody>
          <Pagination
            data={orders}
            RenderComponent={TableRow}
            pageLimit={1}
            dataLimit={5}
            tablePagination={true}
          />
        </tbody>
      </Table>
      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Order Details</Modal.Title>
        </Modal.Header>
        {ordersToShow.map((order, idx) => (
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
    </>
  );
};

export default OrdersAdminPage;
