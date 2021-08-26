import React, { useState } from "react";
import privacy_policy from "../assets/privacy-policy-template.pdf";

/**
 * @author Saroj Sundara
 * @description this method is responsible for showing footer section
 * @returns JSX for Footer Screen
 */

export default function Footer(props) {
  const [email, setEmail] = useState("");
  const onEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const onHandleSubscribe = (e) => {
    console.log(email.length);
    e.preventDefault();
    const reg =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (email.length === 0) {
      alert("Email is empty!!");
    } else if (!reg.test(String(email).toLowerCase())) {
      alert("please give a valid email id");
      setEmail("");
    } else {
      alert("Thank you for subscribing!!");
      setEmail("");
    }
  };
  return (
    <div className="row footer-wrapper">
      <div className="col-4 text-center">
        <p className="head">About Company</p>
        <div className="body">
          <p>
            Neostore shopping site is a single point solution for quality and
            affordable products.
          </p>
          <p>
            Contact Information :<br />
            Email : contact@neosoft.com
            <br />
            Phone : +91 7823432345 Mumbai, India
          </p>
        </div>
      </div>
      <div className="col-4 text-center head">
        <p className="head">Information</p>
        <div className="body">
          <p>
            Terms and condition
            <br />
            Guidelines and return policy
            <br />
            Contact Us
            <br />
            <a href={privacy_policy} target="_blank">
              Privacy Policy
            </a>
            <br />
            <a href="/locate" target="_blank">
              Locate Us
            </a>
            <br />
          </p>
        </div>
      </div>
      <div className="col-4 text-center head">
        <p className="head">Newsletter</p>
        <div className="body">
          <p>
            Sign up to get latest offer and exciting discounts just by
            subscribing to our news letter
          </p>
          <input
            className="form-control"
            type="text"
            onChange={onEmailChange}
            placeholder="enter email"
          />
          <button
            onClick={onHandleSubscribe}
            className="btn btn-lg btn-success m-2"
          >
            Subscribe
          </button>
        </div>
      </div>
    </div>
  );
}
