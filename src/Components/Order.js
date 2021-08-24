import React,{useState, useEffect} from 'react'
import Checkout_Side from './Checkout_Side'
import axios from 'axios';
import {Container, Row, Col} from 'reactstrap';
import OrderCard from './OrderCard';
import { useHistory} from 'react-router-dom';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

export default function Order() {

    let history = useHistory()

    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(false)

    const getAllOrders = async()=>{
        let token = localStorage.getItem('token');
        if(!token){
            alert("please log in first!");
            return history.replace("/login");
        }
        try{
            setLoading(true);
            const result = await axios.get("https://neostore-api.herokuapp.com/api/order", {
                headers: {
                    'Authorization' : `${token}`
                },
              })
              console.log("RESULT", result.data.data.orders);
              setOrders(result.data.data.orders);
        }catch(error){
            alert("unable to load orders");
            console.log("ERROR", error);
        }
        setLoading(false);
    }
    
     useEffect(()=>{
        getAllOrders();
     }, [])


    return (
        <div>
        <Container className="mt-2">
        <ToastContainer position="top-right" />

            <Row>
                <Col md={7}>
                     <Checkout_Side/> 
                </Col>
                
                <Col md={5}>
                {
        loading ? <div class="d-flex justify-content-center">
        <div class="spinner-border text-danger" style={{width:"2.2em", height:"2.2em"}} role="status">
        </div>
        <span style={{backgroundColor : "transparent", fontSize:"20px"}}>Loading.....</span>
      </div>: ""
      }
                     {
                        orders.map((order, index)=>{
                           return  order.items.map((item, index)=>(
                                <Row md={4} key={index} className="mt-2">
                                    <Col md={10}>
                                        <OrderCard data={item} createdAt = {order.createdAt} count={order._id}/>
                                    </Col>
                                 </Row>
                            ))
                        
                        })
                    }
                </Col>
            </Row>

        </Container>
       
        </div>
    )
}
