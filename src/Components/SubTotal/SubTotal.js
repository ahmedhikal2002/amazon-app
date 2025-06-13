import React from "react";
import "./SubTotal.css";
import { totalQuantity, totalPrice } from "../../ContextApi/AppReducer";
import { ContextConsumer } from "../../ContextApi/GlobalContext";
import { FormatCurrency } from "../../FormatCurrency";
import { NavLink } from "react-router-dom";
function SubTotal() {
  const { basket } = ContextConsumer();

  return (
    <div className="total">
      <div>
        Subtotal (
        {totalQuantity(basket) <= 1
          ? `${totalQuantity(basket)} item`
          : `${totalQuantity(basket)} items`}
        ): <strong>{FormatCurrency(totalPrice(basket))}</strong>
      </div>
      <div className="gift">
        <input type="checkbox" id="checkout" />
        <label htmlFor="checkout">This order contains a gift</label>
      </div>
      <NavLink to="/checkout">
        <button className="btn" id="checkout">
          Proceed To Checkout
        </button>
      </NavLink>
    </div>
  );
}

export default SubTotal;
