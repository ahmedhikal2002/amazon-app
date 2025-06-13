import React from "react";
import Items from "../../data/items.json";
import Product from "../Product/Product";

import "./Home.css";
import AppSlider from "../Slider/Slider";
function Home() {
  return (
    <div className="home">
      <AppSlider />
      <div className="products">
        {Items.map((item) => (
          <Product key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}

export default Home;
