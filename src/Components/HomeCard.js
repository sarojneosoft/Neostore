import React, {useState, useContext} from "react";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button,
} from "reactstrap";
import Rating from "@material-ui/lab/Rating";
import Box from "@material-ui/core/Box";
import ProductDetails from "./ProductDetails";
import { useHistory } from "react-router-dom";
import { ADD_DETAILS, ADD_TO_CART, REMOVE_FROM_CART } from "../context/action.type";
import { DetailContext, CartContext } from "../context/DetailContext";
import axios from "axios";

// import { Container, Row, Col, Button } from "reactstrap";

import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

export default function HomeCard(props) {

  const {dispatch} = useContext(DetailContext);
  const {cartDispatch} = useContext(CartContext);
  const [loading, setLoading] = useState(false)

  let history = useHistory()

  const [isClikced, setIsClikced] = useState(false);

  let cardImage = props.data.mainImage;
  let cardTitle = props.data.name;
  let cardPrice = props.data.price;
  let cardRating = props.data.avgRating;
  let subImage1 = props.data.subImages[0];
  let subImage2 = props.data.subImages[1];
  let color = props.data.color.name;
  let description = props.data.description;
  let features = props.data.features;
  let id = props.data._id;


  console.log(props.data.avgRating);

  const sendToProductDetails = ()=>{
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
      id
    }
    dispatch({
      type : ADD_DETAILS,
      payload : details
    })
    setIsClikced(true);
    // alert("added")
    history.push("/productdetails")
  }

  const addProductToCart = ()=>{

    setLoading(true);

    let productOb = {
      productId : id,
      quantity: 1
    } 


    let token = localStorage.getItem('token');
                 let config = {
                   method: 'post',
                   url: 'https://neostore-api.herokuapp.com/api/cart',
                   data : productOb,
                   headers : {
                       'Authorization' : `${token}`
                   }
                 }
                  axios(config)
             .then(res =>{
               setLoading(false);
               console.log("SUCCESS", res);
               if(res.status === 200){
                toast.info("added to cart successfully")
                //  alert("added to cart successfully");
                 const prod = {
                  id,
                  cardPrice
                }
           
                cartDispatch({
                  type : ADD_TO_CART,
                  payload : prod
                })
               }
             })
             .catch(err => {
               setLoading(false);
               console.log("ERROR", err);
               alert("unable to add product to cart!")
             })

    
  }
 
  const removeProductFromCart = ()=>{
    dispatch({
      type : REMOVE_FROM_CART,
      payload : id
    })
  }
  

  return (
     
    <div>
          <Card className="cardhover">
          <CardImg
            onClick={sendToProductDetails}
            top
            width="100%"
            src={cardImage}
            alt="product image"
          />
           {
        loading ? <div class="d-flex justify-content-center">
        <div class="spinner-border text-danger" style={{width:"2.2em", height:"2.2em"}} role="status">
        </div>
        <span style={{backgroundColor : "transparent", fontSize:"20px"}}>Loading.....</span>
      </div>: ""
      }
          <CardBody>
            <CardTitle tag="h5" onClick={sendToProductDetails}>{cardTitle}</CardTitle>
            <CardText>Rs. {cardPrice} /-</CardText>
            <Button color="danger" className="mb-4" onClick={addProductToCart}>Add To Cart</Button>
            <Box component="fieldset" mb={3} borderColor="transparent" >
          <Rating
            name="simple-controlled"
            value={cardRating}
            readOnly
          />
        </Box>
          </CardBody>
        </Card>      
    </div>
  )
}
