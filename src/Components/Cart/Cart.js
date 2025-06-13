import React from "react";
import AD from "../../imgs/advertisement.jpg";
import { ContextConsumer } from "../../ContextApi/GlobalContext";
import CartProducts from "../CartProducts/CartProducts";
import SubTotal from "../SubTotal/SubTotal";
import "./Cart.css";
function Cart() {
  const { user, basket } = ContextConsumer();
  return (
    <div className="cart">
      <div className="cart-container">
        <div className="ad">
          <img src={AD} alt="advertisement" />
          <div className="user">
            <h3>Hello,{user ? ` ${user.email}` : ""}</h3>
            <h2>Your shopping Basket</h2>
          </div>
        </div>
        <div className="cart-products">
          {basket.length > 0 ? (
            basket.map((product) => (
              <CartProducts
                key={product.id}
                name={product.name}
                image={product.imgUrl}
                rating={product.rate}
                price={product.price}
                id={product.id}
                quantity={product.quantity}
              />
            ))
          ) : (
            <h2 className="empty"> Your Shopping Basket Is Empty... </h2>
          )}
        </div>
      </div>
      <div className="sub-total">
        <SubTotal />
      </div>
    </div>
  );
}

export default Cart;
