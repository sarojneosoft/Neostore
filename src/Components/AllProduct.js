import React, { useState, useEffect , useContext} from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";
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
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { SearchContext } from "../context/DetailContext";

export default function AllProduct(props) {
  const {search, searchDispatch} = useContext(SearchContext);
  let yellow = "6065ca24cec0196a6fe56e3d";
  let red = "6065ca16cec0196a6fe56e3a";
  let blue = "6065ca1bcec0196a6fe56e3b"

  
  const [loading, setLoading] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [loadcolor, setLoadcolor] = useState("");
  const [loadcategory, setLoadcategory] = useState("");
  const [loadsort , setLoadsort] = useState("")
  const [loadOrder , setLoadOrder] = useState("")
  const toggle = () => setDropdownOpen((prevState) => !prevState);
  const [color, setColor] = useState(false);
  const toggleColor = () => setColor((prevState) => !prevState);
  const [sort, setSort] = useState(false);
  const toggleSort = () => setSort((prevState) => !prevState);
  const [page, setPage] = useState(1);
  const [allproducts, setAllproducts] = useState([]);
  let [prods, setProds] = useState([]);
  const [prodarray, setProdarray] = useState(allproducts);
  const [isAll, setIsAll] = useState(true);

  const [pagesPag, setPages] = useState(0);



  const loadAllTheProducts = () => {
      setLoadcolor("");
      setLoadcategory("");
      setLoadsort("");
      setLoadOrder("");
    // putProducts(1);
  };

  const onSearch = ()=>{
    if(search === "table")
    setLoadcategory("6065c425f45ada6429eb42c9")
    else if(search === "sofa")
     setLoadcategory("6065c3a524fe1963df4f2d16")
    else if(search === "bed")
        setLoadcategory("6065c425f45ada6429eb42c7")
    else if(search === "cupboard") 
        setLoadcategory("6065c425f45ada6429eb42c7") 
  }

  const onCategoryChange = async(e) => {
    // setIsAll(false)
    let category = e.target.value;
    if(category === "table")
    setLoadcategory("6065c425f45ada6429eb42c9")
    else if(category === "sofa")
     setLoadcategory("6065c3a524fe1963df4f2d16")
    else if(category === "bed")
        setLoadcategory("6065c425f45ada6429eb42c7")
    else if(category === "cupboard") 
        setLoadcategory("6065c425f45ada6429eb42c7")   
  };
  const onColorChange = (e) => {
    // setIsAll(false)
    let color = e.target.value;
    if(color === "red")
       setLoadcolor("6065ca16cec0196a6fe56e3a")
    else if(color === "yellow")
        setLoadcolor("6065ca24cec0196a6fe56e3d")
    else if(color === "blue")
        setLoadcolor("6065ca1bcec0196a6fe56e3b")
  };
  const onSortChange = (e) => {
    // setIsAll(false)
    let sortVal = e.target.value;
    if(sortVal === "ratings low"){
      setLoadsort("rating");
      setLoadOrder("asc");
    }else if(sortVal === "ratings high"){
      setLoadsort("rating");
      setLoadOrder("desc");
    }else if(sortVal === "price low"){
      setLoadsort("price");
      setLoadOrder("asc");
    }else if(sortVal === "price high"){
      setLoadsort("rating");
      setLoadOrder("desc");
    }
  };

  const putProducts = (index) => {
    let end = index * 10;
    let start = end - 10;
    prods = prodarray.slice(start, end);
  };
  const loadProducts = async () => {
    setLoading(true)
    try {
       let url = `https://neostore-api.herokuapp.com/api/product?page=${page}&limit=6`
      // let url = `https://neostore-api.herokuapp.com/api/product?category=${loadcategory}&color=${loadcolor}&sortby=${loadsort}&orderby=${loadOrder}&page=${page}&limit=6`
        if(loadcolor !== ""){
          url = url + `&color=${loadcolor}`;
        }if(loadcategory !== ""){
          url = url + `&category=${loadcategory}`;
        }if(loadsort !== ""){
          url = url + `&sortby=${loadsort}`;
        }if(loadOrder !== ""){
            url  = url + `&orderby=${loadOrder}`
        }  
        console.log(url);
      const res = await axios.get(
        url,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setLoading(false)
      console.log("RESPONSE", res.data.data.docs);
      setPages(res.data.data.pages);
      setAllproducts(res.data.data.docs);
      putProducts(1);
    } catch (error) {
      console.log("ERROR", error);
      alert("unable to fetch products!!");
    }
  };

  useEffect(() => {
    loadProducts();
    
  }, [page, loadcolor, loadcategory, loadsort, loadOrder ,isAll]);

  useEffect(()=>{
    onSearch();
  },[search])

  return (
    <div>
      <ToastContainer position="bottom-center" />
     
      <Container>
        <Row>
          <Col md={3}>
            <Button
              color="dark"
              className="mt-4 btn btn-lg"
              style={{width : "60%"}}
              onClick={loadAllTheProducts}
            >
              All Products
            </Button>
            <br />
           
            <ButtonDropdown
              isOpen={dropdownOpen}
              toggle={toggle}
              className="mt-4"
              style={{width : "60%"}}
              size="lg"
            >
              <DropdownToggle caret color="dark">
              {
                  loadcategory === "" ? ("category off") : ("category on")
                }
              </DropdownToggle>
              <DropdownMenu  onClick={onCategoryChange}>
                <DropdownItem value="table">table</DropdownItem>
                <DropdownItem value="sofa">sofa</DropdownItem>
                <DropdownItem value="bed">bed</DropdownItem>
                <DropdownItem value="cupboard">cupboard</DropdownItem>
              </DropdownMenu>
            </ButtonDropdown>
            <br />
            <ButtonDropdown
              isOpen={color}
              toggle={toggleColor}
              className="mt-4"
              style={{width : "60%"}}
              size="lg"
              
            >
              <DropdownToggle caret color="dark">
              {
                  loadcolor === "" ? ("colors off") : ("colors on")
                }
              </DropdownToggle >
              <DropdownMenu onClick={onColorChange}>
                <DropdownItem value="red">red</DropdownItem>
                <DropdownItem value="yellow">yellow</DropdownItem>
                <DropdownItem value="blue">blue</DropdownItem>
              </DropdownMenu>
            </ButtonDropdown>
            <br />
            <ButtonDropdown
              isOpen={sort}
              toggle={toggleSort}
              className="mt-4"
              style={{width : "60%"}}
              size="lg"
            >
              <DropdownToggle caret color="dark">
                {
                  loadsort === "" ? ("sort off") : ("sort on")
                }
              </DropdownToggle>
              <DropdownMenu  onClick={onSortChange}>
                <DropdownItem value="ratings low">ratings low</DropdownItem>
                <DropdownItem value="ratings high">ratings high</DropdownItem>
                <DropdownItem value="price low">price low</DropdownItem>
                <DropdownItem value="price high">price high</DropdownItem>
              </DropdownMenu>
            </ButtonDropdown>
           
          </Col>
          <Col md={9}>
            <Row className="mt-4">
            {
                        allproducts.map((prod, index)=>(
                            <Col md={4} key={index}>
                                <HomeCard data={prod}/>
                           </Col>
                        ))
                    }
            </Row>
      {
        loading ? <div class="d-flex justify-content-center">
        <div class="spinner-border text-danger" style={{width:"2.2em", height:"2.2em"}} role="status">
        </div>
        <span style={{backgroundColor : "transparent", fontSize:"20px"}}>Loading.....</span>
      </div>: ""
      }
            <Pagination
              size = "large"
              count={pagesPag}
              color="primary"
              showFirstButton={true}
              showLastButton={true}
              //   defaultPage={page}
              onChange={(event, value) => {
                setPage(value);
                putProducts(value);
              }}
              className="mt-4"
            />
          </Col>
        </Row>
      </Container>
     
    </div>
  );
}
