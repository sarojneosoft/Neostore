import React from 'react';
import { useHistory } from 'react-router-dom';
import {
    Card,
    CardImg,
    CardText,
    CardBody,
    CardTitle,
    CardSubtitle,
    CardHeader,
    Button,
  } from "reactstrap";
import Document from './Document';

export default function OrderCard(props) {
    let image = props.data.productId.mainImage;
    let total = props.data.productId.price;
    let name = props.data.productId.name;
    let description = props.data.productId.description;
    let date = props.createdAt;
    let count = props.count;
    let quantity = props.data.quantity;
    let grandtotal = Number(total + total * 0.05).toFixed(2);

    let history = useHistory();

   const invoice = ()=>{
        let invoiceOb = {
            name,
            description,
            date,
            quantity,
            grandtotal,
            total,
            count
        }
        localStorage.setItem("invoiceOb", JSON.stringify(invoiceOb));
        history.push("/document")
   }

    return (
        <div>
            <Card>
          <CardImg
            top
            width="100%"
            src={image}
            alt="product image"
          />

          <CardBody>
          <CardHeader className="text-success">
            TRANSIT Order By : <br />ORDERID - {count}
            </CardHeader>
            <CardText tag="h5" className="mt-2">Placed on : {date} </CardText>
            <CardText tag="h5" className="mt-2">Name : {name} </CardText>
            <CardText tag="h5" className="mt-2">Description : {description} </CardText>
            <CardText tag="h5">Price : {total}</CardText>
            <CardText tag="h5">Quantity : {quantity}</CardText>
            <CardText tag="h5">Total Rs. {grandtotal} /-</CardText>
            <Button color="primary" className="mt-4" onClick={invoice}>Download Invoice as PDF</Button>
          </CardBody>
        </Card>
        </div>
    )
}
