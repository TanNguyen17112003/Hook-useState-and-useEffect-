import React, { useState, useEffect } from "react";

import './App.css';
const initialProductList = [
  {
    name: "Apple",
    price: 200
  },
  {
    name: "Mango",
    price: 300
  },
  {
    name: "Banana",
    price: 400
  }
]
function App() {
  const [productList, setProductList] = useState(initialProductList);
  const [product, setProduct] = useState("");
  const [price, setPrice] = useState(null);
  const [sortOrder, setSortOrder] = useState("decrease");
  const sortProducts = () => {
    const sortedProducts = [...productList].sort((a, b) => {
      if (sortOrder == "increase") {
        return a.price - b.price;
      }
      else {
        return b.price - a.price;
      }
    });
    setProductList(sortedProducts);
  }
  useEffect(() => {
    sortProducts();
  }, [sortOrder])
  const handleChangeName = event => {
    setProduct(event.target.value);
  };

  const handleChangePrice = event => {
    setPrice(event.target.value);
  };

  const handleSubmit = (event) => {
    if (product && price) {
      const newProductList = productList.concat({name: product, price: price});
      setProductList(newProductList);
    }
    setProduct("");
    setPrice(0);
    event.preventDefault();
  };

  const handleRemove = (index) => {
    const newProductList = [...productList.slice(0, index), ...productList.slice(index+1)];
    setProductList(newProductList);
  }
  
  return (
    <div>
      <h1
        style={{
          color: "Green",
          fontSize: "20px",
          textAlign: "center",
          backgroundColor: "black",
          padding: "10px 0px"
        }}
      >
        PRODUCT MANAGEMENT BY TAN NGUYEN!
      </h1>
      <button
        onClick = {() => setSortOrder("increase")}
        style={{
          margin: "0 40px"
        }}
      >
        Sort Cheap to Expensive
      </button>
      <button
        onClick={() => setSortOrder("decrease")}
      >
        Sort Expensive to Cheap
      </button>
      <ol style={{
        marginTop: "30px"}}> 
        {productList.map((productt, index) => (
          <li 
            key={index}
            style={{
              // padding: "20px",
              borderLeft: "1px solid",
              borderRight: "1px solid"
            }}
          >
            <span
              style={{
                width: "100px",
                display: "inline-block",
                border: "1px solid",
                lineHeight: "3",
                textAlign: "center"
              }}
            >
              {productt.name}
            </span>
            <span
              style={{
                width: "100px",
                display: "inline-block",
                border: "1px solid",
                lineHeight: "3",
                textAlign: "center"
              }}
            >
              {productt.price}
            </span>
            <button
              onClick={() => handleRemove(index)}
              style={{
                padding: "5px 10px",
                backgroundColor: "red",
                color: "white",
                fontWeight: "bold",
                border: "none",
                borderRadius: "10px",
                cursor: "pointer",
                marginLeft: "10px"
              }}
            >
              Remove product
            </button>
          </li>
        ))}
      </ol>
      <form 
        onSubmit = {handleSubmit}
        style={{
          marginLeft: "40px"
        }}
      >
        <input type="text" value={product} onChange={handleChangeName} placeHolder="Enter Name of Product..."
          style={{
            padding: "10px"
          }}
        />
        <input type="number" value={price} onChange={handleChangePrice} placeHolder="Enter Price of Product..."
          style={{
            padding: "10px"
          }}
        />
        <button 
          type="submit"
          style={{
            padding: "10px",
            fontWeight: "bold",
            backgroundColor: "green",
            color: "white"
          }}
        >
            Add Product and Price
        </button>
      </form>
    </div>
  );
}

export default App;
