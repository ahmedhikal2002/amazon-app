import moment from "moment";
import React from "react";
import CartProduts from "../Components/CartProducts/CartProducts";
import "./order.css";
import { FormatCurrency } from "../FormatCurrency";
function Order({ order }) {
  return (
    <div className="order">
      <div className="order-info">
        <p>{moment.unix(order.data.created).format("MMM Do YYYY h:mm ")}</p>
        <span>{order.id}</span>
      </div>
      {order.data.basket.map((item) => (
        <CartProduts
          id={item.id}
          image={item.imgUrl}
          name={item.name}
          price={item.price}
          quantity={item.quantity}
          rating={item.rate}
          hiddenBtn
        />
      ))}
      <div className="total">
        <strong>Total</strong>
        <strong className="total-info">
          {FormatCurrency(order.data.amount / 100)}
        </strong>
      </div>
    </div>
  );
}

export default Order;
