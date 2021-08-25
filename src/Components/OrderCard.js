import React from 'react';
import { useHistory } from 'react-router-dom';
import {
    Card,
    CardImg,
    CardText,
    CardBody,
    CardHeader,
  
  } from "reactstrap";

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

export default function OrderCard(props) {
    let image = props.data.productId.mainImage;
    let total = props.data.productId.price;
    let name = props.data.productId.name;
    let description = props.data.productId.description;
    let date = new Date(props.createdAt);

    let hours = date.getHours();
    let minutes = date.getMinutes();
    let ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; 
    minutes = minutes < 10 ? '0'+minutes : minutes;
    let strTime = hours + ':' + minutes + ' ' + ampm;
    let actualDate = strTime+", "+dayOb[date.getDay()]+", "+ date.getDate()+"/"+ monthOb[date.getMonth()]+"/"+date.getFullYear();
    let count = props.count;
    let quantity = props.data.quantity;
    let grandtotal = quantity * total;

    let history = useHistory();

   

    return (
        <div>
            <Card >
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
            <CardText tag="h5" className="mt-2">Placed on : {actualDate.toString()} </CardText>
            <CardText tag="h5" className="mt-2">Name : {name} </CardText>
            <CardText tag="h5" className="mt-2">Description : {description} </CardText>
            <CardText tag="h5">Price : {total} Rs.</CardText>
            <CardText tag="h5">Quantity : {quantity}</CardText>
            <CardText tag="h5">Total : {grandtotal} Rs.</CardText>
            
          </CardBody>
        </Card>
        </div>
    )
}
