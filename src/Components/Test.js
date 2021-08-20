import React,{useEffect} from "react";
import { PDFViewer } from "@react-pdf/renderer";
import MyDocument from "./Document";
import { useHistory } from "react-router-dom";
export default function Test() {

  let history = useHistory();

 console.log(MyDocument);
 useEffect(()=>{
  if(!MyDocument)

    alert("hello")
 },[])

  return (
    <span>
      {
        MyDocument ? (
          <PDFViewer style={{ width: "100%", height: "100vh" }}>
        <MyDocument />
      </PDFViewer>
        ) : ("")
      }
      
    </span>
  );
}
