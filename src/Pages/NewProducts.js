import React, { useState } from "react";
import { Alert, Button, Col, Container, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./CSS/NewProducts.css";
import { useCreateProductMutation } from "../sevices/appApi";
import axios from "../axios";

const NewProducts = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [images, setImages] = useState([]);
  const [imgToRemove, setImgToRemove] = useState(null);
  const navigate = useNavigate();
  const [createProduct, { isError, error, isLoading, isSuccess }] =
    useCreateProductMutation();

  const showWidget = () => {
    const widget = window.cloudinary.createUploadWidget(
      {
        cloudName: "selva-app",
        uploadPreset: "Fun-Chaters",
      },
      (error, result) => {
        if (!error && result.event === "success") {
          setImages((prev) => [
            ...prev,
            { url: result.info.url, public_id: result.info.public_id },
          ]);
        }
      }
    );
    widget.open();
  };

  const handleRemovingImg = (imgObj) => {
    setImgToRemove(imgObj.public_id);
    axios
      .delete(`/images/${imgObj.public_id}`)
      .then((res) => {
        setImgToRemove(null);
        setImages((prev) =>
          prev.filter((img) => img.public_id !== imgObj.public_id)
        );
      })
      .catch((e) => console.log(e));
  };

  const handleSubmit = (e) => {
    e.preventDefault()
    if(!name || !description || !price || !category || !images.length){
      return alert("Please fill out all the fields")
    }
    createProduct({name, description, price, category, images}).then(({data})=>{
      if(data.length > 0){
        setTimeout(()=>{
          navigate("/")
        },1500)
      }
    })
  }

  return (
    <Container>
      <Row>
        <Col md={6} className="new-product_form--container">
          <Form style={{ width: "100%" }} onSubmit={handleSubmit}>
            <h1 className="mt-4">Create a product</h1>
            {isSuccess && (
              <Alert variant="success">product created successfully</Alert>
            )}
            {isError && <Alert variant="danger">{error.data}</Alert>}

            <Form.Group className="mb-3">
              <Form.Label>Product Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter product name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                placeholder="Enter product description"
                style={{ height: "100px" }}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Price(INR(₹))</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter product price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group
              className="mb-3"
              onChange={(e) => setCategory(e.target.value)}
            >
              <Form.Label>Category</Form.Label>
              <Form.Select>
                <option disabled selected>
                  {" "}
                  -- Select One --{" "}
                </option>
                <option value="technologies"> technologies </option>
                <option value="tablets"> tablets </option>
                <option value="phones"> phones </option>
                <option value="laptops"> laptops </option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Button type="button" onClick={showWidget}>
                Upload Images
              </Button>
              <div className="images-preview-container">
                {images.map((image, idx) => (
                  <div key={idx} className="image-preview">
                    <img src={image.url} />
                    {imgToRemove !== image.public_id && 
                    <i
                      className="fa fa-times-circle"
                      onClick={() => handleRemovingImg(image)}
                    ></i>}
                  </div>
                ))}
              </div>
            </Form.Group>

            <Form.Group>
              <Button disabled={isLoading || isSuccess} type="submit">
                Create Product
              </Button>
            </Form.Group>
          </Form>
        </Col>
        <Col md={6} className="new-product_image--container"></Col>
      </Row>
    </Container>
  );
};

export default NewProducts;
