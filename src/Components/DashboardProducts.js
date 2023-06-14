import React from "react";
import { Button, Table } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./CSS/DashboardProducts.css";
import { useDeleteProductMutation } from "../sevices/appApi";
import Pagination from "./Pagination";

const DashboardProducts = () => {
  const products = useSelector((state) => state.products);
  const user = useSelector((state) => state.user);

  const [deleteProduct, { isLoading, isSuccess }] = useDeleteProductMutation();

  //removing the product
  function handleDeleteProducts(id) {
    if (window.confirm("Are you sure?"))
      deleteProduct({ product_id: id, user_id: user._id });
  }

  function TableRow({ _id, name, price, pictures }) {
    return (
      <tr>
        <td>
          <img src={pictures[0].url} className="dashboard-product-preview" />
        </td>
        <td>{_id}</td>
        <td>{name}</td>
        <td>{price}</td>
        <td>
          <Button
            onClick={() => handleDeleteProducts(_id, user._id)}
            disabled={isLoading}
          >
            Delete
          </Button>
          &nbsp;
          <Link to={`/product/${_id}/edit`} className="btn btn-warning">
            Edit
          </Link>
        </td>
      </tr>
    );
  }

  return (
    <Table striped bordered hover responsive>
      <thead>
        <tr style={{ borderBottom: "2px solid black" }}>
          <th>Product_img</th>
          <th>Product_ID</th>
          <th style={{ width: "150px" }}>Product Name</th>
          <th>Product Price</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <Pagination
          data={products}
          RenderComponent={TableRow}
          pageLimit={1}
          dataLimit={5}
          tablePagination={true}
        />
      </tbody>
    </Table>
  );
};

export default DashboardProducts;
