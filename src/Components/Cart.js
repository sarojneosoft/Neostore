import React, { useEffect, useState, useContext } from "react";
import { Container, Row, Col } from "reactstrap";
import Footer from "./Footer";
import Navbar from "./Navbar";
import CartImage from "./CartImage";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button,
  CardHeader,
} from "reactstrap";
import Axios from "axios";
import { REMOVE_FROM_CART } from "../context/action.type";
import { CartContext } from "../context/DetailContext";
import { useHistory } from "react-router-dom";
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'


export default function Cart() {
  let history = useHistory();

  const { cart, cartDispatch } = useContext(CartContext);

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const [subtotal, setSubtotal] = useState(0);
  const [gst, setGst] = useState(0);
  const [grandtotal, setGrandtotal] = useState(0);

  const loadAllCartProducts = async () => {
    setLoading(true);
    let token = localStorage.getItem("token");

    let config = {
      method: "GET",
      url: "https://neostore-api.herokuapp.com/api/cart",
      headers: {
        Authorization: `${token}`,
      },
    };

    await Axios(config)
      .then((res) => {
        console.log("NEWRES", res.data.data.products);
        setProducts(res.data.data.products);
        calculateTotal();
      })
      .catch((err) => console.log(err));
    setLoading(false);
  };

  const calculateTotal = () => {
    let total = 0;
    products.forEach((prod) => {
      console.log("tot", prod.totalAmount);
      total = total + Number(prod.totalAmount);
    });
    setSubtotal(total);
  };

  useEffect(() => {
    loadAllCartProducts();
  }, [cart]);

  useEffect(() => {
    calculateTotal();
  }, [products]);

  useEffect(() => {
    setGst(Number(subtotal * 0.05).toFixed(2));
    setGrandtotal(subtotal + Number(gst));
  }, [subtotal, gst]);

  const checkout = () => {
    if (subtotal === 0) {
      // alert("please add some product to cart!");
      toast.error("please add some product to cart!")

    } else {
      history.push("/address");
    }
  };

  // const deleteProduct = (id)=>{
  //   let token = localStorage.getItem('token');

  //   let config = {
  //     method : 'DELETE',
  //     url : `https://neostore-api.herokuapp.com/api/cart/${id}`,
  //     headers: {
  //      'Authorization' : `${token}`
  //    }
  //   }

  //    Axios(config).then(res =>{
  //     cartDispatch({
  //       type : REMOVE_FROM_CART,
  //       payload : id
  //     })
  //     //  loadAllCartProducts()
  //   }).catch(err => console.log(err))
  // }

  return (
    <div>
      {console.log(subtotal)}
      <ToastContainer position="top-center" />
    
      <Container>
        <Row>
          <Col md={8} className="mt-4">
            <Row>
              <Col md={3}>
                <span
                  className="p-2 bg-success text-white rounded"
                  style={{ fontSize: "20px" }}
                >
                  Product
                </span>
              </Col>
              <Col md={3}>
                <span
                  className="p-2 bg-success text-white rounded"
                  style={{ fontSize: "20px", marginLeft: "40px" }}
                >
                  Quantity
                </span>
              </Col>
              <Col md={2}>
                <span
                  className="p-2 bg-success text-white rounded"
                  style={{ fontSize: "20px", marginLeft: "40px" }}
                >
                  Price
                </span>
              </Col>
              <Col md={2}>
                <span
                  className="p-2 bg-success text-white rounded"
                  style={{ fontSize: "20px", marginLeft: "45px" }}
                >
                  Total
                </span>
              </Col>
              <Col md={1}>
                <span
                  className="p-2 bg-success text-white rounded"
                  style={{ fontSize: "20px" }}
                >
                  Delete
                </span>
              </Col>
            </Row>
            <Row>
             
              {loading ? (
                <div class="d-flex justify-content-center">
                  <div
                    class="spinner-border text-danger mt-4"
                    style={{ width: "2.2em", height: "2.2em" }}
                    role="status"
                  ></div>
                  <span
                    className="mt-4"
                    style={{ backgroundColor: "transparent", fontSize: "20px" }}
                  >
                    Loading.....
                  </span>
                
                </div>
              ) : (
                products.length === 0 ? (
                  <>
                  <p className="mt-4 display-5 text-center bg-dark text-white rounded">Cart is empty</p>
                  
                  <img src="https://www.metro-markets.com/plugins/user/images/emptycart.png" className="cartImage" />
                  </>
                ) : (
                  products.map((prod, index) => (
                    <Col md={12} key={index} className="mt-4">
                      <CartImage data={prod} />
                    </Col>
                  )
                )
               )
              )}
           
            </Row>
          </Col>
          <Col md={4}>
            <Card className="checkout">
              <CardBody>
                <CardTitle
                  tag="h5"
                  className="display-6 bg-dark text-white text-center"
                >
                  Review Order
                </CardTitle>
                <CardHeader className="mt-4 bg-primary text-white">
                  Subtotal<span className="price">{subtotal}/-</span>
                </CardHeader>
                <CardHeader className="mt-2 bg-primary text-white">
                  GST(5%)<span className="price">{gst}/-</span>
                </CardHeader>
                <CardHeader className="mt-2 bg-primary text-white">
                  Order Total<span className="price">{grandtotal}/-</span>
                </CardHeader>
                <Button
                  color="danger"
                  size="lg"
                  className="mt-4"
                  style={{ width: "100%" }}
                  onClick={checkout}
                >
                  Proceed To Buy
                </Button>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
     
    </div>
  );
}
