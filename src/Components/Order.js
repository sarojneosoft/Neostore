import React, { useState, useEffect } from "react";
import Checkout_Side from "./Checkout_Side";
import axios from "axios";
import { Container, Row, Col, Button } from "reactstrap";
import OrderCard from "./OrderCard";
import { useHistory } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Order() {
  let history = useHistory();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  const getAllOrders = async () => {
    let token = localStorage.getItem("token");
    if (!token) {
      alert("please log in first!");
      return history.replace("/login");
    }
    try {
      setLoading(true);
      const result = await axios.get(
        "https://neostore-api.herokuapp.com/api/order",
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );
      console.log("RESULT", result.data.data.orders);
      let tempArr = result.data.data.orders;
      tempArr.sort((a, b) => (a.createdAt > b.createdAt) ? -1 : 1)
      setOrders(tempArr);
    } catch (error) {
      alert("unable to load orders, error occured");
      console.log("ERROR", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    getAllOrders();
  }, []);

  const invoice = (order)=>{
    var monthOb = {
        0 : "Jan",
        1 : "Feb",
        2 : "Mar",
        3 : "Apr",
        4 : "May",
        5 : "Jun",
        6 : "Jul",
        7 : "Aug",
        8 : "Sep",
        9 : "Oct",
        10 : "Nov",
        11 : "Dec"
      }
    
      var dayOb = {
        0 : "Mon",
        1 : "Tue",
        2 : "Wed",
        3 : "Thu",
        4 : "Fri",
        5 : "Sat",
        6 : "Sun"
      }
    let date = new Date(order.createdAt);
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; 
    minutes = minutes < 10 ? '0'+minutes : minutes;
    let strTime = hours + ':' + minutes + ' ' + ampm;
    let actualDate = strTime+", "+dayOb[date.getDay()]+", "+ date.getDate()+"/"+ monthOb[date.getMonth()]+"/"+date.getFullYear();

     let invoiceOb = {
        items : order.items,
        id : order._id,
        date : actualDate
    }
    // console.log("ACC", order.items);
    // console.log("ACC", order._id);
    // console.log("ACC", order.createdAt);
    localStorage.setItem("invoiceOb", JSON.stringify(invoiceOb));
    history.push("/document")
}

  return (
    <div>
      <Container className="mt-2">
        <ToastContainer position="top-right" />
        <Row>
          <Col md={7}>
            <Checkout_Side />
          </Col>

          <Col md={5} className="mt-2">
            
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
            ) : (
              <span className="bg-dark text-white display-6 p-2 rounded">Order Section</span>
            )}
            
            {
            orders.map((order, index) => {
             let flag = false;
             return (
                <Row key={index} style={{border : "1px solid #000"}} className="m-4">
                    {
                        order.items.map((item, index) => (
                            <Row md={4} key={index} className="m-2">
                              <Col md={12}>
                                {
                                  item.productId !== null ? (
                                    <OrderCard
                                    data={item}
                                    createdAt={order.createdAt}
                                    count={order._id}
                                  />
                                  ) : (
                                    flag = true
                                  )
                                }
                               
                              </Col>
                              
                            </Row>
                          ))
                    }
                    <Row>
                      <Col md = {12}>{
                        flag ? (
                          <Button disabled color="dark"  size="lg" style={{marginLeft : "14%",}} className="mb-4">Invoice Unavailable</Button>
                        ) : (
                          <Button color="dark"  size="lg" style={{marginLeft : "14%",}} className="mb-4"  onClick={()=>invoice(order)}>Download Invoice as PDF</Button>
                        )
                      }
                    
                    </Col>
                    </Row>
                </Row>
             )
            }
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
}
