import React,{useState, useRef, useEffect, useContext} from 'react'
import {
    Card,
    CardImg,
    CardText,
    CardBody,
    CardTitle,
    CardSubtitle,
    Button,
  } from "reactstrap";
  import {FaTrashAlt} from 'react-icons/fa'

  import axios from "axios";
import { CHANGE_QUANTITY, REMOVE_FROM_CART } from "../context/action.type";
import { CartContext } from "../context/DetailContext";
import { useHistory } from 'react-router-dom';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

export default function CartImage(props) {
  
  const history = useHistory()
  const {cart, cartDispatch} = useContext(CartContext);

    let image = props.data.productId.mainImage;
    let title = props.data.productId.name; 
    let price = props.data.productId.price;
    let id = props.data._id;
    let totalPrice = 0;
    const [quantity_duplicate, setDup] = useState(props.data.quantity);

   
    totalPrice = price * quantity_duplicate;
    // let deleteProducts = props.deleteProduct;
    // console.log(deleteProducts);
   
    const incre = ()=>{
      let quantOb = {
        quantity : quantity_duplicate + 1
      }
      console.log(quantOb);
      
       let token = localStorage.getItem('token');
         let config = {
           method : "PUT",
           url : `https://neostore-api.herokuapp.com/api/cart/${id}`,
           headers: {
             'Authorization' : `${token}`
           },
           data : quantOb
         }
 
          axios(config)
         .then(res => {
           console.log(res);
           setDup(quantity_duplicate + 1)
           cartDispatch({
            type : CHANGE_QUANTITY,
            payload : quantity_duplicate
          })
         })
         .catch(err => console.log(err))
      }

      const decre = ()=>{
        if(quantity_duplicate > 1){
        let quantOb = {
          quantity : quantity_duplicate - 1
        }
        console.log(quantOb);
        
         let token = localStorage.getItem('token');
           let config = {
             method : "PUT",
             url : `https://neostore-api.herokuapp.com/api/cart/${id}`,
             headers: {
               'Authorization' : `${token}`
             },
             data : quantOb
           }
   
            axios(config)
           .then(res => {
             console.log(res);
             setDup(quantity_duplicate - 1)
             cartDispatch({
              type : CHANGE_QUANTITY,
              payload : quantity_duplicate
            })
           })
           .catch(err => console.log(err))
          }  
      }
    
      // const removeProductFromCart = ()=>{
      //   dispatch({
      //     type : REMOVE_FROM_CART,
      //     payload : id
      //   })
      // }

      const deleteProduct = ()=>{
        let token = localStorage.getItem('token');
        let config = {
          method : 'DELETE',
          url : `https://neostore-api.herokuapp.com/api/cart/${id}`,
          headers: {
           'Authorization' : `${token}`
         }
        }
        
         axios(config).then(res =>{
        toast.error("deleted from cart successfully")

          cartDispatch({
            type : REMOVE_FROM_CART,
            payload : id
          })

         
          //  loadAllCartProducts()
        }).catch(err => console.log(err))
      }
  
    

    
    return (

<div class="card mt-2" style={{maxWidth: "100%"}}>
  <div class="row no-gutters">
    <div class="col-md-3">
      <img src={image} class="card-img" alt="..." />
      <h5 class="card-title">{title}</h5>
        <p class="card-text">Status : <span className="text-success">In Stock</span></p>
    </div>
    <div class="col-md-9">
      <div class="card-body">
            <span className="col-md-2">
            <Button color="danger" onClick={decre}>-</Button>
             <input type="text" value={quantity_duplicate} readOnly className="quant"/>
            <Button color="danger" className="" onClick={incre}>+</Button>
            </span>
            <span className="eachItem col-md-3">{price}</span>
            <span className="total col-md-2">{totalPrice}</span>
            <FaTrashAlt className="trash col-md-2" onClick={()=>{
              deleteProduct()
            }}/>
      </div>
    </div>
  </div>
</div>


    )
}
