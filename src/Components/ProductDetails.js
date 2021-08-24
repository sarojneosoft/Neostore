import React, { useState, useContext } from "react";
import { Container, Row, Col, Button, Toast } from "reactstrap";

import { FaRupeeSign, FaShareAlt } from "react-icons/fa";
import {
  FacebookShareButton,
  FacebookIcon,
  TwitterIcon,
  WhatsappIcon,
  PinterestIcon,
  LinkedinIcon,
  TwitterShareButton,
  PinterestShareButton,
  WhatsappShareButton,
  LinkedinShareButton,
} from "react-share";
import { useHistory } from "react-router-dom";
import { DetailContext, CartContext } from "../context/DetailContext";
import {
  ADD_DETAILS,
  ADD_TO_CART,
  REMOVE_FROM_CART,
} from "../context/action.type";
import { isAuthenticated } from "./Auth";

import axios from "axios";

import Rating from "@material-ui/lab/Rating";
import Box from "@material-ui/core/Box";
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";

import ReactImageMagnify from "react-image-magnify";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: 500,
  },
}));

const labels = {
  1: "Useless",
  2: "Poor",
  3: "Ok",
  4: "Good",
  5: "Excellent",
};

const useStyles1 = makeStyles({
  root: {
    width: 200,
    display: "flex",
    alignItems: "center",
  },
});

export default function ProductDetails(props) {
  const [loading, setLoading] = useState(false);
  const { details, dispatch } = useContext(DetailContext);
  const [value1, setValue1] = React.useState(0);
  const [hover, setHover] = React.useState(0);
  const classes1 = useStyles();
  let history = useHistory();
  console.log("DET", details);
  let image = details.cardImage;
  let subImage1 = details.subImage1;
  let subImage2 = details.subImage2;
  let name = details.cardTitle;
  let price = details.cardPrice;
  let color = details.color;
  let ratings = details.cardRating;
  let description = details.description;
  let features = details.features;
  let id = details.id;
  // let clr = `bg-${color} text-${color}`
  let prodUrl = `Hey checkout this cool ${name} at neostore at only Rs. ${price}
  image link : ${image}`;
  let fburl = "https://neosoft.com";

  const [star, setStar] = useState(0);
  const [clicked, setClicked] = useState(false);
  const [main, setMain] = useState(image);
  const [isZoom, setIsZoom] = useState(false);
  const { cartDispatch } = useContext(CartContext);

  const manageClick = () => {
    if (clicked === false) setClicked(true);
  };
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  const changePhoto = (e) => {
    if (e.target.src === image) {
      setMain(image);
    } else if (e.target.src === subImage1) {
      setMain(subImage1);
    } else if (e.target.src === subImage2) {
      setMain(subImage2);
    }
  };

  const zoomImage = () => {
    if (isZoom) setIsZoom(false);
    else setIsZoom(true);
  };

  const addProductToCart = () => {
    if (!isAuthenticated()) {
      return history.replace("/login");
    }

    setLoading(true);

    let productOb = {
      productId: id,
      quantity: 1,
    };

    let token = localStorage.getItem("token");
    let config = {
      method: "post",
      url: "https://neostore-api.herokuapp.com/api/cart",
      data: productOb,
      headers: {
        Authorization: `${token}`,
      },
    };
    axios(config)
      .then((res) => {
        setLoading(false);
        console.log("SUCCESS", res);
        if (res.status === 200) {
          toast.info("added to cart successfully");

          const prod = {
            id,
            price,
          };

          cartDispatch({
            type: ADD_TO_CART,
            payload: prod,
          });
        }
      })
      .catch((err) => {
        setLoading(false);
        console.log("ERROR", err);
        toast.info("already added to the cart!");
      });
  };

  return (
    <div>
      <ToastContainer position="bottom-center" />
      <Container className="mt-4">
        <Row>
          <Col md={6} onMouseEnter={zoomImage} onMouseLeave={zoomImage}>
            <ReactImageMagnify
              {...{
                smallImage: {
                  isFluidWidth: true,
                  src: `${main}`,
                },
                largeImage: {
                  src: `${main}`,
                  width: 1400,
                  height: 2000,
                },
              }}
            />
          </Col>
          <Col md={6}>
            <div>
              {isZoom ? (
                ""
              ) : (
                <div>
                  <h1 className="display-5">{name}</h1>
                  <Box component="fieldset" mb={3} borderColor="transparent">
                    <Rating name="simple-controlled" value={ratings} readOnly />
                  </Box>
                  <h3>
                    Price :
                    <span className="text-success">
                      {price}
                      <FaRupeeSign />
                    </span>
                  </h3>
                  <h3>
                    Color: <span>{color}</span>
                  </h3>
                  <h3>
                    Share <FaShareAlt />
                  </h3>
                  <FacebookShareButton
                    url={image}
                    hashtag = {"#NeoSTORE"}
                    quote={`Hey checkout this cool ${name} at neostore at only ${price} Rs.`}
                    className="m-2"
                  >
                    <FacebookIcon size={42} round={true} />
                  </FacebookShareButton>
                  <TwitterShareButton 
                  url={prodUrl} 
                  hashtags = {["NeoSTORE", "New" , "Product"]} className="m-2">
                    <TwitterIcon size={42} round={true} />
                  </TwitterShareButton>
                  <WhatsappShareButton url={prodUrl} className="m-2">
                    <WhatsappIcon size={42} round={true} />
                  </WhatsappShareButton>
                  <LinkedinShareButton url={image} summary = {prodUrl} className="m-2">
                    <LinkedinIcon size={42} round={true} />
                  </LinkedinShareButton>
                  <br />
                  <Button
                    onClick={addProductToCart}
                    color="danger"
                    className="m-2"
                    size="lg"
                  >
                    add to cart
                  </Button>
                  <Button
                    onClick={manageClick}
                    color="success"
                    className="m-2"
                    size="lg"
                  >
                    rate product
                  </Button>
                  {clicked ? (
                    //               <Box component="fieldset" mb={3} borderColor="transparent">
                    //   <Rating
                    //     name="simple-controlled"
                    //     value = {star}
                    //     onChange={(event, newValue) => {
                    //        alert("rated successfully")
                    //       setStar(newValue);
                    //       setClicked(false)
                    //     }}
                    //   />
                    // </Box>
                    <div className={classes1.root}>
                      <Rating
                        className="mt-2"
                        name="hover-feedback"
                        value={value1}
                        precision={1}
                        size="large"
                        onChange={(event, newValue) => {
                          setValue1(newValue);
                          toast.info("rated successfully");
                          setStar(newValue);
                          setClicked(false);
                        }}
                        onChangeActive={(event, newHover) => {
                          setHover(newHover);
                        }}
                      />
                      {value1 !== null && (
                        <Box ml={2}>
                          {labels[hover !== -1 ? hover : value1]}
                        </Box>
                      )}
                    </div>
                  ) : (
                    ""
                  )}
                  <br />
                </div>
              )}
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            <Row className="mt-4">
              <Col>
                <img
                  onClick={changePhoto}
                  src={image}
                  alt="1st sub image"
                  width="100%"
                />
              </Col>
              <Col>
                <img
                  onClick={changePhoto}
                  src={subImage1}
                  alt="1st sub image"
                  width="100%"
                />
              </Col>
              <Col>
                <img
                  onClick={changePhoto}
                  src={subImage2}
                  alt="1st sub image"
                  width="100%"
                />
              </Col>
            </Row>
          </Col>
          <Col>
            <div className={classes.root}>
              <AppBar position="static" color="default" className="mt-4">
                <Tabs
                  value={value}
                  onChange={handleChange}
                  indicatorColor="primary"
                  textColor="primary"
                  variant="fullWidth"
                  aria-label="full width tabs example"
                >
                  <Tab label="Description" {...a11yProps(0)} />
                  <Tab label="Features" {...a11yProps(1)} />
                </Tabs>
              </AppBar>
              <SwipeableViews
                axis={theme.direction === "rtl" ? "x-reverse" : "x"}
                index={value}
                onChangeIndex={handleChangeIndex}
              >
                <TabPanel value={value} index={0} dir={theme.direction}>
                  {description}
                </TabPanel>
                <TabPanel value={value} index={1} dir={theme.direction}>
                  {features}
                </TabPanel>
              </SwipeableViews>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
