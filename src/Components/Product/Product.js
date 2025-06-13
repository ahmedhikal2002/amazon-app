import React from "react";
import "./Product.css";
import { FormatCurrency } from "../../FormatCurrency";
import { rate } from "../../ContextApi/AppReducer";
import { ContextConsumer } from "../../ContextApi/GlobalContext";
function Product({ item }) {
  const { dispatch } = ContextConsumer();
  const addtobasket = () => {
    dispatch({
      type: "ADD_TO_BASKET",
      basket: item,
    });
  };

  return (
    <div className={`product `}>
      <p>{item.name}</p>
      <strong>{FormatCurrency(item.price)}</strong>
      <div className="rate">{rate(item.rate)}</div>
      <div className="product-img">
        <img src={item.imgUrl} alt="product" />
      </div>
      <button className="add-basket btn-scale" onClick={addtobasket}>
        Add To Basket
      </button>
    </div>
  );
}

export default Product;
