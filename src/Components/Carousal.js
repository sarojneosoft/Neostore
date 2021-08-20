import React,{useState} from 'react'
import "react-responsive-carousel/lib/styles/carousel.min.css"; 
import { Carousel } from 'react-responsive-carousel';



export default function Carousal(props) {

    const [prods, setprods] = useState(props.data)

    return (
        <Carousel autoPlay="true" infiniteLoop="true" interval="2000" stopOnHover="true" width="100%">
             {
                 prods.map((prod, index)=>(
                    <div key={index}>
                    <img src={prod.mainImage} style={{maxHeight : "60vh"}}/>
                    <p className="bg-dark text-white p-2 rounded" style={{marginBottom : "40px"}}>{prod.name}</p>
                 </div>
                 ))
             }
               
             
            </Carousel>
    )
}
