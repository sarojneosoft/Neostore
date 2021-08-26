import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button } from "reactstrap";
import SelectCard from "./SelectCard";
import axios from "axios";
import { useHistory } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";


/**
 * @author Saroj Sundara
 * @description this method fetches the exsisting address data and show them in to the select address section
 * @returns JSX for Select Address Screen
 */

export default function SelectAddress() {
  let history = useHistory();

  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(false);

  const AddAddress = () => {
    history.push("/addaddress");
  };

  const loadAllAddress = async () => {
    setLoading(true);
    let token = localStorage.getItem("token");
    var config = {
      method: "GET",
      url: "https://neostore-api.herokuapp.com/api/user/address",
      headers: {
        Authorization: `${token}`,
      },
    };
    try {
      const callback = await axios(config);
      setAddresses(callback.data.data.address);
    } catch (error) {
      alert("unable to load address");
    }
    setLoading(false);
  };

  useEffect(() => {
    if (localStorage.getItem("cartLength") > 0) loadAllAddress();
    else history.push("/cart");
  }, []);
  return (
    <Container>
      <Row>
        <Col>
          {loading ? (
            <div class="d-flex justify-content-center">
              <div
                class="spinner-border text-danger"
                style={{ width: "2.2em", height: "2.2em" }}
                role="status"
              ></div>
              <span
                style={{ backgroundColor: "transparent", fontSize: "20px" }}
              >
                Loading.....
              </span>
            </div>
          ) : addresses.length === 0 ? (
            <>
              <p className="display-6">You don't have any address added.</p>
              <Button color="primary" size="lg" onClick={AddAddress}>
                Add New Address
              </Button>
            </>
          ) : (
            <>
              <p className="display-6">Previously added address</p>
              <Button color="primary" size="lg" onClick={AddAddress}>
                Add New Address
              </Button>
            </>
          )}
        </Col>
      </Row>
      <Row>
        {addresses.map((address, index) => (
          <Col md={4} key={index} className="m-2">
            <SelectCard data={address} />
          </Col>
        ))}
      </Row>
    </Container>
  );
}
