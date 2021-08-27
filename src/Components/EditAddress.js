import React, { useState } from "react";
import { Container, Row, Col } from "reactstrap";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

/**
 * @author Saroj Sundara
 * @description  this method is responsible for editing the exsisting address data and send the updated data to backend
 * @param {props} takes address object as props
 * @returns JSX for Edit Address Screen
 */

export default function EditAddress(props) {
  let addressLine = props.data.addressLine;
  let pincode = props.data.pincode;
  let city = props.data.city;
  let state = props.data.state;
  let country = props.data.country;
  let id = props.data.id;
  console.log(id);

  const [addresslineAdd, setAddressLine] = useState(addressLine);
  const [pinAdd, setPin] = useState(pincode);
  const [cityAdd, setCity] = useState(city);
  const [stateAdd, setState] = useState(state);
  const [countryAdd, setCountry] = useState(country);

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
      toast.info("please give a valid pincode");
      setPin("");
      res = false;
    } else if (!/^[a-zA-Z ]+$/.test(cityAdd)) {
      toast.info("please enter a valid city name");
      setCity("");
      res = false;
    } else if (!/^[a-zA-Z ]+$/.test(stateAdd)) {
      toast.info("please enter a valid state name");
      setState("");
      res = false;
    } else if (!/^[a-zA-Z ]+$/.test(countryAdd)) {
      toast.info("please enter a valid country name");
      setCountry("");
      res = false;
    }
    return res;
  };

  const saveAddress = async (e) => {
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
        method: "PUT",
        url: `https://neostore-api.herokuapp.com/api/user/address/${id}`,
        headers: {
          Authorization: `${token}`,
        },
        data: addressOb,
      };
      try {
        const callback = await axios(config);
        toast.success("address updated");
        props.editFun(false);
        props.editAlert(true);
        
      } catch (error) {
        toast.error("unable to update address");
      }
    }
  };

  return (
    <Container>
      <ToastContainer position="top-center" />
      <Row>
        <Col md={12}>
          <p className="display-6 mt-2">Edit Address</p>
          <form className="text-center forml" style={{ height: "80vh" }}>
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
              <label id="email1" for="pincode" style={{ marginLeft: "-52%" }}>
                pincode
              </label>
              <input
                onChange={onPincodeChange}
                className="empMail"
                type="number"
                maxLength="6"
                id="pincode"
                placeholder="pincode"
                value={pinAdd}
                style={{ marginTop: "5px" }}
              />
            </p>
            <p style={{ marginTop: "-15px" }}>
              <label id="email1" for="city" style={{ marginLeft: "-57%" }}>
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
              <label id="email1" for="state" style={{ marginLeft: "-55%" }}>
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
              <label id="email1" for="country" style={{ marginLeft: "-52%" }}>
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
              onClick={saveAddress}
              type="submit"
              className="btn btn-lg btn-primary sub1 mt-4"
            >
              Update Address
            </button>
          </form>
        </Col>
      </Row>
    </Container>
  );
}
