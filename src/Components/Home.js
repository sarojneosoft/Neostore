
import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "reactstrap";
import { Redirect, useHistory, NavLink } from "react-router-dom";
import HomeCard from "./HomeCard";
import axios from "axios";
import Carousal from "./Carousal";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

/**
 * @author Saroj Sundara
 * @description 
 * @param 
 * @returns JSX for Home Screen
 */

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const getAllProducts = async () => {
    setLoading(true);
    try {
      const result = await axios.get(
        "https://neostore-api.herokuapp.com/api/product",
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("RESULT", result.data.data.docs);
      setProducts(result.data.data.docs);
    } catch (error) {
      alert("unable to load products");
      console.log("ERROR", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <Container>
      <ToastContainer position="bottom-center" />

      {products.length === 0 ? (
        <div class="d-flex justify-content-center">
          <div
            class="spinner-border text-danger"
            style={{ width: "2.2em", height: "2.2em" }}
            role="status"
          ></div>
          <span style={{ backgroundColor: "transparent", fontSize: "20px" }}>
            Loading.....
          </span>
        </div>
      ) : (
        <Row className="mt-4">
          <Carousal />
        </Row>
      )}

      <Row>
        <NavLink to="/allproducts" exact style={{textDecoration : "none"}} className="text-center mb-2">
          <span className=" bg-dark text-white" style={{ fontSize: "25px" }}>
            Check All Products
          </span>
        </NavLink>
        {loading ? (
          <div class="d-flex justify-content-center">
            <div
              class="spinner-border text-danger"
              style={{ width: "2.2em", height: "2.2em" }}
              role="status"
            ></div>
            <span style={{ backgroundColor: "transparent", fontSize: "20px" }}>
              Loading.....
            </span>
          </div>
        ) : (
          ""
        )}
        <h5 className="text-center">Popular Products</h5>
        <Row>
          {products.map((prod, index) => (
            <Col md={4} key={index} style={{marginTop : "10px"}}>
              <HomeCard data={prod} />
            </Col>
          ))}
        </Row>
      </Row>
    </Container>
  );
}
