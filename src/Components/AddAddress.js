import React, { useState } from "react";
import Checkout_Side from "./Checkout_Side";
import { Container, Row, Col } from "reactstrap";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";



/**
 * @author Saroj Sundara
 * @description Add new address for the customer
 * @returns JSX for Add Address Screen
 */

export default function AddAddress() {
  let history = useHistory();

  const [addresslineAdd, setAddressLine] = useState("");
  const [pinAdd, setPin] = useState("");
  const [cityAdd, setCity] = useState("");
  const [stateAdd, setState] = useState("");
  const [countryAdd, setCountry] = useState("");

  const onAddressLineChange = (e) => {
    setAddressLine(e.target.value);
  };
  const onPincodeChange = (e) => {
    setPin(e.target.value);
  };
  const onCityChange = (e) => {
    setCity(e.target.value);
  };
  const onStateChange = (e) => {
    setState(e.target.value);
  };
  const onCountryChange = (e) => {
    setCountry(e.target.value);
  };

  const isOkay = () => {
    let res = true;
    if (addresslineAdd === "") {
      toast.error(" addressline field can not be empty!");
      res = false;
    } else if (pinAdd === "") {
      toast.error(" pincode field can not be empty!");
      res = false;
    } else if (cityAdd === "") {
      toast.error(" city field can not be empty!");
      res = false;
    } else if (stateAdd === "") {
      toast.error(" state field can not be empty!");
      res = false;
    } else if (countryAdd === "") {
      toast.error(" country field can not be empty!");
      res = false;
    } else if (
      pinAdd.length < 6 ||
      pinAdd.length > 6 ||
      /^[0-9]{6}$/.test(pinAdd) === false
    ) {
      alert("please give a valid pincode");
      setPin("");
      res = false;
    } else if (!/^[a-zA-Z ]+$/.test(cityAdd)) {
      alert("please enter a valid city name");
      setCity("");
      res = false;
    } else if (!/^[a-zA-Z ]+$/.test(stateAdd)) {
      alert("please enter a valid state name");
      setState("");
      res = false;
    } else if (!/^[a-zA-Z ]+$/.test(countryAdd)) {
      alert("please enter a valid country name");
      setCountry("");
      res = false;
    }
    return res;
  };

  const NewAddress = async (e) => {
    e.preventDefault();
    if (isOkay()) {
      let addressOb = {
        addressLine: addresslineAdd,
        pincode: pinAdd,
        city: cityAdd,
        state: stateAdd,
        country: countryAdd,
      };
      let token = localStorage.getItem("token");
      var config = {
        method: "POST",
        url: "https://neostore-api.herokuapp.com/api/user/address",
        headers: {
          Authorization: `${token}`,
        },
        data: addressOb,
      };
      try {
        await axios(config);
        toast.success("address added successfully");
        alert("address added successfully");
        history.goBack();
      } catch (error) {
        alert("unable to add address");
      }
    }
  };

  return (
    <Container>
      <ToastContainer position="bottom-center" />
      <Row>
        <Col md={7}>
          <Checkout_Side />
        </Col>
        <Col md={5}>
          <p className="bg-dark text-white display-6 rounded mt-2 text-center">
            Add Address
          </p>
          <form className="text-center forml" style={{ height: "90vh" }}>
            <p className="mt-2">
              <label id="email1" for="addressline">
                Address Line
              </label>
              <input
                onChange={onAddressLineChange}
                className="empMail"
                type="text"
                id="addressline"
                placeholder="address line"
                style={{ marginTop: "5px" }}
                value={addresslineAdd}
              />
            </p>
            <p style={{ marginTop: "-15px" }}>
              <label id="email1" for="pincode" style={{ marginLeft: "-50%" }}>
                pincode
              </label>
              <input
                className="empMail"
                type="text"
                id="pincode"
                placeholder="pincode"
                onChange={onPincodeChange}
                value={pinAdd}
                style={{ marginTop: "5px" }}
              />
            </p>
            <p style={{ marginTop: "-15px" }}>
              <label id="email1" for="city" style={{ marginLeft: "-55%" }}>
                city
              </label>
              <input
                onChange={onCityChange}
                className="empMail"
                type="text"
                id="pincode"
                placeholder="city"
                value={cityAdd}
                style={{ marginTop: "5px" }}
              />
            </p>
            <p style={{ marginTop: "-15px" }}>
              <label id="email1" for="state" style={{ marginLeft: "-52%" }}>
                state
              </label>
              <input
                onChange={onStateChange}
                className="empMail"
                type="text"
                id="state"
                placeholder="state"
                value={stateAdd}
                style={{ marginTop: "5px" }}
              />
            </p>
            <p style={{ marginTop: "-15px" }}>
              <label id="email1" for="country" style={{ marginLeft: "-50%" }}>
                country
              </label>
              <input
                onChange={onCountryChange}
                className="empMail"
                type="text"
                id="country"
                placeholder="country"
                value={countryAdd}
                style={{ marginTop: "5px" }}
              />
            </p>

            <button
              onClick={NewAddress}
              type="submit"
              className="btn btn-lg btn-primary sub1 mt-4"
            >
              Add Address
            </button>
            <button
              onClick={(e) => {
                e.preventDefault();
                history.goBack();
              }}
              type="submit"
              className="btn btn-lg btn-warning sub1 mt-2"
            >
              Cancel
            </button>
          </form>
        </Col>
      </Row>
    </Container>
  );
}
