import React, { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../categories";
import categories from "../categories";
import { LinkContainer } from "react-router-bootstrap";
import "./CSS/Homepage.css";
import axios from "../axios";
import { useDispatch, useSelector } from "react-redux";
import { updateProducts } from "../features/productSlice";
import ProductPreview from "../Components/ProductPreview";

const HomePage = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);
  const lastProducts = products.slice(0, 8);
  useEffect(() => {
    axios.get("/products").then(({ data }) => dispatch(updateProducts(data)));
  }, []);
  return (
    <div>
      <img src="https://wallpaperaccess.com/full/2483960.jpg" />
      <div className="featured-products-container container mt-4">
        <h2>Last products</h2>
        <div className="d-flex justify-content-center flex-wrap">
          {lastProducts.map((product, idx) => (
            <ProductPreview key={idx} {...product} />
          ))}
        </div>
        <div>
          <Link
            to="/category/all-products"
            style={{
              textAlign: "right",
              display: "block",
              textDecoration: "none",
            }}
          >
            See more {">>"}
          </Link>
        </div>
      </div>
      {/* sale banner */}
      <div className="sale_banner--container mt-4">
        <img src="https://cdn.whufc.com/sites/default/files/inline-images/big-sale-article.jpg" />
      </div>
      <div className="recent-products-container container mt-4">
        <h2>Categories</h2>
        <Row>
          {categories?.map((category, idx) => (
            <LinkContainer
              key={idx}
              to={`/category/${category.name.toLocaleLowerCase()}`}
            >
              <Col md={4}>
                <div
                  style={{
                    backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${category.img})`,
                    gap: "10px",
                  }}
                  className="category-tile"
                >
                  {category.name}
                </div>
              </Col>
            </LinkContainer>
          ))}
        </Row>
      </div>
    </div>
  );
};

export default HomePage;
