import React, { useEffect, useState } from "react";
import axios from "../axios";
import Loading from "./Loading";
import { useSelector } from "react-redux";
import { Table } from "react-bootstrap";

const ClientsAdminPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get("/users")
      .then(({ data }) => {
        setLoading(false);
        setUsers(data);
      })
      .catch((e) => {
        setLoading(false);
        console.log(e);
      });
  }, []);

  if (loading) {
    return <Loading />;
  }

  if (users.length == 0)
    return <h1 className="text-center py-2"> No Users there </h1>;

  return (
    <>
      <Table responsive striped bordered hover>
        <thead>
          <tr style={{ borderBottom: "2px solid black" }}>
            <th>Client_ID</th>
            <th>Client_Name</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, idx) => (
            <tr key={idx}>
              <td>{user._id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};

export default ClientsAdminPage;
