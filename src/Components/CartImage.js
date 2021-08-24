import React,{useState, useContext} from 'react'
import {Button,} from "reactstrap";
import {FaTrashAlt} from 'react-icons/fa'
import axios from "axios";
import { CHANGE_QUANTITY, REMOVE_FROM_CART } from "../context/action.type";
import { CartContext } from "../context/DetailContext";
import { useHistory } from 'react-router-dom';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import Modal from 'react-modal';

Modal.setAppElement('#root');

export default function CartImage(props) {
  
  const {cartDispatch} = useContext(CartContext);

    let image = props.data.productId.mainImage;
    let title = props.data.productId.name; 
    let price = props.data.productId.price;
    let id = props.data._id;
    let totalPrice = 0;
    const [quantity_duplicate, setDup] = useState(props.data.quantity);
    const [modalIsOpen, setIsOpen] = useState(false);
  
    const openModal = ()=> setIsOpen(true);
    const closeModal = ()=> setIsOpen(false);
   
    totalPrice = price * quantity_duplicate;
  
   
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
            <span className="eachItem col-md-1">{price} Rs.</span>
            <span className="total col-md-1">{totalPrice} Rs.</span>
            
            <FaTrashAlt className="trash col-md" onClick={()=>{
              openModal()
            }}/>
            <Modal
        isOpen={modalIsOpen}
        // onAfterOpen={afterOpenModal}
        shouldCloseOnOverlayClick = {false}
        shouldCloseOnEsc = {false}
        onRequestClose={closeModal}
        contentLabel="Product delete from cart"
        style={{
            overlay : {
                width : "100%",
                height :  "100vh",
                margin : "auto",
                backgroundColor : "rgb(0,0,0,0.5)"
                
               
            },
            content : {
                backgroundColor : "#242B2E",
                color : "#fff",
                fontSize : "20px",
                borderRadius : "20px",
                width : "40%",
                height : "32vh",
                margin : "auto"
            }
        }}
      >
        <p className="text-center m-4">Are you sure to delete the product from the cart ?</p>
        <button 
         onClick = {closeModal}
        className="btn btn-outline-warning mt-4" style={{float : "right", fontSize : "17px"}}>cancel</button>
        <button 
          onClick = {deleteProduct}
        className="btn btn-outline-danger  m-4 " style={{float : "right", fontSize : "17px"}}>proceed</button>
      </Modal>
      </div>
    </div>
  </div>
</div>


    )
}
