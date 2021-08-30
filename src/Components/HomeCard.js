import React, { useState, useContext } from "react";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  Button,
} from "reactstrap";
import Rating from "@material-ui/lab/Rating";
import Box from "@material-ui/core/Box";
import { useHistory } from "react-router-dom";
import {
  ADD_DETAILS,
  ADD_TO_CART,
} from "../context/action.type";
import { DetailContext, CartContext } from "../context/DetailContext";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

/**
 * @author Saroj Sundara
 * @description this method is responsible for generating cards for a product
 * @param {props} takes product data as props
 * @returns JSX for Product Card
 */

export default function HomeCard(props) {
  const { dispatch } = useContext(DetailContext);
  const { cartDispatch } = useContext(CartContext);
  const [loading, setLoading] = useState(false);
  const [isClikced, setIsClikced] = useState(false);

  let history = useHistory();
  let cardImage = props.data.mainImage;

  if (!cardImage)
    cardImage =
      "https://media.architecturaldigest.com/photos/5f4e9c54072307c75638c0f1/1:1/w_1280%2Cc_limit/Screen%252520Shot%2525202020-09-01%252520at%2525203.08.43%252520PM.png";
  let cardTitle = props.data.name;
  let cardPrice = props.data.price;
  let cardRating = props.data.avgRating;
  let subImage1 = props.data.subImages[0];
  let subImage2 = props.data.subImages[1];
  let color = props.data.color.name;
  let description = props.data.description;
  let features = props.data.features;
  let id = props.data._id;


  const sendToProductDetails = () => {
    const details = {
      cardImage,
      cardTitle,
      cardPrice,
      cardRating,
      subImage1,
      subImage2,
      color,
      description,
      features,
      id,
    };
    dispatch({
      type: ADD_DETAILS,
      payload: details,
    });
    setIsClikced(true);
    history.push("/productdetails");
  };

  const addProductToCart = () => {
    setLoading(true);

    let productOb = {
      productId: id,
      quantity: 1,
    };

    let token = localStorage.getItem("token");
    let config = {
      method: "post",
      url: "https://neostore-api.herokuapp.com/api/cart",
      data: productOb,
      headers: {
        Authorization: `${token}`,
      },
    };
    axios(config)
      .then((res) => {
        setLoading(false);
        if (res.status === 200) {
          toast.info("added to cart successfully");

          const prod = {
            id,
            cardPrice,
          };

          cartDispatch({
            type: ADD_TO_CART,
            payload: prod,
          });
        }
      })
      .catch((err) => {
        setLoading(false);
        toast.error("product already added to cart!");
      });
  };

  return (
    <div>
      <Card className="cardhover rounded mt-2">
        <CardImg
          onClick={sendToProductDetails}
          top
          width="100%"
          src={cardImage}
          alt="product image"
          style={{ height: "40vh" }}
        />
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
        <CardBody>
          <CardTitle
            style={{ height: "6vh" }}
            tag="h5"
            onClick={sendToProductDetails}
          >
            {cardTitle}
          </CardTitle>
          <CardText>Rs. {cardPrice} /-</CardText>
          <Button color="danger" className="mb-3" onClick={addProductToCart}>
            Add To Cart
          </Button>
          <Box component="fieldset" mb={3} borderColor="transparent">
            <Rating name="simple-controlled" value={cardRating} readOnly />
          </Box>
        </CardBody>
      </Card>
    </div>
  );
}
