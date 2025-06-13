import React from "react";
import { FormatCurrency } from "../../FormatCurrency";
import { rate } from "../../ContextApi/AppReducer";
import { ContextConsumer } from "../../ContextApi/GlobalContext";
import "./CartProducts.css";
function CartProducts({ name, image, rating, price, quantity, id, hiddenBtn }) {
  const { dispatch } = ContextConsumer();
  const addtobasket = () => {
    dispatch({
      type: "ADD_TO_BASKET",
      basket: {
        name: name,
        image: image,
        rating: rating,
        price: price,
        id: id,
      },
    });
  };
  const decreaseQuantity = () => {
    dispatch({
      type: "DECREASE_QUANTITY",
      basket: {
        name: name,
        image: image,
        rating: rating,
        price: price,
        id: id,
      },
    });
  };
  const removeBasket = () => {
    dispatch({
      type: "REMOVE_BASKET",
      basket: {
        name: name,
        image: image,
        rating: rating,
        price: price,
        id: id,
      },
    });
  };
  return (
    <div className="cart-product">
      <div className="product-info">
        <div className="product-img">
          <img src={image} alt="product" />
        </div>
        <div className="product-desc">
          <p>{name}</p>
          <div className="price-details">
            <strong>{FormatCurrency(price)}</strong>
            <div className="quantity">
              X{quantity}
              {!hiddenBtn && (
                <div className="icons">
                  <i
                    className="fa-solid fa-chevron-up "
                    onClick={addtobasket}
                  ></i>
                  {quantity === 1 ? (
                    <i className="fa-solid fa-chevron-down disable"></i>
                  ) : (
                    <i
                      className="fa-solid fa-chevron-down"
                      onClick={decreaseQuantity}
                    ></i>
                  )}
                </div>
              )}
            </div>
          </div>

          <div className="rate">{rate(rating)}</div>
          {!hiddenBtn && (
            <button className="btn" onClick={removeBasket}>
              Remove From Basket
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default CartProducts;
