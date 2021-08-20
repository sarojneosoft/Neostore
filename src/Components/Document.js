import React from "react";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import { PDFViewer } from "@react-pdf/renderer";
import Error from "./Error";

export default Document = () => {
  let invoice = JSON.parse(localStorage.getItem("invoiceOb"));

  return (
      <>
       {
         invoice ? (
          <PDFViewer style={{ width: "100%", height: "100vh" }}>
          <Document>
          <Page size="A4" style={{ backgroundColor: "#242B2E", color: "#fff" }}>
            <View>
              <Text
                style={{
                  display: "block",
                  margin: "auto",
                  fontSize: "30px",
                  backgroundColor: "crimson",
                  padding: "5px",
                }}
              >
                NeoSTORE Order Invoice
              </Text>
            </View>
    
            <View style={{marginTop : "10%"}}>
              <Text style={{ marginTop: "25px", marginLeft: "10px" }}>
                Product Name : {invoice.name}
              </Text>
              <Text style={{ marginTop: "25px", marginLeft: "10px" }}>
                Order Id : {invoice.count}
              </Text>
              <Text style={{ marginTop: "25px", marginLeft: "10px" }}>
                Product Description : {invoice.description}
              </Text>
              <Text style={{ marginTop: "25px", marginLeft: "10px" }}>
                Order date : {invoice.date}
              </Text>
              <Text style={{ marginTop: "25px", marginLeft: "10px" }}>
                Product Price : Rs. {invoice.total}/-
              </Text>
              <Text style={{ marginTop: "25px", marginLeft: "10px" }}>
                Product Quantity : {invoice.quantity}
              </Text>
              <Text style={{ marginTop: "25px", marginLeft: "10px" }}>
                Total Figure after GST : Rs. {invoice.grandtotal}/-
              </Text>
             
            </View>
            <View style={{backgroundColor : "#5DA3FA", marginTop: "20%"}}>
            <Text style={{padding : "10px"}}>
                NeoSTORE
              </Text>
              <Text style={{padding : "10px"}}>
                Mumbai, India
              </Text>
              <Text style={{padding : "10px"}}>
                Contact : customercare@neostore.in
              </Text>
                </View>
          </Page>
        </Document>
       </PDFViewer> 
    
         ) : (
           <Error />
         )
       }
      </>
    );
};
