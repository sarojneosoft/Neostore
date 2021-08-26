import React, { useState, useEffect, useContext } from "react";
import {
  Container,
  Row,
  Col,
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Button,
} from "reactstrap";
import Pagination from "@material-ui/lab/Pagination";
import axios from "axios";
import HomeCard from "./HomeCard";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { SearchContext } from "../context/DetailContext";
import { SEARCH_PRO } from "../context/action.type";

/**
 * @author Saroj Sundara
 * @description this function contains the loadProducts function which will load all the products from the API, three specific methods onCategoryChange, onColorChange and onSortChange will monitor all the filters being applied 
 * @returns JSX for All Products Screen
 */

export default function AllProduct(props) {
  const { search, searchDispatch } = useContext(SearchContext);
  const [loading, setLoading] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [loadcolor, setLoadcolor] = useState("");
  const [loadcategory, setLoadcategory] = useState("");
  const [loadsort, setLoadsort] = useState("");
  const [loadOrder, setLoadOrder] = useState("");
  const toggle = () => setDropdownOpen((prevState) => !prevState);
  const [color, setColor] = useState(false);
  const toggleColor = () => setColor((prevState) => !prevState);
  const [sort, setSort] = useState(false);
  const toggleSort = () => setSort((prevState) => !prevState);
  const [page, setPage] = useState(1);
  const [allproducts, setAllproducts] = useState([]);
  const [isAll, setIsAll] = useState(true);
  const [pagesPag, setPages] = useState(0);

  const loadAllTheProducts = () => {
    setLoadcolor("");
    setLoadcategory("");
    setLoadsort("");
    setLoadOrder("");
    searchDispatch({
      type: SEARCH_PRO,
      payload: "",
    });
  };

  const onCategoryChange = async (e) => {
    searchDispatch({
      type: SEARCH_PRO,
      payload: "",
    });
    let category = e.target.value;
    if (category === "table") setLoadcategory("6065c425f45ada6429eb42c9");
    else if (category === "sofa") setLoadcategory("6065c3a524fe1963df4f2d16");
    else if (category === "bed") setLoadcategory("6065c425f45ada6429eb42c7");
    else if (category === "cupboard")
      setLoadcategory("6065c425f45ada6429eb42c7");
    else if (category == "remove") setLoadcategory("");
  };
  const onColorChange = (e) => {
    let color = e.target.value;
    if (color === "red") setLoadcolor("6065ca16cec0196a6fe56e3a");
    else if (color === "yellow") setLoadcolor("6065ca24cec0196a6fe56e3d");
    else if (color === "blue") setLoadcolor("6065ca1bcec0196a6fe56e3b");
    else if (color === "remove") setLoadcolor("");
  };
  const onSortChange = (e) => {
    let sortVal = e.target.value;
    if (sortVal === "ratings low") {
      setLoadsort("rating");
      setLoadOrder("asc");
    } else if (sortVal === "ratings high") {
      setLoadsort("rating");
      setLoadOrder("desc");
    } else if (sortVal === "price low") {
      setLoadsort("price");
      setLoadOrder("asc");
    } else if (sortVal === "price high") {
      setLoadsort("price");
      setLoadOrder("desc");
    } else if (sortVal === "remove") {
      setLoadsort("");
      setLoadOrder("");
    }
  };

  const loadProducts = async () => {
    setLoading(true);
    try {
      let url = "";
      if (search)
        url = `https://neostore-api.herokuapp.com/api/product?&limit=19`;
      else
        url = `https://neostore-api.herokuapp.com/api/product?page=${page}&limit=6`;

      if (loadcolor !== "") {
        url = url + `&color=${loadcolor}`;
      }
      if (loadcategory !== "") {
        url = url + `&category=${loadcategory}`;
      }
      if (loadsort !== "") {
        url = url + `&sortby=${loadsort}`;
      }
      if (loadOrder !== "") {
        url = url + `&orderby=${loadOrder}`;
      }
      console.log(url);
      const res = await axios.get(url, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      setLoading(false);
      let response = res.data.data.docs;
      if (search) {
        response = response.filter((res) =>
          (" " + res.name.toLowerCase() + " ").includes(
            " " + search.toLowerCase() + " "
          )
        );
        setPages(1);
        setAllproducts(response);
      } else {
        setPages(res.data.data.pages);
        setAllproducts(response);
      }
    } catch (error) {
      alert("unable to fetch products!!");
    }
  };

  useEffect(() => {
    loadProducts();
  }, [page, loadcolor, loadcategory, loadsort, loadOrder, isAll, search]);

  return (
    <div>
      <ToastContainer position="bottom-center" />

      <Container>
        <Row>
          <Row
            className="border border-dark rounded mt-2 bg-warning"
            style={{ position: "sticky", top: "12%", zIndex: "1" }}
          >
            <Col md={12}>
              <Button
                color="dark"
                className="mt-4 btn btn-lg"
                style={{ width: "20%", float: "left", marginLeft: "5%" }}
                onClick={loadAllTheProducts}
              >
                All Products
              </Button>
              <br />

              <ButtonDropdown
                isOpen={dropdownOpen}
                toggle={toggle}
                style={{
                  width: "20%",
                  float: "left",
                  marginLeft: "5%",
                  paddingBottom: "15px",
                }}
                size="lg"
              >
                <DropdownToggle caret color="dark">
                  {loadcategory === "" ? "category off" : "category on"}
                </DropdownToggle>
                <DropdownMenu
                  onClick={onCategoryChange}
                  style={{ width: "100%", fontSize: "20px" }}
                >
                  <DropdownItem value="table">table</DropdownItem>
                  <DropdownItem value="sofa">sofa</DropdownItem>
                  <DropdownItem value="bed">bed</DropdownItem>
                  <DropdownItem value="cupboard">cupboard</DropdownItem>
                  {loadcategory ? (
                    <DropdownItem
                      value="remove"
                      style={{ backgroundColor: "crimson", color: "white" }}
                    >
                      remove filter
                    </DropdownItem>
                  ) : (
                    ""
                  )}
                </DropdownMenu>
              </ButtonDropdown>
              <ButtonDropdown
                isOpen={color}
                toggle={toggleColor}
                style={{ width: "20%", float: "left", marginLeft: "5%" }}
                size="lg"
              >
                <DropdownToggle caret color="dark">
                  {loadcolor === "" ? "colors off" : "colors on"}
                </DropdownToggle>
                <DropdownMenu
                  onClick={onColorChange}
                  style={{ width: "100%", fontSize: "20px" }}
                >
                  <DropdownItem value="red">red</DropdownItem>
                  <DropdownItem value="yellow">yellow</DropdownItem>
                  <DropdownItem value="blue">blue</DropdownItem>
                  {loadcolor ? (
                    <DropdownItem
                      value="remove"
                      style={{ backgroundColor: "crimson", color: "white" }}
                    >
                      remove filter
                    </DropdownItem>
                  ) : (
                    ""
                  )}
                </DropdownMenu>
              </ButtonDropdown>

              <ButtonDropdown
                isOpen={sort}
                toggle={toggleSort}
                style={{ width: "20%", float: "left", marginLeft: "5%" }}
                size="lg"
              >
                <DropdownToggle caret color="dark">
                  {loadsort === "" ? "sort off" : "sort on"}
                </DropdownToggle>
                <DropdownMenu
                  onClick={onSortChange}
                  style={{ width: "100%", fontSize: "20px" }}
                >
                  <DropdownItem value="ratings low">ratings low</DropdownItem>
                  <DropdownItem value="ratings high">ratings high</DropdownItem>
                  <DropdownItem value="price low">price low</DropdownItem>
                  <DropdownItem value="price high">price high</DropdownItem>
                  {loadsort ? (
                    <DropdownItem
                      value="remove"
                      style={{ backgroundColor: "crimson", color: "white" }}
                    >
                      remove filter
                    </DropdownItem>
                  ) : (
                    ""
                  )}
                </DropdownMenu>
              </ButtonDropdown>
            </Col>
          </Row>
          <Row>
            <Col md={12}>
              <Row className="mt-4">
                {allproducts.map((prod, index) => (
                  <Col md={4} key={index}>
                    <HomeCard data={prod} />
                  </Col>
                ))}
              </Row>
              {loading ? (
                <div class="d-flex justify-content-center">
                  <div
                    class="spinner-border text-danger"
                    style={{ width: "2.2em", height: "2.2em" }}
                    role="status"
                  ></div>
                  <span
                    style={{ backgroundColor: "transparent", fontSize: "20px" }}
                  >
                    Loading.....
                  </span>
                </div>
              ) : allproducts.length === 0 ? (
                <div className="text-center">
                  <span className="display-6 text-center">
                    Sorry! product not available!
                  </span>
                  <br />{" "}
                  <img
                    src="https://thumbs.dreamstime.com/b/house-not-available-white-background-sign-label-flat-style-201430826.jpg"
                    width="50%"
                  />
                </div>
              ) : (
                <Pagination
                  size="large"
                  count={pagesPag}
                  color="primary"
                  showFirstButton={true}
                  showLastButton={true}
                  defaultPage={page}
                  onChange={(event, value) => {
                    setPage(value);
                  }}
                  className="mt-4"
                  style={{
                    marginLeft: "33%",
                    marginRight: "35%",
                    width: "100%",
                  }}
                />
              )}
            </Col>
          </Row>
        </Row>
      </Container>
    </div>
  );
}
