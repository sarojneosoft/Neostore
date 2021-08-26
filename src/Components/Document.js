import React from "react";
import { Document, Page, Text, View } from "@react-pdf/renderer";
import { PDFViewer } from "@react-pdf/renderer";
import Error from "./Error";
import { Col, Container, Row } from "reactstrap";
import { useHistory } from "react-router-dom";


/**
 * @author Saroj Sundara
 * @description this method extract the information from order array, put them in to the pdf document
 * @returns JSX for Order Invoice Screen
 */

export default Document = () => {

   let history = useHistory();

  let invoice = JSON.parse(localStorage.getItem("invoiceOb"));
  if(invoice === null){
    history.goBack();
  }
  let grandtotal = 0;
  invoice.items = invoice.items.filter(
    (eachItem) => eachItem.productId !== null
  );
  invoice.items.forEach((eachInvo) => {
    grandtotal = grandtotal + eachInvo.quantity * eachInvo.productId.price;
  });


  return (
    <>
      {invoice.items.length > 0 ? (
        <PDFViewer style={{ width: "100%", height: "100vh" }}>
          <Document>
            <Page
              size="A4"
              style={{ backgroundColor: "#242B2E", color: "#fff" }}
            >
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

              <Container>
                <Row>
                  {invoice.items.map((eachInvo, index) => (
                    <Col md={10} key={index}>
                      <View style={{ marginTop: "2%" }}>
                        <Text style={{ marginTop: "20px", marginLeft: "10px" }}>
                          Serial No. : {index + 1}
                        </Text>
                        <Text style={{ marginTop: "20px", marginLeft: "10px" }}>
                          Product Name : {eachInvo.productId.name}
                        </Text>
                        <Text style={{ marginTop: "20px", marginLeft: "10px" }}>
                          Order Id : {invoice.id}
                        </Text>
                        <Text style={{ marginTop: "20px", marginLeft: "10px" }}>
                          Product Description : {eachInvo.productId.description}
                        </Text>
                        <Text style={{ marginTop: "20px", marginLeft: "10px" }}>
                          Order date : {invoice.date}
                        </Text>
                        <Text style={{ marginTop: "20px", marginLeft: "10px" }}>
                          Product Unit Price : Rs. {eachInvo.productId.price}/-
                        </Text>
                        <Text style={{ marginTop: "20px", marginLeft: "10px" }}>
                          Product Quantity : {eachInvo.quantity}
                        </Text>
                        <Text style={{ marginTop: "20px", marginLeft: "10px" }}>
                          Total Price : Rs.{" "}
                          {parseInt(eachInvo.quantity) *
                            parseInt(eachInvo.productId.price)}
                        </Text>
                        <Text style={{ marginTop: "10px", marginLeft: "10px" }}>
                          <span>
                            ------------------------------------------
                          </span>
                        </Text>
                      </View>
                    </Col>
                  ))}
                </Row>
                <Text style={{ marginTop: "25px", marginLeft: "10px" }}>
                  Total Figure after GST (5%) & rounding off : Rs.{" "}
                  {Math.round(grandtotal + grandtotal * 0.05)}
                </Text>
              </Container>

              <View
                style={{
                  backgroundColor: "#5DA3FA",
                  marginTop: "100%",
                  width: "100%",
                }}
              >
                <Text style={{ padding: "10px" }}>NeoSTORE</Text>
                <Text style={{ padding: "10px" }}>Mumbai, India</Text>
                <Text style={{ padding: "10px" }}>
                  Contact : customercare@neostore.in
                </Text>
              </View>
            </Page>
          </Document>
        </PDFViewer>
      ) : (
        <Error />
      )}
    </>
  );
};
