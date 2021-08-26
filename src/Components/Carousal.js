import React, { useState, useEffect, useContext } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import axios from "axios";
import { SearchContext } from "../context/DetailContext";
import { useHistory } from "react-router-dom";
import { SEARCH_PRO } from "../context/action.type";

/**
 * @author Saroj Sundara
 * @description this method contains a method which gets all the category and show the carousal based on category
 * @returns JSX for Carousal Image Screen
 */

export default function Carousal() {
  let history = useHistory();

  const [category, setCategory] = useState([]);
  const { search, searchDispatch } = useContext(SearchContext);

  const loadAllCategories = async () => {
    try {
      const result = await axios.get(
        "https://neostore-api.herokuapp.com/api/category",
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("CATEGORIES", result.data.data);
      let tempArr = result.data.data;
      let uniqueOb = new Set();
      let finalArray = tempArr.filter((eachOb) => {
        const isPresent = uniqueOb.has(eachOb.name);
        uniqueOb.add(eachOb.name);
        return !isPresent;
      });

      setCategory(finalArray);
    } catch (error) {
      alert("unable to load categories");
    }
  };

  useEffect(() => {
    loadAllCategories();
  }, []);

  return (
    <Carousel
      thumbWidth={"9%"}
      autoPlay="true"
      infiniteLoop="true"
      interval="2000"
      stopOnHover="true"
      width="100%"
      onClickItem={(index, item) => {
        searchDispatch({
          type: SEARCH_PRO,
          payload: item.props.children[1].props.children.trim(),
        });
        history.push("/allproducts");
        console.log(item.props.children[1].props.children);
      }}
    >
      {category.map((cate, index) => (
        <div key={index}>
          {cate.imageUrl ? (
            <img
              src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8c29mYXxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80"
              style={{ maxHeight: "60vh" }}
            />
          ) : (
            <img
              src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8c29mYXxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80"
              style={{ maxHeight: "60vh" }}
            />
          )}
          <p
            className="bg-dark text-white p-2 rounded"
            style={{ marginBottom: "40px" }}
          >
            {cate.name}
          </p>
        </div>
      ))}
    </Carousel>
  );
}
