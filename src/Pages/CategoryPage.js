import axios from "../axios";
import React, { useEffect, useState } from "react";
import { Col, Container, Form, InputGroup, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import Loading from "../Components/Loading";
import ProductPreview from "../Components/ProductPreview";
import "./CSS/CategoryPage.css";
import Pagination from "../Components/Pagination";

const CategoryPage = () => {
  const { category } = useParams();
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    setLoading(true);
    axios
      .get(`/products/category/${category}`)
      .then(({ data }) => {
        setLoading(false);
        setProducts(data);
      })
      .catch((e) => {
        setLoading(false);
        console.log(e.message);
      });
  }, [category]);

  if (loading) {
    <Loading />;
  }

  const productSearch = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const ProductsRender = ({ _id, category, name, pictures }) => {
    return(
      <ProductPreview _id={_id} category={category} name={name} pictures={pictures} />
    )
  }

  return (
    <div className="category-page-container">
      <div
        className={`pt-3 ${category}-banner-container category-banner-container`}
      >
        <h1 className="text-center">
          {" "}
          {category.charAt(0).toUpperCase() + category.slice(1)}{" "}
        </h1>
      </div>
      <div className="filters-container d-flex justify-content-center pt-4 pb-4">
        <Container>
          <Row className="justify-content-md-center">
            <Col xs={4}>
              <InputGroup className="mb-3">
                <Form.Control
                  type="search"
                  placeholder="Search products here..."
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </InputGroup>
            </Col>
          </Row>
        </Container>
      </div>

      {productSearch.length === 0 ? (
        <h1>No products to show</h1>
      ) : (
        <Container>
          <Row>
            <Col md={{ span: 10, offset: 1 }}>
                <Pagination
                  data={productSearch}
                  RenderComponent={ProductsRender}
                  pageLimit={1}
                  dataLimit={6}
                />
            </Col>
          </Row>
        </Container>
      )}
    </div>
  );
};

export default CategoryPage;
